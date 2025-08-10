import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button";
import AlertBox from "../components/AlertBox";

// Put this Below Code in Login and Register Page whendivided it into routes cause this will check if the user already aexit and that in register o rlogin page cause dashboard page is for getting all the todos of that user so
function Dashboard() {
  const nav = useNavigate();
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        nav("/");
      }
      const allTodos = await axios.get(
        `${import.meta.env.VITE_API_URL}/todos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(allTodos.data.todos);
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
    setMessage(deleteTodo.data.message);
    setTimeout(() => {
      setMessage("");
    }, 4000);
    setTodos((prevTodos) => prevTodos.filter((todos) => todos._id !== id));
  };

  const logOut = async () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <>
      <div className="text-center min-h-screen bg-blue-100">
        {message && <AlertBox message={message}></AlertBox>}

        <div class="text-end relative top-2  m-auto w-auto  ">
          <Button type="submit" color="red" onClick={logOut}>
            Logout
          </Button>
        </div>

        <div class=" m-auto mt-4">
          <Button
            type="submit"
            color="green"
            onClick={() => nav("/createTodo")}
          >
            Create Todo
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 w-auto  mt-10 mb-10 place-items-center  lg:gap-7 md:gap-12 gap-5  m-8 ">
          {todos.map((todo) => (
            <>
              <div className="max-w-sm p-6 bg-gray-50  border border-gray-200 rounded-lg shadow-2xl  lg:w-80 md:w-80 sm:w-80 w-64  hover:scale-105 transition-transform duration-300">
                <p>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 overflow-x-auto h-12">
                    {todo.title}
                  </h5>
                </p>
                <p className="mb-3 font-normal text-gray-700 h-14 overflow-y-auto ">
                  {todo.description}
                </p>
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
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
