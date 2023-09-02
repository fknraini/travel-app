import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Destination from "../../views/pages/destination/Destination";
import Landing from "../../views/pages/landing/Landing";
import Login from "../../views/pages/login/Login";
import Register from "../../views/pages/register/Register";
import Profile from "../../views/pages/profile/Profile";
import { isAuthenticated } from "../../utils/helper";

interface AppComponentProps {
  restricted: boolean;
  path: string;
  exact?: boolean;
}

const AppComponent: React.FC<AppComponentProps> = ({
  restricted,
  ...rest
}) => {
  const isLoggedIn = isAuthenticated();
  const roleUser = Cookies.get("role");

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/Destination" /> : <Login/> } />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/Destination"/> : <Register/>} />
      <Route path="/profile" element={isLoggedIn && roleUser !== "superadmin" ? <Profile /> : <Navigate to="/Destination" />}/>
      <Route path="/dashboard-user" element={isLoggedIn && roleUser === "superadmin"? <Destination /> : <Navigate to="/"  />}/>
      <Route path="/destination" element={isLoggedIn ? <Destination /> : <Navigate to="/"  />}/>
    </Routes>
  );
};

export default AppComponent;