import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthForm from "../Forms/AuthForm";
import logo from "../../public/todo logo.png";
import AlertBox from "../components/AlertBox";

function Register() {
  const [err, setError] = useState("");
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const register = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords Doesn't Match");
      setTimeout(() => {
        setError("");
      }, 4000);
    } else {
      try {
        const registerUser = await axios.post(
          `${import.meta.env.VITE_API_URL}/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
          {withCredentials: true}
        );
        if (registerUser.status === 201) {
          nav("/dashboard");
        }
      } catch (err) {
        let errMsg = err.response?.data?.message;
        setError(errMsg);
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    }
  };

  return (
    <>
      <section class="bg-blue-400 ">
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
              <AuthForm
                mode="register"
                formData={formData}
                setFormData={setFormData}
                onSubmit={register}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
