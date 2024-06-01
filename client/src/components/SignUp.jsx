import SignUpImage from "../images/signup-image.jpg";
import { FaUser, FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import AuthenticationApi from "../services/authentication";
import { RESPONSE_STATUS } from "../constants/status";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please re-enter your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log("values", values);
        let data = await AuthenticationApi.requestUserSignUp({
          userName: values.userName,
          email: values.email,
          password: values.password,
        });
        console.log("data", data);
        if (data.status === RESPONSE_STATUS.SUCCESS) {
          toast.success("Account created successfully. Please Signin.", {
            id: "registrationSuccess",
          });
          navigate("/SignIn"); // toast not visible
        } else if (data.status === RESPONSE_STATUS.ERROR) {
          console.log(data.message);
          toast.error(data.message, {
            id: "registrationError",
          });
        }
      },
    });

  return (
    <>
      <Toaster />
      <div className="main">
        {/* <section className="signup"> */}
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.userName && touched.userName && (
                    <span className="error">{errors.userName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    {/* <i className="zmdi zmdi-email"></i> */}
                    <MdEmail />
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    {/* <i className="zmdi zmdi-lock"></i> */}
                    <FaLock />
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    {/* <i className="zmdi zmdi-lock-outline"></i> */}
                    <FaLock />
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                  )}
                </div>
                {/* <div className="form-group">
                    <input
                      type="checkbox"
                      name="agree-term"
                      id="agree-term"
                      className="agree-term"
                    />
                    <label for="agree-term" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      I agree all statements in{" "}
                      <a href="#" className="term-service">
                        Terms of service
                      </a>
                    </label>
                  </div> */}
                <div className="form-group form-button">
                  <input
                    type="submit"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={SignUpImage} alt="sign up image" />
              </figure>
              <Link to="/SignIn" className="signup-image-link">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
        {/* </section> */}
      </div>
    </>
  );
};

export default SignUp;
