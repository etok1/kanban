import React, { useState, useEffect } from "react";
import { Task } from "../Task/Task.tsx";
import { TaskOutlet } from "../TaskOutlet/TaskOutlet.tsx";
import style from "./style.module.css";
import { AddCard } from "../AddCard/AddCard.tsx";
import { Dropdown } from "../Dropdown/Dropdown.tsx";

export function Ready({ tasks, onAddTask }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [info, setInfo] = useState<string[]>([]);

  const loadTasks = () => {
    const tasks = localStorage.getItem("kanbanTasks");
    return tasks ? JSON.parse(tasks) : "";
  };

  const newTaskHandle = (task) => {
    onAddTask("backlog", "ready", task);

    setDropdownOpen(false);
  };

  useEffect(() => {
    const allTasks = loadTasks();
    console.log("Loaded tasks:", allTasks.backlog);
    setInfo(allTasks.backlog);
  }, []);

  if (!Array.isArray(tasks)) {
    return <div>No tasks</div>;
  }
  return (
    <TaskOutlet>
      <h2>Ready</h2>
      <div className={style.tasks}>
        {tasks.map((task) => (
          <Task>{task}</Task>
        ))}
        {dropdownOpen && <Dropdown tasksList={info} addTask={newTaskHandle} />}
        <AddCard
          onClick={() => {
            console.log("ready");
            setDropdownOpen(true);
          }}
        />
      </div>{" "}
    </TaskOutlet>
  );
}
