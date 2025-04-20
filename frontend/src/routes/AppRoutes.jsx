import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../screens/Login.jsx";
import Register from "../screens/Register.jsx";
import Home from "../screens/Home.jsx";
import VirtualHome from "../screens/VirtualHome.jsx";
import Project from "../screens/Project.jsx";
import AddUser from "../components/AddUser.jsx";
import UserAuth from "../auth/UserAuth.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project-dashboard" element={<VirtualHome />} />
        <Route
          path="/project/:id"
          element={
            <UserAuth>
              <Project />
            </UserAuth>
          }
        />
        <Route path="/project/:id/user/add" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
