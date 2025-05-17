import { createBrowserRouter } from "react-router-dom";
import Layout from "../../widgets/Layout/Layout";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import CardPage from "../../pages/cardPage/CardPage";
import LoginUserProfilePage from "../../widgets/LoginUserProfilePage/LoginUserProfilePage";

export const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cardPage",
        element: <CardPage />,
      },
      {
        path: "/loginUserProfilePage",
        element: <LoginUserProfilePage />,
      },
    ],
  },
]);
