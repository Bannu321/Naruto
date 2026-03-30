import React from "react";
import "../index.css";

const TodoCard = ({ id, task, difficulty, isCompleted }) => {
  return (
    <div className="TodoCard">
      <h2 className="todoid">{id}</h2>
      <h2 className="todotask">{task}</h2>
      <h2 className="tododifficulty">{difficulty}</h2>
      <h2 className="todocompleted">
        {isCompleted ? "Completed" : "Not Completed"}
      </h2>
    </div>
  );
};

export default TodoCard;
