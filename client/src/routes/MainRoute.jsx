import { storage } from "../config/storage";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainRoute = () => {
  let token = storage.fetch.authToken();

  return (
    <>
      <Toaster />
      {token ? <AuthenticatedRoutes /> : <AuthenticationRoutes />}
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
