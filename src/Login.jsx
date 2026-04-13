import React from "react";
import "./Login.css";
import { Link } from "react-router-dom"; 
 
function App() {
  return (
    <div className="app">
      <div className="left-panel">
        <h1>
          Your ride.
          <br />
          Your safety.
          <br />
          Always watched.
        </h1>
      </div>
 
      <div className="right-panel">
        <div className="login-card">
          <h2>Login</h2>
 
          <form className="login-form">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
 
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
 
            <div className="options">
              <label className="remember">
                <input type="checkbox"/>
                Remember me
              </label>
              <a href="/">Forgot password?</a>
            </div>
 
            <button type="submit">Login</button>
 
            <p className="or-text">Or login with</p>
 
            <div className="social-login">
              <button type="button" className="social-btn facebook">
                <span className="icon">f</span> Facebook
              </button>
              <button type="button" className="social-btn google">
                <span className="icon">G</span> Google
              </button>
            </div>
 
            <p className="signup-text">
              Don’t have an account? <a href="/">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default App;