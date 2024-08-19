import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthContext";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSync } from "react-icons/ai";
import "./Todo.css";

const Todo = () => {
  const navigate = useNavigate();
  const { projectDetails } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const [editMode, setEditMode] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const fetchData = async () => {
    try {
      const id = projectDetails.projectId;
      const response = await axios.post("http://localhost:5000/todo/fetch", {
        projectId: id,
      });
      setTodos(response.data.todos || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (projectDetails) {
      fetchData();
    }
  }, [projectDetails]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter(todo => todo.status === filter));
    }
  }, [todos, filter]);

  const formatDateTime = (dateString) => {
    if (!dateString) return "Invalid DateTime";
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} at ${formattedTime}`;
  };

  const changeStatus = async (todoId, status, description) => {
    try {
      const newStatus = status === "Completed" ? "Pending" : "Completed";
      await axios.post("http://localhost:5000/todo/update", {
        id: todoId,
        status: newStatus,
        description,
      });
      fetchData();
      alert("Todo Updated");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete("http://localhost:5000/todo/delete", {
        data: { id: todoId },
      });
      fetchData();
      alert("Todo Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (todoId, currentDescription) => {
    setEditMode(true);
    setEditingTodoId(todoId);
    setNewDescription(currentDescription);
  };

  const saveDescription = async () => {
    try {
      const response = await axios.post("http://localhost:5000/todo/update", {
        id: editingTodoId,
        description: newDescription,
        status: todos.find(todo => todo.id === editingTodoId).status,
      });

      if (response.data.message === "Todo updated successfully") {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === editingTodoId ? { ...todo, description: newDescription, updated_date: new Date() } : todo
          )
        );
        setEditMode(false);
        setEditingTodoId(null);
        alert("Todo Description Updated");
      } else {
        throw new Error("Failed to update todo description");
      }
    } catch (error) {
      console.error("Error updating description:", error);
      alert("Failed to update description");
    }
  };

  const createTodo = () => {
    navigate("/create-todo");
  };

  const backToHome = () => {
    navigate("/home");
  };

  return (
    <div className="todo-container">
      <div className="actions">
        <button className="create-button" onClick={createTodo}>
          Add Todo
        </button>
        <button className="back-button-2" onClick={backToHome}>
          Back
        </button>
      </div>
      <div className="filters">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "Pending" ? "active" : ""}`}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={`filter-button ${filter === "Completed" ? "active" : ""}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>
      <div className="project-header">
        <h1>{projectDetails.title}</h1>
      </div>
      <div className="todo-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, index) => (
            <div className="todo-card" key={todo.id}>
              <div className="todo-header">
                <span className="todo-index">{index + 1}</span>
                <span className={`todo-status ${todo.status.toLowerCase()}`}>
                  {todo.status}
                </span>
              </div>
              <div className="todo-body">
                {editMode && editingTodoId === todo.id ? (
                  <div>
                    <input
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="edit-input"
                    />
                    <button className="save-button" onClick={saveDescription}>
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => {
                        setEditMode(false);
                        setEditingTodoId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="todo-description">{todo.description}</p>
                    <p className="todo-dates">
                      <span>Created: {formatDateTime(todo.created_date)}</span>
                      <br />
                      <span>Updated: {formatDateTime(todo.updated_date)}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="todo-actions">
                <button
                  className="status-button"
                  onClick={() => changeStatus(todo.id, todo.status, todo.description)}
                >
                  <AiOutlineSync /> Update Status
                </button>
                <button
                  className="edit-button"
                  onClick={() => startEditing(todo.id, todo.description)}
                >
                  <AiOutlineEdit /> 
                </button>
                <button
                  className="todo-delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No todo(s) to display!</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
