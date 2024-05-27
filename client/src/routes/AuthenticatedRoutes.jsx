import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />

      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
