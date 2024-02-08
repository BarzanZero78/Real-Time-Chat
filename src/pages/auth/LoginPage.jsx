import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const LoginPage = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeLoginUser = async (e) => {
    e.preventDefault();

    try {
      if (email != "" && password != "") {
        await loginUser(email, password);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={hanldeLoginUser}
        className="flex flex-col justify-center items-center gap-5 w-[350px] h-[350px] rounded-lg bg-[#0c0b0b]"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-lg font-bold">Login</h3>
          <p className="font-semibold">To continue login here</p>
        </div>

        <input
          type="email"
          required
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="flex justify-center items-center gap-1 border border-[#969393]/50 rounded-lg w-[300px] p-2 focus:outline-none bg-[#0c0b0b]"
        />

        <div className="flex flex-col justify-end items-end gap-1">
          <input
            type="password"
            required
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="flex justify-center items-center gap-1 border border-[#969393]/50 rounded-lg w-[300px] p-2 focus:outline-none bg-[#0c0b0b]"
          />
          <Link to="/reset_password" className="text-[#1454A9]">
            Forgot Password?
          </Link>
        </div>

        <button className="bg-[#DB1A5B] w-[300px] p-2 active:scale-95 transition duration-300 ease-in-out rounded-lg">
          Sign Up
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#1454A9]">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
