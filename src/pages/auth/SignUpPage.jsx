import React, { useState } from "react";
import { PiImagesSquareLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";

const SignUpPage = () => {
  const { signUpUser } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hanldeUploadUserPhoto = async () => {
    try {
      if (!photo) return null;

      const storageRef = ref(storage, `photo/${photo.name}`);
      await uploadBytes(storageRef, photo);
      const photoURL = await getDownloadURL(storageRef);
      return photoURL;
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeSignUpUser = async (e) => {
    e.preventDefault();

    try {
      if (userName != "" && email != "" && password != "") {
        let photoURL = null;

        if (photo && photo.type.includes("image")) {
          photoURL = await hanldeUploadUserPhoto();
        }

        await signUpUser(photoURL, userName, email, password)

        setPhoto(null);
        setUserName("");
        setEmail("");
        setPassword("");

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={hanldeSignUpUser}
        className="flex flex-col justify-center items-center gap-5 w-[350px] h-[450px] rounded-lg bg-[#0c0b0b]"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-lg font-bold">Sign up</h3>
          <p className="font-semibold">Please create you account to continue</p>
        </div>

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          id="photo"
          style={{ display: "none" }}
        />
        <label
          htmlFor="photo"
          className="flex justify-start items-center gap-1 border border-[#969393]/50 rounded-lg w-[300px] p-2 cursor-pointer active:scale-95 duration-300 transition ease-in"
        >
          <PiImagesSquareLight size={22} /> Upload a profile picture
        </label>

        <input
          type="text"
          required
          value={userName}
          placeholder="Full Name"
          onChange={(e) => setUserName(e.target.value)}
          className="flex justify-center items-center gap-1 border border-[#969393]/50 rounded-lg w-[300px] p-2 focus:outline-none bg-[#0c0b0b]"
        />
        <input
          type="email"
          required
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="flex justify-center items-center gap-1 border border-[#969393]/50 rounded-lg w-[300px] p-2 focus:outline-none bg-[#0c0b0b]"
        />
        <input
          type="password"
          required
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="flex justify-center items-center gap-1 border border-[#969393]/50 rounded-lg w-[300px] p-2 focus:outline-none bg-[#0c0b0b]"
        />

        <button className="bg-[#DB1A5B] w-[300px] p-2 active:scale-95 transition duration-300 ease-in-out rounded-lg">
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-[#1454A9]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
