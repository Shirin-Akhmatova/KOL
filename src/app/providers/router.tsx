import { createBrowserRouter } from "react-router-dom";
import Layout from "../../widgets/Layout/Layout";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import LoginUserProfilePage from "../../widgets/LoginUserProfilePage/LoginUserProfilePage";
import MapWithListings from "../../pages/MapWithListings/MapWithListings";
import CardPage from "@/pages/cardPage/CardPage";
import CreateService from "@/pages/CreateService/CreateService";
import ProtectedRoute from "@/widgets/ProtectedRoute/ProtectedRoute";
import FavoritesPage from "@/pages/Favorites/Favorites";
import UserProfile from "@/pages/OwnerProfile/OwnerProfile";
import OwnerProfile from "@/pages/OwnerProfile/OwnerProfile";

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
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/map",
        element: <MapWithListings />,
      },
      {
        path: "/cardPage/:id",
        element: <CardPage />,
      },
      {
        path: "/loginUserProfilePage",
        element: <LoginUserProfilePage />,
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: "/create-service",
      //       element: <CreateService />,
      //     },
      //   ],
      // },
      {
        path: "/create-service",
        element: <CreateService />,
      },
      {
        path: "/ownerProfile",
        element: <OwnerProfile/>,
      },
    ],
  },
]);
