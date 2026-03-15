import React from "react";

const TodoCard = ({id, task, difficulty, isCompleted}) => {
  return (
    <div className="TodoCard">
      <h2>{id}</h2>
      <h2>{task}</h2>
      <h2>{difficulty}</h2>
      <h2>{isCompleted ? "Completed" : "Not Completed"}</h2>
    </div>
  );
};

export default TodoCard;
