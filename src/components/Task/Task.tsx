import React from "react";
import style from "./style.module.css";

interface TaskProps {
  children: string;
}

export function Task({ children }: TaskProps) {
  return <div className={style.task}>{children}</div>;
}
