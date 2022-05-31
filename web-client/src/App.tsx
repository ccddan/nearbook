import "regenerator-runtime/runtime";

import { HashRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import NewPostPage from "./pages/NewPost/NewPostPage";
import NoPage from "./pages/NoPage";
import PostPage from "./pages/Post/PostPage";
import React from "react";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/posts" element={<Home />}>
          <Route path="new" element={<NewPostPage />} />
          <Route path=":uuid" element={<PostPage />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </HashRouter>
  );
}
