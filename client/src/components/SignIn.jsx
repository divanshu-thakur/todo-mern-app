import SignInImage from "../images/signin-image.jpg";
import { FaUser, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import AuthenticationApi from "../services/authentication";
import { RESPONSE_STATUS } from "../constants/status";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
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
            duration: 4000,
          });
          navigate("/SignIn");
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
      <div className="main">
        {/* <section className="sign-in"> */}
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={SignInImage} alt="sign in image" />
              </figure>
              {/* <a href="#" className="signup-image-link">
                  Create an account
                </a> */}
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label for="your_name">
                    {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Username/Email"
                  />
                </div>
                <div className="form-group">
                  <label for="your_pass">
                    {/* <i className="zmdi zmdi-lock"></i> */}
                    <FaLock />
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                  />
                </div>
                {/* <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                  />
                  <label for="remember-me" className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    Remember me
                  </label>
                </div> */}
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                  />
                </div>
              </form>
              <div className="social-login">
                <Link to="/SignUp" className="signup-image-link">
                  Create a new account!
                </Link>
                {/* <span className="social-label">Or login with</span>
                  <ul className="socials">
                    <li>
                      <a href="#">
                        <i className="display-flex-center zmdi zmdi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="display-flex-center zmdi zmdi-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="display-flex-center zmdi zmdi-google"></i>
                      </a>
                    </li>
                  </ul> */}
              </div>
            </div>
          </div>
        </div>
        {/* </section> */}
      </div>
    </>
  );
};

export default SignIn;
