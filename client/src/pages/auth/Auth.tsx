import React from "react";
import Logo from "../../assets/images/QuesLogo1.png";
import Logo1 from "../../assets/images/Group 22.png";
const Auth = () => {
  return (
    <section className="auth-container">
      <div className="auth-left">
        <div className="auth-left-logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1>Your podcast will no longer be just a hobby.</h1>
        <p>Supercharge Your Distribution Using our AI assistant!</p>
      </div>
      <div className="auth-right">
        <div className="auth-right-logo">
          <img src={Logo1} alt="logo1" />
        </div>
        <h1>Welcome to</h1>
        <h2>Ques.AI</h2>
        <form action="">
          <div className="auth-input">
            <input type="text" placeholder="Email Address" />
          </div>
          <div className="auth-input">
            <input type="text" placeholder="Password" />
          </div>
          <div className="extra-form">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <span>Forgot Password?</span>
          </div>
          <button>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
