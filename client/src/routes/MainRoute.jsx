import { Routes, Route, Outlet, Navigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { storage } from "../config/storage";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Home from "../components/Home";

const MainRoute = () => {
  let token = storage.fetch.authToken();

  return (
    <>
      <Toaster />

      <Routes>
        {/* routes to get user authenticated */}
        <Route element={!token ? <Outlet /> : <Navigate to={"/Home"} />}>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />

          {/* <Route path="*" element={<Navigate to="/SignUp" />} /> */}
        </Route>
        {/* routes for authentic user */}
        <Route element={token ? <Outlet /> : <Navigate to={"/SignUp"} />}>
          <Route path="/Home" element={<Home />} />
        </Route>
        <Route
          path="*"
          element={token ? <Navigate to="/Home" /> : <Navigate to="/SignUp" />}
        />
      </Routes>

      <footer>
        <div>
          Made with ❤️ by <span />
          <Link
            to="https://www.linkedin.com/in/divanshu-thakur/"
            target="_blank"
          >
            Divanshu Thakur
          </Link>
        </div>
      </footer>
    </>
  );
};

export default MainRoute;
