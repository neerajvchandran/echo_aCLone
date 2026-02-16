import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Feed from "./pages/Feed";
import People from "./pages/People";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import DeleteAccount from "./pages/DeleteAccount";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<People />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/people" element={<People />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
