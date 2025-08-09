import React, {useState, useEffect} from "react";
import axios from "axios";

function Register() {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hName = (e) => setName(e.target.value);
  const hEmail = (e) => setEmail(e.target.value);
  const hPassword = (e) => setPassword(e.target.value);

  const register = async (e) => {
    e.preventDefault();
    const registerUser = await axios
      .post("http://localhost:5000/api/register", {name, email, password})
      .then((data) => {
        console.log(data);
      });
    console.log(registerUser);
  };

  return (
    <>
      <div className="register-container">
        <h1>Register Page</h1>
        <br />
        <br />
        <form>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
            autoComplete="on"
            onChange={hName}
          />
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
          <button type="submit" onClick={register}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
