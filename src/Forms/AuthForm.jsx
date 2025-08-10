import React from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

function AuthForm({mode, formData, setFormData, onSubmit}) {
  return (
    <>
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
        {mode === "login" ? "Login Page" : "Register Page"}
      </h1>
      <br />
      <br />
      <form onSubmit={onSubmit} className="max-w-sm mx-auto">
        {mode === "register" && (
          <InputBox
            labelName="Name"
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          ></InputBox>
        )}

        <InputBox
          labelName="Email"
          type="text"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        ></InputBox>

        <InputBox
          labelName="Password"
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        ></InputBox>
        {mode === "register" && (
          <InputBox
            labelName="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Enter your Password Again"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({...formData, confirmPassword: e.target.value})
            }
          ></InputBox>
        )}

        <br />
        <div class="">
          <Button type="submit">
            {mode === "login" ? "Login" : "Register"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
