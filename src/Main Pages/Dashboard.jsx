import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button";

// Put this Below Code in Login and Register Page whendivided it into routes cause this will check if the user already aexit and that in register o rlogin page cause dashboard page is for getting all the todos of that user so
function Dashboard() {
  const nav = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        nav("/");
      }
      const allTodos = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(allTodos.data.todos);
      console.log("Tpdpds", todos);
    };

    getTodos();
  }, []);

  const deleteTodoData = async (id) => {
    let token = localStorage.getItem("token");
    if (!token) {
      nav("/");
      return;
    }
    const deleteTodo = await axios.delete(
      `${import.meta.env.VITE_API_URL}/${id}`,
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    setTodos((prevTodos) => prevTodos.filter((todos) => todos._id !== id));
  };

  const logOut = async () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <>
      <div class="dashboard-container">
        <Button type="submit" color="green" onClick={() => nav("/createTodo")}>
          Create Todo
        </Button>
        <Button type="submit" color="red" onClick={logOut}>
          Logout
        </Button>
        {todos.map((todo) => (
          <h2>
            Title - <b>{todo.title}</b>
            <br />
            Description - <b>{todo.description}</b>
            <br />
            <Button
              type="submit"
              color="yellow"
              onClick={() => {
                nav(`/updateTodo/${todo._id}`);
              }}
            >
              Update Todo
            </Button>
            <Button
              type="submit"
              color="red"
              onClick={() => deleteTodoData(todo._id)}
            >
              Delete Todo
            </Button>
            <br />
            <br />
          </h2>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
