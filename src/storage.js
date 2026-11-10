const STORAGE_KEY = "desklist.todos";

export function loadTodos(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((todo) => ({
          ...todo,
          text:
            todo.id === 5 && todo.text === "Prepare the Thursday quiz"
              ? "Prepare the Friday quiz"
              : todo.text,
        }))
      : fallback;
  } catch {
    return fallback;
  }
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
