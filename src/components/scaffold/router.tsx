import { createBrowserRouter } from "react-router-dom";
import Appframe from "../Appframe";
import HomePage from "../pages/home/Page";
import TrackPage from "../pages/track/Page";
import RecommendationsPage from "../pages/recommendations/Page";

const routes = [
  {
    path: "*",
    element: <Appframe />,
    children: [
      { path: "*", element: <HomePage /> },
      { path: "track/:id", element: <TrackPage /> },
      { path: "recommendations", element: <RecommendationsPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
