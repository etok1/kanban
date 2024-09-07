import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header.tsx";
import style from "./layout.module.css";
import { Board } from "./components/Board/Board.tsx";

function Layout() {
  return (
    <div className={style.layoutContainer}>
      <Header />
      <main className={style.main}>
        <Board />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
