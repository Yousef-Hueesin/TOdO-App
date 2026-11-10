import { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    setDraft(todo.text);
  }, [todo.text]);

  function commit() {
    if (cancelRef.current) {
      cancelRef.current = false;
      return;
    }

    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(todo.text);
      setEditing(false);
      return;
    }

    onUpdate(todo.id, trimmed);
    setEditing(false);
  }

  function cancel() {
    cancelRef.current = true;
    setDraft(todo.text);
    setEditing(false);
  }

  return (
    <li className={todo.completed ? "todo is-done" : "todo"}>
      <label className="check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="box" aria-hidden="true" />
        <span className="sr-only">
          {todo.completed ? "Mark open" : "Mark complete"}: {todo.text}
        </span>
      </label>

      {editing ? (
        <input
          ref={inputRef}
          className="rename"
          type="text"
          value={draft}
          aria-label={`Rename ${todo.text}`}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
            if (event.key === "Escape") cancel();
          }}
        />
      ) : (
        <button type="button" className="label" onClick={() => setEditing(true)}>
          {todo.text}
        </button>
      )}

      <button
        type="button"
        className="delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.text}`}
      >
        Delete
      </button>
    </li>
  );
}
