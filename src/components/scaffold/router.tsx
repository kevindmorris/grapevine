import { createBrowserRouter } from "react-router-dom";
import Appframe from "../Appframe";
import HomePage from "../pages/home/Page";

const routes = [
  {
    path: "*",
    elemenet: <Appframe />,
    children: [{ path: "*", element: <HomePage /> }],
  },
];

const router = createBrowserRouter(routes);

export default router;
