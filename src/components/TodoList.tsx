import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import type { Todo } from "@/types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string) => Promise<void>;
}

export function TodoList({
  todos,
  refreshing,
  onRefresh,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Список завдань порожній. Додайте нове завдання!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#6366f1"]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center",
  },
});
