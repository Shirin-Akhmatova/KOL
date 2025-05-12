import { RouterProvider } from "react-router-dom";
import { myRouter } from "./providers/router";
import "../styles/App.css";

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
