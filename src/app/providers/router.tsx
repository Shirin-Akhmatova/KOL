import { createBrowserRouter } from "react-router-dom";
import Layout from "../../widgets/Layout/Layout";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import MapWithListings from "../../pages/MapWithListings/MapWithListings";
import CardPage from "@/pages/cardPage/CardPage";

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
        path: "/map",
        element: <MapWithListings />,
      },
      {
        path: "/cardPage",
        element: <CardPage/>
      }
    ],
  },
]);
