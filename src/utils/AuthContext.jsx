import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    const unsubscribeUser = auth.onAuthStateChanged(async (accountDetails) => {
      if (accountDetails) {
        const userDocRef = doc(db, "users", accountDetails.uid);
        const profileSnapshot = await getDoc(userDocRef);

        if (profileSnapshot.exists()) {
          accountDetails["profile"] = profileSnapshot.data();
          setUser(accountDetails);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
        unsubscribeUser();
    }
  };

  const signUpUser = async (photoURL, userName, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        await setDoc(userDoc, {
          photoURL,
          userName,
          email,
          userId: user.uid,
        });
      }

      console.log("ACCOUNT CREATED SUCCESSFULLY");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const contextData = {
    isLoading,
    user,
    signUpUser,
    loginUser,
    resetPassword,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
