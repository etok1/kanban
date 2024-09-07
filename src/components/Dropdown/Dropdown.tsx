import React, { useState } from "react";
import style from "./style.module.css";

export function Dropdown({ tasksList, addTask }) {
  if (!Array.isArray(tasksList)) {
    return <div>Invalid tasks data</div>;
  }

  return (
    <div className={style.dropwdown}>
      {tasksList.map((task) => (
        <div className={style.task} onClick={() => addTask(task)}>
          {task}
        </div>
      ))}
    </div>
  );
}
