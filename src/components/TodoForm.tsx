import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TodoFormProps {
  onAdd: (text: string) => Promise<void>;
  loading: boolean;
}

export function TodoForm({ onAdd, loading }: TodoFormProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed || isSubmitting) return;

    try {
      setIsSubmitting(true);
      Keyboard.dismiss(); // Закриває клавіатуру
      await onAdd(trimmed);
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled = loading || isSubmitting;

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Що потрібно зробити?"
        placeholderTextColor="#94a3b8"
        value={text}
        onChangeText={setText}
        editable={!disabled}
        maxLength={120}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        style={[
          styles.addBtn,
          (!text.trim() || disabled) && styles.addBtnDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!text.trim() || disabled}
      >
        <Text style={styles.addBtnText}>
          {isSubmitting ? "Додаємо..." : "Додати"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  },
  addBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#6366f1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnDisabled: {
    opacity: 0.5,
  },
  addBtnText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
});
