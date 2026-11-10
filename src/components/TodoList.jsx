import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  emptyLabel,
  isListEmpty,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty">
        <p className="empty-title">{emptyLabel}</p>
        <p className="empty-copy">
          {isListEmpty
            ? "Add a task above to start the list."
            : "Try another filter, or clear the search."}
        </p>
      </div>
    );
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
