import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State Management
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Load todos from backend on page load
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/api/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);



  // Add todo to backend
  const addTodo = async (e) => {
    e?.preventDefault();
    
    if (input.trim() === '') {
      setError('Please enter a todo item');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/todos`, {
        text: input
      });
      setTodos([...todos, res.data]);
      setInput('');
      setError(null);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Delete todo from backend
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Toggle complete in backend
  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/api/todos/${id}`, {
        completed: !completed
      });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Failed to update todo. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Update todo in backend
  const updateTodo = async (id) => {
    if (editingText.trim() === '') {
      setError('Todo text cannot be empty');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/api/todos/${id}`, {
        text: editingText
      });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
      setEditingId(null);
      setEditingText('');
      setError(null);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyPress = (e, action, id) => {
    if (e.key === 'Enter') {
      action(id);
    } else if (e.key === 'Escape' && editingId) {
      cancelEditing();
    }
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Statistics
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">✨ TaskFlow</h1>
          <p className="app-subtitle">Organize your life, one task at a time</p>
        </header>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="input-section">
          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form className="input-form" onSubmit={addTodo}>
            <input
              type="text"
              className="todo-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done? ✍️"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !input.trim()}
            >
              <span>+</span>
              Add Todo
            </button>
          </form>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({stats.total})
            </button>
            <button
              className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({stats.active})
            </button>
            <button
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>

        {/* Todos Container */}
        <div className="todos-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading your tasks...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'completed' ? '🎉' : filter === 'active' ? '📝' : '📋'}
              </div>
              <h3 className="empty-title">
                {filter === 'completed' 
                  ? 'No completed tasks yet' 
                  : filter === 'active' 
                  ? 'No active tasks' 
                  : 'No tasks yet'}
              </h3>
              <p className="empty-description">
                {filter === 'all' 
                  ? 'Start by adding your first task above' 
                  : filter === 'active'
                  ? 'All tasks are completed! 🎊'
                  : 'Complete some tasks to see them here'}
              </p>
            </div>
          ) : (
            <div className="todos-list">
              {filteredTodos.map(todo => (
                <div 
                  key={todo._id} 
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  <div className="todo-content">
                    {/* Checkbox */}
                    <div className="todo-checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo._id, todo.completed)}
                        aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
                      />
                    </div>

                    {/* Text or Edit Input */}
                    <div className="todo-text-wrapper">
                      {editingId === todo._id ? (
                        <input
                          type="text"
                          className="todo-edit-input"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, updateTodo, todo._id)}
                          autoFocus
                          aria-label="Edit todo text"
                        />
                      ) : (
                        <span className="todo-text">{todo.text}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="todo-actions">
                      {editingId === todo._id ? (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={() => updateTodo(todo._id)}
                            aria-label="Save changes"
                          >
                            ✓ Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={cancelEditing}
                            aria-label="Cancel editing"
                          >
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-secondary"
                            onClick={() => startEditing(todo._id, todo.text)}
                            aria-label="Edit todo"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => setDeleteConfirm(todo._id)}
                            aria-label="Delete todo"
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Delete Task?</h2>
            <p className="modal-description">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => deleteTodo(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
