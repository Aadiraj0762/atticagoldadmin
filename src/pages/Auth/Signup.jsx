import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="page">
      <div className="my-auto page page-h">
        <div className="main-signin-wrapper">
          <div className="main-card-signin d-md-flex wd-100p">
            <div className="wd-md-50p login d-none d-md-block page-signin-style p-5 text-white">
              <div className="my-auto authentication-pages">
                <div>
                  <img
                    src="/assets/img/brand/logo-white.png"
                    className=" m-0 mb-4"
                    alt="logo"
                  />
                  <h5 className="mb-4">
                    Responsive Modern Dashboard &amp; Admin Template
                  </h5>
                  <p className="mb-5">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting
                  </p>
                  <a href="index.html" className="btn btn-success">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="sign-up-body wd-md-50p">
              <div className="main-signin-header">
                <h2>Welcome back!</h2>
                <h4>Please Register with Azira</h4>
                <form action="/">
                  <div className="form-group">
                    <label>Firstname &amp; Lastname</label>{" "}
                    <input
                      className="form-control"
                      placeholder="Enter your firstname and lastname"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>{" "}
                    <input
                      className="form-control"
                      placeholder="Enter your email"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>{" "}
                    <input
                      className="form-control"
                      placeholder="Enter your password"
                      type="password"
                    />
                  </div>
                  <button className="btn btn-main-primary btn-block">
                    Create Account
                  </button>
                </form>
              </div>
              <div className="main-signup-footer mg-t-10">
                <p>
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
