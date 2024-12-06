import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onChangeNameTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        className="todo-item-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-item-text">
        <input
          type="text"
          value={todo.text}
          onChange={(e) => onChangeNameTodo(e.target.value, todo.id)} // Utilisation de la fonction passée depuis le parent
        />
      </span>
      <button className="todo-item-delete" onClick={() => onDelete(todo.id)}>×</button>
    </li>
  );
}

export default TodoItem;
