import React, { useState } from "react";

import style from "./style.module.css";

export function AddCard({ onClick }) {
  return (
    <button className={style.Button} onClick={onClick}>
      + Add Card
    </button>
  );
}
