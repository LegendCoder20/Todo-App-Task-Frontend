import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Main Pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateTodo from "./components/CreateTodo";

function App() {
  return (
    <>
      <div class="">
        <Dashboard></Dashboard>
        <Register></Register>
        <Login></Login>
        <CreateTodo></CreateTodo>
      </div>
    </>
  );
}

export default App;
