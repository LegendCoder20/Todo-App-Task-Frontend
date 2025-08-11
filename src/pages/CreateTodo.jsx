import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TodoForm from "../Forms/TodoForm";
import axios from "axios";
import logo from "../../public/todo logo.png";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";

function CreateTodo() {
  const nav = useNavigate();
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/createTodo`,
        {title: formData.title, description: formData.description},
        {withCredentials: true}
      );
      if (res.status === 201) {
        nav("/dashboard");
      }
    } catch (err) {
      let errMsg = err.response?.data?.message;
      setError(errMsg);
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <section className="bg-green-100 ">
          {err && <AlertBox message={err}></AlertBox>}

          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
            >
              <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
              Todo App
            </a>
            <div className="w-full bg-gray-100 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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

export default CreateTodo;
