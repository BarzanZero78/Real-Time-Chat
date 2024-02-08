import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../utils/RoomsContext";
import MessageInput from "../components/MessageInput";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../utils/AuthContext";

const RoomPage = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { rooms, getMessages, messages, deleteMessage } = useRoom();
  const [room, setRoom] = useState(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const timeAgo = (createdAt) => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - createdAt) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo}s ago`;
    } else if (secondsAgo < 3600) {
      return `${secondsAgo}m ago`;
    } else if (secondsAgo < 86400) {
      return `${secondsAgo}h ago`;
    } else if (secondsAgo < 604800) {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo}d ago`;
    } else {
      const weeksAgo = Math.floor(secondsAgo / 604800);
      return `${weeksAgo}w ago`;
    }
  };

  useEffect(() => {
    getRoom();
  }, [rooms, roomId]);

  const getRoom = () => {
    if (rooms.length > 0) {
      const foundRoom = rooms.find((room) => room.id === roomId);
      setRoom(foundRoom);
    }
  };

  useEffect(() => {
    getMessages(roomId);
  }, [roomId]);

  const hanldeDeleteMessage = async (message) => {
    await deleteMessage(room, message);
  }

  return (
    <div>
      {room ? (
        <div className="">
          <header className="flex justify-between items-center w-full py-10 px-2">
            <h3 className="text-lg">
              <strong>{room.roomName}</strong> created by{" "}
              <strong>{room.user.userName}</strong>
            </h3>

            <button
              onClick={() => history.back()}
              className="bg-white text-black rounded-lg py-2 px-5 active:scale-95 transition duration-300 ease-in-out"
            >
              Leave room
            </button>
          </header>

          <div
            ref={messagesContainerRef}
            className="flex flex-col justify-center items-center gap-3"
            style={{ maxHeight: "380px", overflowY: "auto" }}
          >
            {messages
              .slice()
              .reverse()
              .map((message) => (
                <div
                  className={`flex flex-col ${
                    message.user.userId === user.profile.userId
                      ? "mr-2 ml-auto"
                      : "ml-2 mr-auto"
                  } items-center w-[350px] gap-1 bg-[#0c0b0d] rounded-lg p-2`}
                  key={message.id}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-center items-center gap-1">
                      <img
                        src={message.user.photoURL}
                        className="w-10 h-10 object-cover rounded-full"
                        alt=""
                      />
                      <strong>{message.user.userName}</strong>
                    </div>

                    <div>
                      {message.user.userId === user.profile.userId ? (
                        <button onClick={() => hanldeDeleteMessage(message)} className="active:scale-95 transition duration-300 ease-in-out">
                          <AiOutlineDelete size={24} />
                        </button>
                      ) : (
                        <></>
                      )}
                      {timeAgo(message.ceatedAt)}
                    </div>
                  </div>

                  <p className="flex ml-0 mr-auto p-2">{message.message}</p>
                </div>
              ))}
          </div>

          <MessageInput room={room} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomPage;
