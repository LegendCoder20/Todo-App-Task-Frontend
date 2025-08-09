import React, {useState, useEffect} from "react";
import axios from "axios";

function Login() {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hEmail = (e) => setEmail(e.target.value);
  const hPassword = (e) => setPassword(e.target.value);

  const login = async (e) => {
    e.preventDefault();
    let token;
    try {
      const res = await axios.post("http://localhost:5000/api/", {
        email,
        password,
      });
      token = res.data.token;
      console.log(res.data.token);
    } catch (err) {
      console.log(err.response?.data?.message);
    }

    localStorage.setItem("token", token);
  };

  return (
    <>
      <div className="login-container">
        <h1>Login Page</h1>
        <br />
        <br />
        <form>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
            autoComplete="on"
            onChange={hEmail}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            required
            autoComplete="on"
            onChange={hPassword}
          />
          <br />
          <br />
          <button type="submit" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
