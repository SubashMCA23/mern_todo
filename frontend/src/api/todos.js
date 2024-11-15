// client/src/api/todos.js
import axios from 'axios';

const API_URL = "http://localhost:5000/api/todos";

export const getTodos = () => axios.get(API_URL);
export const addTodo = (newTodo) => axios.post(API_URL, newTodo);
export const updateTodo = (id, updatedTodo) => axios.patch(`${API_URL}/${id}`, updatedTodo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);