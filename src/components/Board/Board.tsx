import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Backlog } from "../Backlog/Backlog.tsx";
import { Ready } from "../Ready/Ready.tsx";

type Tasks = {
  backlog: string[];
  ready: string[];
  inProgress: string[];
  finished: string[];
};
const allTasks: Tasks = {
  backlog: ["Task1", "Task 2"],
  ready: ["go about the world like im having fun"],
  inProgress: [],
  finished: [],
};

const loadTasks = () => {
  const tasks = localStorage.getItem("kanbanTasks");
  return tasks ? JSON.parse(tasks) : allTasks;
};

export function Board() {
  const [tasks, setTasks] = useState<Tasks>(loadTasks);

  const onAddTask = (from, to, task) => {
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t !== task),
      [to]: [...prev[to], task],
    }));
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    const allTasks = loadTasks();
    setTasks(allTasks);
  }, []);

  return (
    <div className={style.board}>
      <Backlog tasks={tasks.backlog} onAddTask={onAddTask} />{" "}
      <Ready tasks={tasks.ready} onAddTask={onAddTask} />
    </div>
  );
}
