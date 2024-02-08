import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";

const ResetPasswordPage = () => {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');

    const hanldeResetPassword = async (e) => {
        e.preventDefault();

        try {
            await resetPassword(email);
            alert('Check your inbox to reset your password');
        } catch(error) {
            console.log(error.message);
        }
    }

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={hanldeResetPassword}
        className="flex flex-col justify-center items-center gap-5 w-[350px] h-[250px] rounded-lg bg-[#0c0b0b]"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-lg font-bold">Reset Password</h3>
          <p className="font-semibold">To reset your password enter your email</p>
        </div>

        <input
          type="email"
          required
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="flex justify-center items-center gap-1 border border-[#969393]/50 rounded-lg w-[300px] p-2 focus:outline-none bg-[#0c0b0b]"
        />

        <button className="bg-[#DB1A5B] w-[300px] p-2 active:scale-95 transition duration-300 ease-in-out rounded-lg">
          Reset Password
        </button>

      </form>
    </div>
  );
};

export default ResetPasswordPage;
