import React, {useState, useEffect} from "react";
import axios from "axios";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const hTitle = (e) => setTitle(e.target.value);
  const hDescription = (e) => setDescription(e.target.value);

  const createTodo = async (e) => {
    let token = localStorage.getItem("token");
    const registerUser = await axios.post(
      "http://localhost:5000/api/createTodo",
      {title, description},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(registerUser.data);
  };

  const updateTodo = async (e) => {
    let token = localStorage.getItem("token");
    const registerUser = await axios.put(
      "http://localhost:5000/api/todo/689749921f591bc52d8a314e",
      {title, description},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(registerUser.data);
  };

  const deleteTodo = async (e) => {
    let token = localStorage.getItem("token");
    const registerUser = await axios.delete(
      "http://localhost:5000/api/689749811f591bc52d8a3146",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(registerUser.data);
  };

  return (
    <>
      <div className="register-container">
        <br />
        <br />
        <form>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            required
            autoComplete="on"
            onChange={hTitle}
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            required
            autoComplete="on"
            onChange={hDescription}
          />

          <br />
          <br />
          <button type="submit" onClick={createTodo}>
            Create Todo
          </button>
          <button type="submit" onClick={updateTodo}>
            Update Todo
          </button>
          <button type="submit" onClick={deleteTodo}>
            Delete Todo
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateTodo;
