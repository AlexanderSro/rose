import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login, register } from "../actions/userActions";
import "./loginscreen.css";

function LoginRegScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: loginLoading,
    error: loginError,
    userInfo: loginUserInfo,
  } = userLogin;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields for login");
      return;
    }
    dispatch(login(email, password));
  };

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: registerLoading,
    error: registerError,
    userInfo: registerUserInfo,
  } = userRegister;

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      registerName === "" ||
      registerEmail === "" ||
      registerPassword === ""
    ) {
      setErrorMessage("Please fill in all fields for registration");
      return;
    }
    dispatch(register(registerName, registerEmail, registerPassword));
  };

  useEffect(() => {
    if (loginUserInfo || registerUserInfo) {
      navigate("/"); // Redirect to the homepage
    }
  }, [loginUserInfo, registerUserInfo, navigate]);

  const toggleFlip = () => {
    const cardWrap = document.querySelector(".card-3d-wrap");
    cardWrap.classList.toggle("flipped");
  };

  return (
    <div className="section-login">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section-login pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span style={{ color: "whitesmoke" }}>Log In </span>
                <span style={{ color: "whitesmoke" }}>Sign Up</span>
              </h6>
              <input type="checkbox" id="reg-log" className="checkbox-login" />
              <label htmlFor="reg-log" onClick={toggleFlip}></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section-login text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        {(loginLoading || registerLoading) && <Loader />}
                        {(loginError || registerError) && (
                          <Message variant="danger">
                            {loginError || registerError}
                          </Message>
                        )}
                        {errorMessage && (
                          <Message variant="danger">{errorMessage}</Message>
                        )}
                        <form onSubmit={handleLoginSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn-login mt-4">
                            Login
                          </button>
                        </form>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section-login text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        {registerLoading && <Loader />}
                        {(loginError || registerError) && (
                          <Message variant="danger">
                            {loginError || registerError}
                          </Message>
                        )}
                        {errorMessage && (
                          <Message variant="danger">{errorMessage}</Message>
                        )}
                        <form onSubmit={handleRegisterSubmit}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Your Full Name"
                              value={registerName}
                              onChange={(e) => setRegisterName(e.target.value)}
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              value={registerEmail}
                              onChange={(e) => setRegisterEmail(e.target.value)}
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              value={registerPassword}
                              onChange={(e) =>
                                setRegisterPassword(e.target.value)
                              }
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn-login mt-4">
                            Register
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegScreen;
