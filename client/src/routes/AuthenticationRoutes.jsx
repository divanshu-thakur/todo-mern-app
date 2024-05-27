import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />

      <Route path="*" element={<Navigate to="/SignUp" />} />
    </Routes>
  );
};

export default AuthenticationRoutes;
