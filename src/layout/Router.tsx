import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "../components/pages/Search";
import Track from "../components/pages/Track";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/track/:id" element={<Track />} />

      <Route path="*" element={<Search />} />
    </Routes>
  );
}
