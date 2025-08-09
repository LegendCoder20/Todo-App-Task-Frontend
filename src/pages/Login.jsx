import React, {useState, useEffect} from "react";
import axios from "axios";
import AuthForm from "../Forms/AuthForm";

function Login() {
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
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data?.message);
    }

    localStorage.setItem("token", token);
  };

  return (
    <>
      <div className="register-container">
        <AuthForm
          mode="login"
          formData={formData}
          setFormData={setFormData}
          onSubmit={login}
        ></AuthForm>
      </div>
    </>
  );
}

export default Login;
