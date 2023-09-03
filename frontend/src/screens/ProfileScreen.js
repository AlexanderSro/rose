import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./profilescreen.css";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const toggleFlip = () => {
    const cardWrap = document.querySelector(".card-3d-wrap");
    cardWrap.classList.toggle("flipped");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <div className="profile-section-login">
      <div className="container">
        <div className="row profile-full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="profile-section-login pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span style={{ color: "whitesmoke" }}>User Details </span>
                <span style={{ color: "whitesmoke" }}>Order History</span>
              </h6>
              <input type="checkbox" id="reg-log" className="checkbox-login" />
              <label htmlFor="reg-log" onClick={toggleFlip}></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  {/* Card Front for User Details */}
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="profile-section-login text-center">
                        <h4 className="pb-3 mt-5">Update User Details</h4>
                        {message && (
                          <Message variant="danger">{message}</Message>
                        )}
                        {loading ? (
                          <Loader />
                        ) : error ? (
                          <Message variant="danger">{error}</Message>
                        ) : (
                          <form onSubmit={submitHandler}>
                            {/* Your form for updating user details */}
                            <div className="profile-form-group mt-2">
                              <i className="profile-input-icon uil uil-user"></i>
                              <input
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="profile-form-style"
                              />
                            </div>
                            <div className="profile-form-group mt-2">
                              <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="profile-form-style"
                              />
                              <i className="profile-input-icon uil uil-at"></i>
                            </div>
                            <div className="profile-form-group mt-2">
                              <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) =>
                                  setCurrentPassword(e.target.value)
                                }
                                className="profile-form-style"
                                autoComplete="off"
                              />
                              <i className="profile-input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="profile-form-group mt-2">
                              <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="profile-form-style"
                                autoComplete="off"
                              />
                              <i className="profile-input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="profile-form-group mt-2">
                              <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                className="profile-form-style"
                                autoComplete="off"
                              />
                              <i className="profile-input-icon uil uil-lock-alt"></i>
                            </div>

                            <button
                              type="submit"
                              className="profile-btn-login mt-2 mb-4"
                            >
                              Update
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Card Back for Order History */}
                  <div className="card-back">
                    <div className="center-wrap">
                      <h4 className="mb-4 pb-3">Order History</h4>
                      {/* Your code for displaying order history */}
                      {/* ... */}
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

export default ProfileScreen;
