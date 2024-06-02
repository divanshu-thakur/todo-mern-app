import SignInImage from "../images/signin-image.jpg";
import { FaUser, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import AuthenticationApi from "../services/authentication";
import { RESPONSE_STATUS } from "../constants/status";
import { storage } from "../config/storage";

const initialValues = {
  userNameOrEmail: "",
  password: "",
};

const validationSchema = yup.object().shape({
  userNameOrEmail: yup.string().required("Username or Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        let data = await AuthenticationApi.requestUserSignIn({
          userNameOrEmail: values.userNameOrEmail,
          password: values.password,
        });

        if (data.status === RESPONSE_STATUS.SUCCESS) {
          storage.set.authToken(data.authToken);
          toast.success("Signed In successfully", {
            id: "authSuccess",
          });
          setTimeout(() => window.location.reload(), 2000);
        } else if (data.status === RESPONSE_STATUS.ERROR) {
          toast.error(data.message, {
            id: "authError",
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
              <h2 className="form-title">Sign In</h2>
              <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    name="userNameOrEmail"
                    placeholder="Username/Email"
                    value={values.userNameOrEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.userNameOrEmail && touched.userNameOrEmail && (
                    <span className="error">{errors.userNameOrEmail}</span>
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
                    className="form-submit"
                    value="Sign In"
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
