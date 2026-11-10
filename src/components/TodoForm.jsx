import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <label className="field">
        <span className="field-label">New task</span>
        <input
          type="text"
          name="task"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a task"
          autoComplete="off"
        />
      </label>
      <button className="primary" type="submit">
        Add
      </button>
    </form>
  );
}
