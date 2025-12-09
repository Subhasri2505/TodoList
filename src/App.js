import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const [editingid, seteditingid] = useState(null);
  const [editingtext, seteditingtext] = useState('');

  // Define API base URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Load todos from backend on page load
  useEffect(() => {
    axios.get(`${API_URL}/api/todos`)
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add todo to backend
  const addTodo = async () => {
    if (input.trim() === '') return;

    const res = await axios.post(`${API_URL}/api/todos`, {
      text: input
    });

    setTodos([...todos, res.data]);
    setInput('');
  };

  // Delete todo from backend
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  // Toggle complete in backend
  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API_URL}/api/todos/${id}`, {
      completed: !completed
    });

    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  // Start editing
  const startediting = (id, text) => {
    seteditingid(id);
    seteditingtext(text);
  };

  // Update todo in backend
  const updateTodo = async (id) => {
    if (editingtext.trim() === '') return;

    const res = await axios.put(`${API_URL}/api/todos/${id}`, {
      text: editingtext
    });

    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));

    seteditingid(null);
    seteditingtext('');
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h1>My ToDo List</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo"
        style={{ padding: 8, width: '70%' }}
      />

      <button onClick={addTodo} style={{ padding: 8, marginLeft: 8 }}>
        Add
      </button>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {todos.map(todo => (
          <li
            key={todo._id}
            onClick={() => toggleComplete(todo._id, todo.completed)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              padding: 8,
              backgroundColor: '#f9f9f9',
              marginBottom: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 4,
            }}
          >
            {editingid === todo._id ? (
              <>
                <input
                  value={editingtext}
                  onChange={(e) => seteditingtext(e.target.value)}
                  style={{ padding: 4, width: '60%' }}
                  onClick={(e) => e.stopPropagation()}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTodo(todo._id);
                  }}
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: 4,
                    marginLeft: 8,
                  }}
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <span style={{ flexGrow: 1 }}>{todo.text}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startediting(todo._id, todo.text);
                  }}
                  style={{
                    backgroundColor: '#2196F3',
                    border: 'none',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 4,
                    marginRight: 6,
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo._id);
                  }}
                  style={{
                    backgroundColor: '#ff4d4d',
                    border: 'none',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 4,
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
