// client/src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todos';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTodo({ title, completed: false });
    setTitle("");
    fetchTodos();
  };

  const handleUpdate = async (id, updatedFields) => {
    await updateTodo(id, updatedFields);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '8px',
      backgroundColor: '#e3f2fd', // Soft light blue for a neat look
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      transition: 'background-color 0.3s ease',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    form: {
      display: 'flex',
      marginBottom: '1.5rem',
      gap: '0.5rem',
    },
    input: {
      flex: '1',
      padding: '0.5rem',
      border: '1px solid #ddd',
      borderRadius: '4px 0 0 4px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '0 4px 4px 0',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
      marginTop: '1rem',
    },
  };
  
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo List</h1>
      <form onSubmit={handleAddTodo} style={styles.form}>
        <input
          type="text"
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
          onBlur={(e) => (e.target.style.borderColor = styles.input.borderColor)}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Add Todo
        </button>
      </form>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo._id}>
            <TodoItem
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
