import React from "react";
import { Link } from "react-router-dom";

const Room = ({ room }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 bg-[#0c0b0d] w-[175px] h-[125px] rounded-lg">
      <h3 className="font-bold">{room.roomName}</h3>

      <Link
        to={`/room/${room.id}`}
        className="bg-white text-black rounded-lg p-1 active:scale-95 transition duration-200 ease-in-out"
      >
        Join Room
      </Link>
    </div>
  );
};

export default Room;
