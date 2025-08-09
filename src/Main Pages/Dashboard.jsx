import React, {useState, useEffect} from "react";
import axios from "axios";

// Put this Below Code in Login and Register Page whendivided it into routes cause this will check if the user already aexit and that in register o rlogin page cause dashboard page is for getting all the todos of that user so
function Dashboard() {
  useEffect(() => {
    const getTodos = async () => {
      let token = localStorage.getItem("token");
      const allTodos = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(allTodos.data);
    };

    getTodos();
  }, []);

  return <div></div>;
}

export default Dashboard;
