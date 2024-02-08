import React, { useState } from "react";
import { useRoom } from "../utils/RoomsContext";
import { useAuth } from "../utils/AuthContext";

const MessageInput = ({ room }) => {
  const { user } = useAuth();
  const { addMessage } = useRoom();
  const [message, setMessage] = useState("");

  const hanldeAddMessage = async () => {
    try {
      if (message != "") {
        await addMessage(room, user.profile, message);
        setMessage("");
      } else {
        alert("Write something...");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 flex justify-between items-center p-3 w-full rounded-lg bg-[#0c0b0d]">
      <input
        type="text"
        placeholder="Message..."
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-[#969393]/50 focus:outline-none rounded-lg w-[91%] p-3 bg-[#0c0b0d]"
      />
      <button
        onClick={hanldeAddMessage}
        className="bg-[#111010] w-[100px] rounded-lg p-3"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
