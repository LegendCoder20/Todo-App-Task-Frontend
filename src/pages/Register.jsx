import React, {useState, useEffect} from "react";
import axios from "axios";
import AuthForm from "../Forms/AuthForm";
import logo from "../../public/todo logo.png";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const register = async (e) => {
    e.preventDefault();
    const registerUser = await axios
      .post("http://localhost:5000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then((data) => {
        console.log(data);
      });
    console.log(registerUser);
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
