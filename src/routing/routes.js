import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout/DefaultLayout";
import Home from "../screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
