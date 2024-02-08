import React from "react";
import { useRoom } from "../utils/RoomsContext";
import Room from "../components/Room";

const HomePage = () => {
  const { rooms } = useRoom();

  return (
    <div className="pt-[30px]">
      <div className="flex flex-wrap justify-center items-center gap-5">
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
