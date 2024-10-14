"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterType, TodoItemType } from "./types";


export default function TodoApp() {
  const [tasks, setTasks] = useState<TodoItemType[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>(FilterType.all);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do лист</h1>
      <form onSubmit={addTask} className="mb-4">
        <div className="flex">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Добавить задачу"
            className="flex-grow mr-2"
          />
          <Button type="submit">Добавить</Button>
        </div>
      </form>
      <div className="mb-4">
        <Button
          onClick={() => setFilter(FilterType.all)}
          variant={filter === "all" ? "default" : "outline"}
          className="mr-2"
        >
          Все
        </Button>
        <Button
          onClick={() => setFilter(FilterType.active)}
          variant={filter === "active" ? "default" : "outline"}
          className="mr-2"
        >
          Активные
        </Button>
        <Button
          onClick={() => setFilter(FilterType.completed)}
          variant={filter === "completed" ? "default" : "outline"}
        >
          Завершённые
        </Button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-grow ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
