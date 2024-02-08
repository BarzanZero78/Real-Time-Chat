import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useRoom } from "../utils/RoomsContext";

const CreateRoomForm = ({ showCreateRoomForm, setShowCreateRoomForm }) => {
  const { user } = useAuth();
  const { createRoom } = useRoom();
  const [roomName, setRoomName] = useState("");

  const hanldeCreateRoom = async (e) => {
    e.preventDefault();

    try {
      await createRoom(user.profile, roomName);
      setShowCreateRoomForm(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowCreateRoomForm(!showCreateRoomForm)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen overflow-y-hidden bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] bg-[#0f0f0f] rounded-lg flex flex-col justify-center items-center gap-3"
      >
        <h3 className="text-lg font-bold">Create your room</h3>

        <form
          onSubmit={hanldeCreateRoom}
          className="flex flex-col justify-center items-center gap-5"
        >
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room Name"
            required
            className="w-[300px] p-2 bg-[#0f0f0f] border border-[#969393]/50 rounded-lg focus:outline-none"
          />
          <button className="bg-white text-black rounded-lg py-2 px-5 active:scale-95 transition duration-300 ease-in-out">
            Create room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomForm;
