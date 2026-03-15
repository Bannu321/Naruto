import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import TodoCard from "./components/TodoCard";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [difficulty, setDifficulity] = useState("low");
  const [isCompleted, setIsCompleted] = useState(false);
  const locat = useLocation();

  const TodoList = [
    {
      id: 11,
      task: "Login",
      difficulty: "low",
      isCompleted: true,
    },
    {
      id: 12,
      task: "Dashboard",
      difficulty: "medium",
      isCompleted: false,
    },
    {
      id: 113,
      task: "Xp manipulate",
      difficulty: "mid",
      isCompleted: false,
    },
  ];

  const AddTodo = async (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      task: taskName,
      difficulty: difficulty,
      isCompleted: isCompleted || false,
    };

    // const updatedTodo = [...todoList, newTodo];
    // setTodoList(updatedTodo);
    TodoList.push(newTodo)
    setTodoList([...todoList, newTodo]);
    setTaskName("");
  };
  useEffect(() => {
    const FetchUser = async () => {
      try {
        const usr = JSON.parse(localStorage.getItem("user"));
        setUser(usr);
      } catch (err) {
        console.log(err);
        const usr = {
          name: "Guest",
          age: "000",
          level: "0",
          xp: "0",
        };
        // setUser(usr);
        localStorage.setItem("user", JSON.stringify(usr));
      }
    };
    FetchUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(TodoList));
  }, [todoList]);

  useEffect(() => {
    const FetchTodo = async () => {
      try {
        const StoredTodo = JSON.parse(localStorage.getItem("TodoList")) || [];
        setTodoList(StoredTodo);
      } catch (err) {
        console.log(err);
        res.send({
          message: "No Todos Found",
        });
      }
    };
    FetchTodo();
  }, []);

  return (
    <div>
      <TopBar />
      <h1>
        Welcome {user?.name} you are {user?.age} old
      </h1>
      <h2>We are pleased to have you on our website thanks for joining us!</h2>
      <h2>
        You are Level: {user?.level} and XP: {user?.xp}{" "}
      </h2>

      <div className="CreateTodo">
        <form onSubmit={AddTodo} className="AddTodoForm" >
          <input
            id="task"
            type="text"
            placeholder="Task Name : "
            required
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          {/* <label htmlFor="taskName"></label> */}

          <input
            type="radio"
            id="low"
            name="diffuclty"
            value="low"
            onChange={(e) => {
              setDifficulity(e.target.value);
            }}
          />
          <label htmlFor="low">Low</label>

          <input
            type="radio"
            id="mid"
            name="diffuclty"
            value="mid"
            onChange={(e) => {
              setDifficulity(e.target.value);
            }}
          />
          <label htmlFor="mid">Mid</label>

          <input
            type="radio"
            id="High"
            name="diffuclty"
            value="high"
            onChange={(e) => {
              setDifficulity(e.target.value);
            }}
          />
          <label htmlFor="High">High</label>

          <button type="Submit">Create Todo</button>
        </form>
      </div>
      <div className="TodoContainer">
        {todoList?.length > 0 ? (
          todoList.map((todo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              task={todo.task}
              difficulty={todo.difficulty}
              isCompleted={todo.isCompleted}
            />
          ))
        ) : (
          <div className="NoTodo">No Todos Found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
