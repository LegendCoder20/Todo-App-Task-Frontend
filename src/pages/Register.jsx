import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthForm from "../Forms/AuthForm";
import logo from "../../public/todo logo.png";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";

function Register() {
  const [err, setError] = useState("");
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!loading ? (
        <section className="bg-blue-400 ">
          <div className="alertBox bg-green-300">
            {err && <AlertBox message={err}></AlertBox>}
          </div>
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

export default Register;
