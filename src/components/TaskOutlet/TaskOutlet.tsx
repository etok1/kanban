import React from "react";

import style from "./style.module.css";

export function TaskOutlet({ children }) {
  return <div className={style.container}>{children}</div>;
}
