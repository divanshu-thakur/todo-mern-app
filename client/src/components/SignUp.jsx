import SignUpImage from "../images/signup-image.jpg";
import { FaUser, FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="main">
        {/* <section className="signup"> */}
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label for="name">
                    {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <label for="email">
                    {/* <i className="zmdi zmdi-email"></i> */}
                    <MdEmail />
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label for="pass">
                    {/* <i className="zmdi zmdi-lock"></i> */}
                    <FaLock />
                  </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label for="re-pass">
                    {/* <i className="zmdi zmdi-lock-outline"></i> */}
                    <FaLock />
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Confirm Password"
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
                    name="signup"
                    id="signup"
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
