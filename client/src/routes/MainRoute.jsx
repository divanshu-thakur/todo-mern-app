import { storage } from "../config/storage";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";

const MainRoute = () => {
  let token = storage.fetch.authToken();

  return <>{token ? <AuthenticatedRoutes /> : <AuthenticationRoutes />}</>;
};

export default MainRoute;
