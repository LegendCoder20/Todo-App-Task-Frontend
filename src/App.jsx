import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Dashboard from "./Main Pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodo from "./pages/UpdateTodo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/createTodo" element={<CreateTodo />}></Route>
          <Route path="/updateTodo/:id" element={<UpdateTodo />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
