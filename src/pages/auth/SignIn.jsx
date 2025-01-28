import React from 'react';
import './SignIn.css';
import LoginImage from '../../assets/img/login.png';

const SignInPage = () => {
  return (
    <div className="d-lg-flex half">
      {/* Background image section */}
      <div
        className="bg order-1 order-md-2"
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content section */}
      <div className="contents order-2 order-md-1">
        {/* Back Icon */}
        <div className="back-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="back-icon"
            onClick={() => window.history.back()} 
          >
            <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
          </svg>
        </div>

        {/* Login Form Container */}
        <div className="login-container position-relative">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>
              <strong>Login to your Account</strong>
              </h3>
              <p className="mb-4">Sign in to explore your personalized dashboard.</p>
              <form action="#" method="post">
                {/* Username Field */}
                <div className="form-group first">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your username"
                    id="username"
                  />
                </div>

                {/* Password Field */}
                <div className="form-group last mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    id="password"
                  />
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <label className="control control--checkbox mb-0">
                    <input type="checkbox" />
                    <span className="caption">Remember me</span>
                    <div className="control__indicator"></div>
                  </label>
                  <a href="#" className="forgot-pass">
                    Forgot Password
                  </a>
                </div>

                {/* Submit Button */}
                <input
                  type="submit"
                  value="Log In"
                  className="btn btn-block btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
