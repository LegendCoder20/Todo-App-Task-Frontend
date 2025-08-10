import React, {useState, useEffect} from "react";
import axios from "axios";
import AuthForm from "../Forms/AuthForm";

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
      <div className="register-container">
        <AuthForm
          mode="register"
          formData={formData}
          setFormData={setFormData}
          onSubmit={register}
        />
      </div>
    </>
  );
}

export default Register;
