import React, { useState, useEffect } from "react";
import { Task } from "../Task/Task.tsx";
import { TaskOutlet } from "../TaskOutlet/TaskOutlet.tsx";
import style from "./style.module.css";
import { AddCard } from "../AddCard/AddCard.tsx";

export function Backlog({ tasks, onAddTask }) {
  const [input, setInput] = useState(false);
  const [btn, setBtn] = useState(false);
  const [newTask, setNewTask] = useState("");

  const newTaskHandle = () => {
    onAddTask("backlog", "backlog", newTask);
    setNewTask("");
  };

  if (!Array.isArray(tasks)) {
    return <div>No tasks</div>;
  }

  return (
    <TaskOutlet>
      <h2>Backlog</h2>
      <div className={style.tasks}>
        {tasks.map((task) => (
          <Task>{task}</Task>
        ))}

        {input ? (
          <input
            className={style.input}
            type="text"
            onChange={(e) => {
              setBtn(true);
              setNewTask(e.target.value);
            }}
          />
        ) : (
          ""
        )}
        {btn ? (
          <button
            disabled={!btn}
            onClick={() => {
              newTaskHandle();
            }}
          >
            Submit
          </button>
        ) : (
          <AddCard
            onClick={() => {
              setInput(true);
            }}
          />
        )}
      </div>
    </TaskOutlet>
  );
}
