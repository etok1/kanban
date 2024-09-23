import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../Task/Task.tsx";
import { TaskOutlet } from "../TaskOutlet/TaskOutlet.tsx";
import { AddCard } from "../AddCard/AddCard.tsx";
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import { Tasks } from "../Board/Board.tsx";

export function Finished({ tasks, onAddTask }) {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [info, setInfo] = useState<Tasks>({
    backlog: [],
    ready: [],
    inProgress: [],
    finished: [],
  });

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const newTaskHandle = (task) => {
    onAddTask("inProgress", "finished", task);
    setDropdownOpen(false);
    setInfo((prevInfo) => ({
      inProgress: prevInfo.inProgress.filter((t) => t.id !== task.id),
      finished: [
        ...prevInfo.finished,
        { id: task.id, name: task.name, description: task.description },
      ],
      ...prevInfo,
    }));
    console.log(info);
  };

  const loadTasks = () => {
    const tasks = localStorage.getItem("kanbanTasks");
    return tasks
      ? JSON.parse(tasks)
      : { backlog: [], ready: [], inProgress: [], finished: [] };
  };

  const loadTasksArray = useCallback(() => {
    const allTasks = loadTasks();
    setInfo(allTasks);
  }, []);

  if (!Array.isArray(tasks)) {
    return <div>No tasks</div>;
  }
  return (
    <TaskOutlet heading="Finished">
      <div className="tasks">
        {tasks.map((task) => (
          <Task onClick={() => handleTaskClick(task.id)} key={task.id}>
            {task.name}
          </Task>
        ))}

        {dropdownOpen && (
          <Dropdown tasksList={info.inProgress} addTask={newTaskHandle} />
        )}
        {!dropdownOpen && (
          <AddCard
            onClick={() => {
              loadTasksArray();
              setDropdownOpen(true);
            }}
          />
        )}
      </div>{" "}
    </TaskOutlet>
  );
}
