import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function readFromLocaleStorage() {
  const todos = localStorage.getItem("todos");
  console.log(todos);
  return todos ? JSON.parse(todos) : [];
}

function writeToLocaleStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function TodoList() {
  const [todos, setTodos] = useState(readFromLocaleStorage());
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => writeToLocaleStorage(todos), [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") {
      return !todo.completed;
    }
    if (filter === "Complete") {
      return todo.completed;
    }
    return true;
  });
  const clearComplete = () => {
    const todosWithoutComplete = todos.filter((t) => !t.completed);
    setTodos(todosWithoutComplete);
    localStorage.setItem("todos", JSON.stringify(todosWithoutComplete));
  };
  const onChangeNameTodo = (value, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: value } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="todo-list">
      <h3 className="todo-list-empty">Nombre de tache(s) : {todos.length}</h3>

      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Complete">Complete</option>
      </select>

      <button onClick={clearComplete}>Clear Completed</button>

      <form className="todo-list-form" onSubmit={handleSubmit}>
        <input
          className="todo-list-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button className="todo-list-submit" type="submit">
          Add
        </button>
      </form>
      <ul className="todo-list-items">
        {filteredTodos.length === 0 ? (
          <li className="todo-list-empty">
            No todos yet! Add one to get started.
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onChangeNameTodo={onChangeNameTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
