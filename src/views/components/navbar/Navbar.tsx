import React, { useState } from "react";
import classnames from "classnames";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useWindowDimensions } from "../../../services/Enhancer";
import { authApi } from "../../../actions/services/authApi";

const NavbarComponent = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { isMobile } = useWindowDimensions();

  const roleUser = Cookies.get("role");
  const navigate = useNavigate();

  const token = Cookies.get("token");
  console.log("token", token);

  const postLogOut = async () => {
    const res = await authApi.logout();
    console.log("token", token);
    console.log("res logout", res);
    return res;
  };

  const mutationLogOut = useMutation(postLogOut, {
    onSuccess: (res) => {},
    onError: (err) => {
      console.log("error logout", err);
    },
  });

  if (mutationLogOut.isSuccess) {
    navigate("/");
  }

  return (
    <nav
      className={classnames(
        "navbar navbar-expand-lg navbar-light bg-light fixed-top main-navigation",
        openSidebar && "active"
      )}
    >
      <div className="container-fluid ">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpenSidebar(true)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <p
          className={classnames(
            "x-navbar-brand mb-0",
            isMobile ? "heading-sm-normal" : "heading-md-normal ms-4"
          )}
        >
          Travel App
        </p>

        <div
          className="overlay d-flex d-lg-none"
          onClick={() => setOpenSidebar(false)}
        />
        <div
          className={classnames(
            "order-lg-2 sidebar",
            isMobile
              ? "text-md-normal bg-light d-lg-flex w-100 pb-3 pb-lg-0"
              : "collapse navbar-collapse justify-content-end me-4"
          )}
          id="navbarSupportedContent"
        >
          {token ? (
            <ul className="navbar-nav ">
              {roleUser === "superadmin" && (
                <li className="nav-item">
                  <a
                    className={classnames(
                      "x-button me-3 cursor-pointer",
                      isMobile && "text-lg-normal ms-3"
                    )}
                    href="/dashboard-user"
                  >
                    Dashboad User
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a
                  className={classnames(
                    "x-button me-3 cursor-pointer",
                    isMobile && "text-lg-normal ms-3"
                  )}
                  href="/destination"
                >
                  Destination
                </a>
              </li>
              {roleUser !== "superadmin" && (
                <li className="nav-item">
                  <a
                    className={classnames(
                      "x-button me-3 cursor-pointer",
                      isMobile && "text-lg-normal ms-3"
                    )}
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a
                  className={classnames(
                    "x-button me-3 cursor-pointer",
                    isMobile && "text-lg-normal ms-3"
                  )}
                  onClick={() => mutationLogOut.mutate()}
                >
                  Log Out
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a
                  className={classnames(
                    "x-button me-3",
                    isMobile && "text-lg-normal ms-3"
                  )}
                  aria-current="page"
                  href="/login"
                >
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={classnames(
                    "x-button me-3",
                    isMobile && "text-lg-normal ms-3"
                  )}
                  href="/register"
                >
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
