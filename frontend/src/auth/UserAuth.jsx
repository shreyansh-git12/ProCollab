import React, { useEffect } from "react";
import { UserContext } from "../context/user.context";
import { useContext } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const UserAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }

    if (!token) {
      navigate("/login");
    }
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <>{children}</>;
};

export default UserAuth;
