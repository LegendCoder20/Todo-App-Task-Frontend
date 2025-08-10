import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import TodoForm from "../Forms/TodoForm";
import logo from "../../public/todo logo.png";
import AlertBox from "../components/AlertBox";

function UpdateTodo() {
  const {id} = useParams();
  const nav = useNavigate();
  const [err, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/todo/${id}`,
        {withCredentials: true}
      );

      setFormData({
        title: res.data.todo.title,
        description: res.data.todo.description,
      });
    };

    getTodos();
  }, []);

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/${id}`,
        {
          title: formData.title,
          description: formData.description,
        },
        {withCredentials: true}
      );

      if (res.status === 200) {
        nav("/dashboard");
      }
    } catch (err) {
      let errMsg = err.response?.data?.message;
      setError(errMsg);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <>
      <section class="bg-amber-100 ">
        <div class="alertBox bg-green-300">
          {err && <AlertBox message={err}></AlertBox>}
        </div>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
            Todo App
          </a>
          <div class="w-full bg-gray-100 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <TodoForm
                mode="updateTodo"
                formData={formData}
                setFormData={setFormData}
                onSubmit={updateTodo}
              ></TodoForm>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateTodo;
