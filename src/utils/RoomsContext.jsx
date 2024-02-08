import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/FirebaseConfig";

const RoomsContext = createContext();

export const useRoom = () => {
  return useContext(RoomsContext);
};

const RoomsContextProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    onSnapshot(
      query(collection(db, "rooms"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const updatedRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(updatedRooms);
      }
    );
  };

  const createRoom = async (user, roomName) => {
    try {
      const roomsDoc = collection(db, "rooms");
      await addDoc(roomsDoc, {
        user,
        roomName,
        createdAt: new Date(),
        userJoined: 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addMessage = async (room, user, message) => {
    try {
        const messagesCollection = collection(db, `rooms/${room.id}/messages`);
        await addDoc(messagesCollection, {
            user,
            message,
            createdAt: new Date(),
        })
    } catch(error) {
        console.log(error.message);
    }
  }

  const getMessages = async (roomId) => {
    try {
        const messagesCollection = collection(db, `rooms/${roomId}/messages`);
        const querySnapshot = onSnapshot(query(messagesCollection, orderBy('createdAt', 'desc')), (snapshot) => {
            const updatedMessages =  snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMessages(updatedMessages);
        });

        return () => {
            querySnapshot();
        }
    } catch(error) {
        console.log(error.message);
    }
  }

  const contextData = {
    rooms,
    createRoom,
    addMessage,
    getMessages,
    messages,
  };
  return (
    <RoomsContext.Provider value={contextData}>
      {children}
    </RoomsContext.Provider>
  );
};
export default RoomsContextProvider;
