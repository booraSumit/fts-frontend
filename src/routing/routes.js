import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout/DefaultLayout";
import Home from "../screens/Home";
import Signin from "../screens/auth/Signin";
import Upload from "../screens/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/upload-file", element: <Upload /> },
    ],
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
]);

export default router;
