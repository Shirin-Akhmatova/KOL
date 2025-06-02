import { RouterProvider } from "react-router-dom";
import { myRouter } from "./providers/router";
import "../styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
            <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default App;
