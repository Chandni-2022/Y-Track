import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
        role,
      });
      toast.success(response.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");
    } catch (error) {
      console.error(error);
      toast.error("Error creating user");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <FontAwesomeIcon
              icon={faUser}
              className="position-absolute"
              style={{ top: "12px", left: "12px", color: "#7f8c8d" }}
            />
            <input
              type="text"
              className="form-control ps-5"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
            />
          </div>
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
              type="password"
              className="form-control ps-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
              type="password"
              className="form-control ps-5"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="role"
              className="form-label"
              style={{ color: "#34495e", fontWeight: "bold", fontSize: "16px" }}
            >
              Select Your Role
            </label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
