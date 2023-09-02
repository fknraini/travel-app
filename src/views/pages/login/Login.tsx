import React, { useState } from "react";
import classnames from "classnames";
import Cookies from "js-cookie";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { authApi } from "../../../actions/services/authApi";
import { userApi } from "../../../actions/services/userApi";
import { useWindowDimensions } from "../../../services/Enhancer";

const Login = () => {
  const { isMobile } = useWindowDimensions();
  const [passwordView, setPasswordView] = useState(false);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const postLogin = async (data: any) => {
    const res = await authApi.login(data);
    console.log("res login", res);
    return res;
  };

  const getUser = async (id: number) => {
    const res = await userApi.getUser(id);
    return res;
  };

  const mutation = useMutation(postLogin, {
    onSuccess: (res) => {
      console.log("reslogin", res);
    },
    onError: (err) => {
      console.log("error login", err);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    const id_user = Cookies.get("id_user");
    console.log("id_user",id_user);
    if (typeof id_user === "string") {
      getUser(Number(id_user));
    }
    navigate("/destination");
  };

  const passwordViewFunction = () => {
    setPasswordView(!passwordView);
  };

  return (
    <div className="x-login">
      <Container className="d-flex justify-content-center w-100 h-100">
        <form onSubmit={handleSubmit(onSubmit)} className="x-card-form">
          <h1
            className={classnames(
              isMobile ? "heading-lg-bolder" : "heading-xl-bolder"
            )}
            style={{ color: "var(--grey-5)" }}
          >
            Welcome back!
          </h1>
          <p
            className={classnames(
              "pb-5",
              isMobile ? "text-md-normal" : "text-lg-normal"
            )}
            style={{ color: "var(--grey-3)" }}
          >
            Log in to Find Your Travel Destination
          </p>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", {
                required: true,
                maxLength: 100,
              })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={passwordView ? "text" : "password"}
              className="form-control"
              id="mypassword"
              {...register("password", { required: true })}
            />
          </div>

          <div className="mt-1">
            <input
              type="checkbox"
              className="form-check-input"
              id="mypasswordview"
              name="pw"
              onClick={passwordViewFunction}
              checked={passwordView}
            />
            <label
              className="ms-2 form-label"
              htmlFor="pw"
              onClick={passwordViewFunction}
            >
              Show Password
            </label>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Log In</button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
