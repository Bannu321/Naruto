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

  // const TodoList = [
  //   {
  //     id: 11,
  //     task: "Login",
  //     difficulty: "low",
  //     isCompleted: true,
  //   },
  //   {
  //     id: 12,
  //     task: "Dashboard",
  //     difficulty: "medium",
  //     isCompleted: false,
  //   },
  //   {
  //     id: 113,
  //     task: "Xp manipulate",
  //     difficulty: "mid",
  //     isCompleted: false,
  //   },
  // ];

  const AddTodo = async (e) => {
    e.preventDefault();
    const newTodo = {
      userID: user?.id,
      title: taskName,
      difficulty: difficulty,
      isCompleted: isCompleted || false,
    };
    const res = await axios.post("http://localhost:8080/tasks", newTodo);
    alert("Todo Added Successfully")
    await FetchTodo();
  };

  const EditTodo = async (e) => {
    e.preventDefault();
    const Todo = {
      todoID: this.id,
      title: taskName,
      difficulty: difficulty,
      isCompleted: isCompleted || false,
    };
    const res = await axios.patch("http://localhost:8080/tasks/", Todo);
    await FetchTodo();
  };
  const DeleteTodo = async (e) => {
    e.preventDefault();
    todoID = this.id;
    const res = await axios.delete("http://localhost:8080/tasks/", todoID);
    await FetchTodo();
  };

  useEffect(() => {
    const FetchUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
      } catch (err) {
        console.log(err);
        const usr = {
          name: "Guest",
          age: "000",
          level: "0",
          xp: "0",
          id: "0000",
        };
        setUser(usr);
        localStorage.setItem("user", JSON.stringify(usr));
      }
    };
    FetchUser();
  }, []);

  // useEffect( async () => {
  //   const TodoList = await axios.get("http://localhost:8080/tasks")
  // });

      const FetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:8080/tasks", {
            params: { userID: user?.id },
          });
        setTodoList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    if (!user?.id) return;
    FetchTodo();
  }, [user]);

  return (
    <div>
      <TopBar />
      <h1>
        Welcome {user?.name} you are {user?.age} old your user id is {user?.id}
      </h1>
      <h2>We are pleased to have you on our website thanks for joining us!</h2>
      <h2>
        You are Level: {user?.level} and XP: {user?.xp}{" "}
      </h2>

      <div className="CreateTodo">
        <form className="AddTodoForm">
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

          <div className="Task_diffi">
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
          </div>

          <button type="Submit" onClick={AddTodo}>Create Todo</button>
        </form>
      </div>
      <div className="TodoContainer">
        
        {todoList?.length > 0 ? (
          todoList.map((todo) => (
            <div className="TodoWrapper">
              <TodoCard
                key={todo._id}
                id={todo._id}
                task={todo.title}
                difficulty={todo.difficulty}
                isCompleted={todo.isCompleted}
              />
              <button>
                <i>delete</i>
              </button>
              <button>
                <i>edit</i>
              </button>
              <button>
                <i>mark Completed</i>
              </button>
            </div>
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
