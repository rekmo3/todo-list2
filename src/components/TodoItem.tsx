import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }
    if (trimmed !== todo.text) {
      try {
        setIsUpdating(true);
        await onEdit(todo.id, trimmed);
      } finally {
        setIsUpdating(false);
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <View
      style={[
        styles.item,
        todo.completed && styles.itemCompleted,
        isUpdating && styles.itemUpdating,
      ]}
    >
      <TouchableOpacity
        style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
        onPress={() => onToggle(todo.id, !todo.completed)}
        disabled={isUpdating}
      >
        {todo.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editText}
          onChangeText={setEditText}
          onBlur={handleSave}
          onSubmitEditing={handleSave}
          autoFocus
          maxLength={120}
          returnKeyType="done"
        />
      ) : (
        <TouchableOpacity
          style={styles.textWrapper}
          onLongPress={() => setIsEditing(true)}
        >
          <Text
            style={[styles.text, todo.completed && styles.textCompleted]}
          >
            {todo.text}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.actions}>
        {!isEditing && (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setIsEditing(true)}
            disabled={isUpdating}
          >
            <Text style={styles.actionBtnText}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onDelete(todo.id)}
          disabled={isUpdating}
        >
          <Text style={styles.actionBtnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 12,
    marginBottom: 8,
  },
  itemCompleted: {
    opacity: 0.9,
  },
  itemUpdating: {
    opacity: 0.6,
  },
  checkbox: {
    height: 22,
    width: 22,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#1e293b",
  },
  textCompleted: {
    color: "#94a3b8",
    textDecorationLine: "line-through",
  },
  editInput: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: "#6366f1",
    borderRadius: 6,
    backgroundColor: "#fff",
    color: "#1e293b",
  },
  actions: {
    flexDirection: "row",
    gap: 6,
  },
  actionBtn: {
    padding: 6,
    borderRadius: 6,
  },
  actionBtnText: {
    fontSize: 16,
  },
});
