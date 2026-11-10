import { useEffect, useState } from "react";
import { STARTER_TODOS } from "./data";
import { loadTodos, saveTodos } from "./storage";

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos(STARTER_TODOS));

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((current) => [
      {
        id: Math.max(0, ...current.map((todo) => todo.id)) + 1,
        text: trimmed,
        completed: false,
      },
      ...current,
    ]);
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function updateTodo(id, text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos(
      (current) => current.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
}
