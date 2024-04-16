import React from "react";
import Header from "./layouts/client/Header/Header";
import PublicRoute from "./routes/PublicRoute";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import Library from "./pages/client/Library/Library";
import Upload from "./pages/client/Upload/Upload";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </>
  );
}
