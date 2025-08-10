import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import TodoForm from "../Forms/TodoForm";

function UpdateTodo() {
  const {id} = useParams();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getTodos = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/todo/${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
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
    let token = localStorage.getItem("token");
    if (!token) {
      nav("/");
      return;
    }

    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/todo/${id}`,
      {
        title: formData.title,
        description: formData.description,
      },
      {headers: {Authorization: `Bearer ${token}`}}
    );
    nav("/dashboard");
    console.log(res);
  };

  return (
    <>
      <TodoForm
        mode="updateTodo"
        formData={formData}
        setFormData={setFormData}
        onSubmit={updateTodo}
      ></TodoForm>
    </>
  );
}

export default UpdateTodo;
