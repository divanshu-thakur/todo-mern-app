import MainRoute from "./routes/MainRoute";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  );
};

export default App;
