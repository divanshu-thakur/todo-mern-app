import SignUpImage from "../images/signup-image.jpg";
import { FaUser, FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
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
