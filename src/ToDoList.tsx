import React, { useState } from "react";

interface item {
  id: number;
  text: string;
  complated: boolean;
}

export const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([]);

  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complated: !todo.complated };
        }
        return todo;
      })
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setTodos((todos) => [
      ...todos,
      { id: Date.now(), text: input, complated: false },
    ]);
    setInput("");
  };

  return (
    <div className="main-container">
      <h1>To-Do List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{ textDecoration: todo.complated ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add todo item"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
