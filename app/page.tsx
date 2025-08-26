"use client";
import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [EditIndex, setEditIndex] = useState<number | null>(null);

  // loads the todos from the localstorage when the page reloads
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // sets the todos to the localstorage whenever they changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const AddTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, task.trim()]);
    setTask("");
  };

  // to delete the todo
  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setTask(todos[index]);
    setEditIndex(index);
  };

  const updateTodo = () => {
    if (EditIndex == null) return null;
    const updatedTodos = [...todos];
    updatedTodos[EditIndex] = task.trim();
    setTodos(updatedTodos);
    setIsEditing(false);
    setTask("");
  };

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">To do app</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          className="border w-64 rounded p-1"
          onChange={(e) => setTask(e.target.value)}
        />
        {isEditing ? (
          <button
            className="bg-blue-400 text-white rounded p-2"
            onClick={updateTodo}
          >
            Update todo
          </button>
        ) : (
          <button
            className="bg-blue-400 text-white rounded p-2"
            onClick={AddTodo}
          >
            Add todo
          </button>
        )}
      </div>

      {/* display todo list  */}
      <ul className="y-2 w-4/5">
        {todos.map((todo, i) => (
          <li
            key={i}
            className="px-4 py-2 bg-grey rounded  flex justify-between items-center"
          >
            <span>{todo}</span>
            <div>
              <button
                className="bg-red-400 text-white rounded p-2 m-2"
                onClick={() => deleteTodo(i)}
              >
                Delete
              </button>
              <button
                className="bg-blue-400 text-white rounded p-2 m-2"
                onClick={() => {
                  handleEditClick(i);
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
