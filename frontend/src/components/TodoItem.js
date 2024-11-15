// client/src/components/TodoItem.js
import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    onUpdate(todo._id, { title: newTitle, completed: todo.completed });
    setIsEditing(false);
  };

  const styles = {
    listItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 1.25rem',
      borderBottom: '1px solid #ddd',
      gap: '10px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      transition: 'background-color 0.3s ease',
    },
    listItemHover: {
      backgroundColor: '#f1f1f1',
    },
    checkbox: {
      appearance: 'none',
      width: '20px',
      height: '20px',
      borderRadius: '3px',
      backgroundColor: todo.completed ? '#28a745' : '#fff',
      border: todo.completed ? '1px solid #28a745' : '1px solid #ddd',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
      marginRight: '10px',
    },
    text: {
      flex: '1',
      fontSize: '1rem',
      textDecoration: todo.completed ? 'line-through' : 'none',
      color: todo.completed ? '#888' : '#333',
      transition: 'color 0.3s ease',
    },
    textHover: {
      color: '#555',
    },
    editInput: {
      flex: '1',
      fontSize: '1rem',
      padding: '0.3rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      padding: '0.3rem 0.6rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    editButton: {
      backgroundColor: '#17a2b8',
      color: '#fff',
    },
    editButtonHover: {
      backgroundColor: '#138496',
    },
    saveButton: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    saveButtonHover: {
      backgroundColor: '#218838',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
    deleteButtonHover: {
      backgroundColor: '#c82333',
    },
  };

  return (
    <li
      style={styles.listItem}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.listItem.backgroundColor)}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
        style={styles.checkbox}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.editInput}
        />
      ) : (
        <span
          style={styles.text}
          onMouseEnter={(e) => (e.target.style.color = styles.textHover.color)}
          onMouseLeave={(e) => (e.target.style.color = todo.completed ? '#888' : '#333')}
        >
          {todo.title}
        </span>
      )}
      {isEditing ? (
        <button
          onClick={handleSave}
          style={{ ...styles.button, ...styles.saveButton }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.saveButton.backgroundColor)}
        >
          Save
        </button>
      ) : (
        <button
          onClick={handleEdit}
          style={{ ...styles.button, ...styles.editButton }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.editButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.editButton.backgroundColor)}
        >
          Edit
        </button>
      )}
      <button
        onClick={() => onDelete(todo._id)}
        style={{ ...styles.button, ...styles.deleteButton }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.deleteButton.backgroundColor)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
