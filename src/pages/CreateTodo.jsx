import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TodoForm from "../Forms/TodoForm";
import axios from "axios";
import logo from "../../public/todo logo.png";

function CreateTodo() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const createTodo = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (!token) {
      nav("/");
      return;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/createTodo`,
      {title: formData.title, description: formData.description},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    nav("/dashboard");
  };

  return (
    <>
      <section class="bg-gray-50 ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
            Todo App
          </a>
          <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <TodoForm
                mode="createTodo"
                formData={formData}
                setFormData={setFormData}
                onSubmit={createTodo}
              ></TodoForm>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateTodo;
