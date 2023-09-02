import React, { useState } from "react";
import classnames from "classnames";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { authApi } from "../../../actions/services/authApi";
import { useWindowDimensions } from "../../../services/Enhancer";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register: React.FC = () => {
  const { isMobile } = useWindowDimensions();
  const [passwordView, setPasswordView] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<RegisterData>();
  const navigate = useNavigate();

  const postRegister = async (data: RegisterData) => {
    const res = await authApi.register(data);
    console.log("res login", res);
    return res;
  };

  const mutation = useMutation(postRegister, {
    onSuccess: (res) => {
      console.log("res", res);
      navigate("/login");
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const onSubmit = (data: RegisterData) => {
    mutation.mutate(data);
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
            Create Account
          </h1>
          <p
            className={classnames(
              "pb-5",
              isMobile ? "text-md-normal" : "text-lg-normal"
            )}
            style={{ color: "var(--grey-3)" }}
          >
            Register to Find Your Travel Destination
          </p>

          <div className="mb-2">
            <label htmlFor="text" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              {...register("name", {
                required: true,
                maxLength: 100,
              })}
            />
          </div>

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

          <div className="mt-2">
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

          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="mypassword"
              {...register("password_confirmation", { required: true })}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import classnames from "classnames";
// import { Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useMutation } from "react-query";
// import { authApi } from "../../../actions/services/authApi";
// import { useWindowDimensions } from "../../../services/Enhancer";

// const Register = () => {
//   const { isMobile } = useWindowDimensions();
//   const [passwordView, setPasswordView] = useState(false);

//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const postRegister = async (data) => {
//     const res = await authApi.register(data);
//     console.log("res login", res);
//     return res;
//   };

//   const mutation = useMutation(postRegister, {
//     onSuccess: (res) => {
//       console.log("res", res);
//     },
//     onError: (err) => {
//       console.log("err", err);
//     },
//   });

//   const onSubmit = (data) => {
//     mutation.mutate(data);
//   };

//   if (mutation.isSuccess) {
//     navigate("/login");
//   };

//   const passwordViewFunction = () => {
//     setPasswordView(!passwordView);
//   };

//   return (
//     <div className="x-login">
//       <Container className="d-flex justify-content-center w-100 h-100">
//         <form onSubmit={handleSubmit(onSubmit)} className="x-card-form">
//           <h1
//             className={classnames(
//               isMobile ? "heading-lg-bolder" : "heading-xl-bolder"
//             )}
//             style={{ color: "var(--grey-5)" }}
//           >
//             Create Account
//           </h1>
//           <p
//             className={classnames(
//               "pb-5",
//               isMobile ? "text-md-normal" : "text-lg-normal"
//             )}
//             style={{ color: "var(--grey-3)" }}
//           >
//             Register to Find Your Travel Destination
//           </p>

//           <div className="mb-2">
//             <label htmlFor="text" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="text"
//               {...register("name", {
//                 required: true,
//                 maxLength: 100,
//               })}
//             />
//           </div>

//           <div className="mb-2">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               {...register("email", {
//                 required: true,
//                 maxLength: 100,
//               })}
//             />
//           </div>

//           <div className="mb-2">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type={passwordView ? "text" : "password"}
//               className="form-control"
//               id="mypassword"
//               {...register("password", { required: true })}
//             />
//           </div>

//           <div className="mt-2">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="mypasswordview"
//               name="pw"
//               onClick={passwordViewFunction}
//               checked={passwordView}
//             />
//             <label
//               className="ms-2 form-label"
//               for="pw"
//               onClick={passwordViewFunction}
//             >
//               Show Password
//             </label>
//           </div>
          
//           <div className="mb-2">
//             <label htmlFor="password" className="form-label">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="mypassword"
//               {...register("password_confirmation", { required: true })}
//             />
//           </div>

//           <div className="d-grid">
//             <button className="btn btn-primary">Register</button>
//           </div>

//         </form>
//       </Container>
//     </div>
//   );
// };

// export default Register;
