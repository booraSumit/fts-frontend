import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout/DefaultLayout";
import Home from "../screens/Home";
import Signin from "../screens/auth/Signin";
import Upload from "../screens/Upload";

import { EDITOR, SIGNIN, UPLOADFILE } from "./routePaths";
import Editor from "../components/editor";
import PrivateRoute from "../screens/PrivateRoute";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <DefaultLayout />,
  //   // children: [{ index: true, element: <Home /> }],
  // },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: EDITOR, element: <Editor /> },
        ],
      },
    ],
  },
  {
    path: SIGNIN,
    element: <Signin />,
  },
]);

export default router;
