import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthForm from "../Forms/AuthForm";
import logo from "../../public/todo logo.png";

function Login() {
  console.log("Re rendered");
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const getUser = async () => {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
    };

    getUser();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    let token;
    try {
      const res = await axios.post("http://localhost:5000/api/", {
        email: formData.email,
        password: formData.password,
      });
      token = res.data.token;

      nav("/dashboard");
    } catch (err) {
      console.log(err.response?.data?.message);
    }

    localStorage.setItem("token", token);
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
              <AuthForm
                mode="login"
                formData={formData}
                setFormData={setFormData}
                onSubmit={login}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
