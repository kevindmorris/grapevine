import { Routes, Route } from "react-router-dom";
import Track from "../components/pages/Track/Track";
import Home from "../components/pages/Home";
import Search from "../components/pages/Search/Search";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/track/:id" element={<Track />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
