import React, {useCallback} from "react";
import {Link} from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

function AuthForm({mode, formData, setFormData, onSubmit}) {
  const handleChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({...prev, [field]: e.target.value}));
    },
    [setFormData]
  );
  return (
    <>
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
        {mode === "login" ? "Login Page" : "Register Page"}
      </h1>

      <form onSubmit={onSubmit} className="max-w-sm mx-auto">
        {mode === "register" && (
          <InputBox
            labelName="Name"
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange("name")}
          ></InputBox>
        )}
        <InputBox
          labelName="Email"
          type="text"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange("email")}
        ></InputBox>
        <InputBox
          labelName="Password"
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange("password")}
        ></InputBox>
        {mode === "register" && (
          <InputBox
            labelName="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Enter your Password Again"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
          ></InputBox>
        )}
        <br />
        <div class="text-center">
          <Button type="submit">
            {mode === "login" ? "Login" : "Register"}
          </Button>
        </div>
        <br />
        <div class="text-center flex justify-center ">
          <div class="">
            {mode === "login"
              ? "Don't have an Account? "
              : "Already have an Account?"}
          </div>

          <Link
            className="pl-2 font-bold text-blue-700 underline"
            to={mode === "login" ? "/register" : "/"}
          >
            {mode === "login" ? " Register" : "Login"}
          </Link>
        </div>
      </form>
    </>
  );
}

export default React.memo(AuthForm);
