import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      const msg = res.data.message;

      if (msg === "Login successful!") {
        toast.success(msg, { pauseOnHover: false });
        // Navigate to another page if needed
      } else {
        toast.error(msg, { pauseOnHover: false });
      }
    } catch (error) {
      toast.error(error.response.data.message, { pauseOnHover: false });
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/send-otp", {
        email,
      });
      const msg = res.data.message;
      toast.success(msg, { pauseOnHover: false });
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response.data.message, { pauseOnHover: false });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/verify-otp", {
        email,
        otp,
      });
      const msg = res.data.message;
      toast.success(msg, { pauseOnHover: false });
      setIsPasswordReset(true);
    } catch (error) {
      toast.error(error.response.data.message, { pauseOnHover: false });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { pauseOnHover: false });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/reset-password", {
        email,
        newPassword,
      });
      const msg = res.data.message;
      toast.success(msg, { pauseOnHover: false });

      // Directly navigate to the login page after successful reset
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, { pauseOnHover: false });
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{
          maxWidth: "400px",
          width: "100%",
          border: "1px solid #dcdcdc",
          opacity: 0.9,
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#34495e", fontWeight: "bold", fontSize: "26px" }}
        >
          {isForgotPassword ? "Reset Password" : "Log in"}
        </h2>

        <form
          onSubmit={
            isForgotPassword
              ? isOtpSent
                ? handleOtpSubmit
                : handleSendOtp
              : handleSubmit
          }
        >
          {isForgotPassword ? (
            <>
              {!isOtpSent ? (
                <>
                  <div className="mb-3 position-relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="position-absolute"
                      style={{ top: "12px", left: "12px", color: "#7f8c8d" }}
                    />
                    <input
                      type="email"
                      className="form-control ps-5"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                  >
                    Send OTP
                  </button>
                  <p className="text-center">
                    Remembered your password?
                    <Button
                      variant="link"
                      onClick={() => setIsForgotPassword(false)}
                      style={{ color: "green" }}
                    >
                      Log In
                    </Button>
                  </p>
                </>
              ) : (
                <>
                  {isPasswordReset ? (
                    <>
                      <div className="mt-3 position-relative">
                        <FontAwesomeIcon
                          className="position-absolute"
                          style={{
                            top: "12px",
                            left: "12px",
                            color: "#7f8c8d",
                          }}
                        />
                        <input
                          type="password"
                          className="form-control mb-3"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New Password"
                          required
                          style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
                        />
                        <input
                          type="password"
                          className="form-control mb-3"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          required
                          style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={handleResetPassword}
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        Reset Password
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-3 position-relative">
                        <input
                          type="text"
                          className="form-control"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          required
                          style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success w-100"
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <div className="mb-3 position-relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="position-absolute"
                  style={{ top: "12px", left: "12px", color: "#7f8c8d" }}
                />
                <input
                  type="email"
                  className="form-control ps-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
                />
              </div>

              <div className="mb-3 position-relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="position-absolute"
                  style={{ top: "12px", left: "12px", color: "#7f8c8d" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control ps-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
                />
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "10px", top: "12px" }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </Button>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Log In
              </button>

              <p className="text-center mt-2">
                <Button
                  variant="link"
                  onClick={() => setIsForgotPassword(true)}
                  style={{ color: "green" }}
                >
                  Forgot Password?
                </Button>
              </p>
            </>
          )}
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
