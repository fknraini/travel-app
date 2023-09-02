import React from "react";
import NavbarComponent from "../../components/navbar/Navbar";
import UserDashboard from "../../components/userDashboard/UserDashboard";

const DashboardUser = () => {
  return (
    <div>
      <NavbarComponent />
      <UserDashboard />
    </div>
  );
};

export default DashboardUser;
