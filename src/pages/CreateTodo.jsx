import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TodoForm from "../Forms/TodoForm";
import axios from "axios";

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
  };

  return (
    <>
      <div class="createTodo-container">
        <TodoForm
          mode="createTodo"
          formData={formData}
          setFormData={setFormData}
          onSubmit={createTodo}
        ></TodoForm>
      </div>
    </>
  );
}

export default CreateTodo;
