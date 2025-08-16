import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";

// Put this Below Code in Login and Register Page whendivided it into routes cause this will check if the user already aexit and that in register o rlogin page cause dashboard page is for getting all the todos of that user so
function Dashboard() {
  const nav = useNavigate();
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  // Get Todos Function Made but Called inside UseEffect
  const getTodos = async () => {
    try {
      const allTodos = await axios.get(
        `${import.meta.env.VITE_API_URL}/todos`,
        {params: {limit, cursor: nextCursor}, withCredentials: true}
      );
      setTodos((prev) => [...prev, ...allTodos.data.todos]);
      setNextCursor(allTodos.data.nextCursor);
      setHasMore(allTodos.data.hasMore);
    } catch (err) {
      nav("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasMore) return;

    setLoading(true);

    getTodos();
  }, []);

  const deleteTodoData = async (id) => {
    try {
      const deleteTodo = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${id}`,
        {withCredentials: true}
      );
      setMessage(deleteTodo.data.message);
      setTimeout(() => {
        setMessage("");
      }, 4000);
      setTodos((prevTodos) => prevTodos.filter((todos) => todos._id !== id));
    } catch (err) {
      nav("/");
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      const logOutUser = await axios.post(
        `${import.meta.env.VITE_API_URL}/logOut`,
        {},
        {withCredentials: true}
      );

      nav("/");
    } catch (err) {
      nav("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="text-center min-h-screen bg-blue-100">
          {message && <AlertBox message={message}></AlertBox>}

          <div className="text-end relative top-2  m-auto w-auto  ">
            <Button type="submit" color="red" onClick={logOut}>
              Logout
            </Button>
          </div>

          <div className=" m-auto mt-4">
            <Button
              type="submit"
              color="green"
              onClick={() => nav("/createTodo")}
            >
              Create Todo
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 w-auto  mt-10 mb-10 place-items-center  lg:gap-7 md:gap-12 gap-5  m-8 ">
            {todos.map((todo) => {
              const [year, month, day] = todo.createdAt
                .split("T")[0]
                .split("-");
              const date = `${day}-${month}-${year}`;
              return (
                <>
                  <div
                    className="max-w-sm p-6 bg-gray-50  border border-gray-200 rounded-lg shadow-2xl  lg:w-80 md:w-80 sm:w-80 w-64  hover:scale-105 transition-transform duration-300"
                    key={todo._id}
                  >
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
                    <br />
                    <div className="text-right text-base font-semibold">
                      {date}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          {hasMore && (
            <button onClick={getTodos} disabled={loading}>
              {loading ? <Loader /> : "Load More"}
            </button>
          )}
          {!hasMore && "All Todos Loaded."}
        </div>
      ) : (
        <>
          <div className="grid place-items-center min-h-screen ">
            <Loader />
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
