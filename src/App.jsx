import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import AuthContextProvider from "./utils/AuthContext";
import Header from "./components/Header";
import ProtectedRoute from "./utils/ProtectedRoute";
import GuestedRoute from "./utils/GuestedRoute";
import RoomsContextProvider from "./utils/RoomsContext";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <AuthContextProvider>
      <RoomsContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              excat
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route excat path="/room/:roomId" element={<RoomPage />} />

            <Route
              excat
              path="/login"
              element={
                <GuestedRoute>
                  <LoginPage />
                </GuestedRoute>
              }
            />

            <Route excat path="/signup" element={<SignUpPage />} />

            <Route
              excat
              path="/reset_password"
              element={<ResetPasswordPage />}
            />
          </Routes>
        </Router>
      </RoomsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
