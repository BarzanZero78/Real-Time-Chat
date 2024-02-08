import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import CreateRoomForm from "./CreateRoomForm";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
  const naviate = useNavigate();

  const hanldeLogoutUser = async () => {
    try {
      await logoutUser();
      naviate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  if (
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.includes("reset_password")
  ) {
    return null;
  }

  return (
    <>
      {user ? (
        <header className="sticky top-0 left-0 w-full h-14 flex justify-around items-center bg-[#111010]">
          <Link to='/' className="text-[#DB1A5B] font-extrabold active:scale-95 transition duration-300">ConversationRoom</Link>

          {location.pathname.includes("/room/") ? (
            <></>
          ) : (
            <button
              onClick={() => setShowCreateRoomForm(!showCreateRoomForm)}
              className="bg-white text-black rounded-lg py-2 px-5 active:scale-95 transition duration-300 ease-in-out"
            >
              Create room
            </button>
          )}

          {showCreateRoomForm && (
            <CreateRoomForm
              showCreateRoomForm={showCreateRoomForm}
              setShowCreateRoomForm={setShowCreateRoomForm}
            />
          )}

          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center items-center gap-2">
              <img
                src={user.profile.photoURL}
                className="w-10 h-10 object-cover rounded-full"
                alt=""
              />
              <b>{user.profile.userName}</b>
            </div>

            <button
              onClick={hanldeLogoutUser}
              className="bg-white text-black rounded-lg py-2 px-5 active:scale-95 transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
