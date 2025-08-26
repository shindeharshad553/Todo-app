"use client";
import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

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
        <button
          className="bg-blue-400 text-white rounded p-2"
          onClick={AddTodo}
        >
          Add todo
        </button>
      </div>

      {/* display todo list  */}
      <ul className="y-2 w-4/5">
        {todos.map((todo, i) => (
          <li
            key={i}
            className="px-4 py-2 bg-grey rounded  flex justify-between items-center"
          >
            <span>{todo}</span>
            <button
              className="bg-red-400 text-white rounded p-2 m-2"
              onClick={() => deleteTodo(i)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
