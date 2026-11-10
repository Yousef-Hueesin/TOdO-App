import { useMemo, useState } from "react";
import TodoFilters from "./components/TodoFilters";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./useTodos";
import "./App.css";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const counts = {
    all: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  const remaining = counts.active;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return todos.filter((todo) => {
      if (filter === "active" && todo.completed) return false;
      if (filter === "completed" && !todo.completed) return false;
      if (needle && !todo.text.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [todos, filter, query]);

  const emptyLabel =
    todos.length === 0 ? "Nothing on the list yet." : "No tasks match this view.";

  return (
    <main className="page">
      <section className="card">
        <header className="masthead">
          <p className="eyebrow">Today</p>
          <h1>Desklist</h1>
          <p className="lede">A short list for the work in front of you.</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <div className="toolbar">
          <TodoFilters filter={filter} counts={counts} onFilter={setFilter} />
          <label className="search">
            <span className="field-label">Search</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tasks"
              autoComplete="off"
            />
          </label>
        </div>

        <TodoList
          todos={visible}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          emptyLabel={emptyLabel}
          isListEmpty={todos.length === 0}
        />

        <footer className="footer">
          <p>
            <strong>{remaining}</strong> {remaining === 1 ? "item" : "items"} left
          </p>
          <button
            type="button"
            className="ghost"
            onClick={clearCompleted}
            disabled={counts.completed === 0}
          >
            Clear completed
          </button>
        </footer>

        <p className="hint">
          Click a task name to rename it. The list stays in this browser after a refresh.
        </p>
      </section>
    </main>
  );
}
