import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!",{pauseOnHover:false});
      return;
    }
    try {
      const res = await axios.post("http://localhost:5001/api/signup", { username, email, password, role });
      const msg = res.data.message;
      if(msg === "User created successfully!") toast.success(msg, {pauseOnHover:false});
      else toast.error(msg, {pauseOnHover:false});
      setDefault();
    } catch (error) {
      console.log(error);
      toast.error("Error creating user");
    }
    function setDefault() {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");
    }
    setLoading(false);
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
        {/* Heading - Create an account */}
        <h2
          className="text-center mb-4"
          style={{ color: "#34495e", fontWeight: "bold", fontSize: "26px" }}
        >
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* UserName */}
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

          {/* Email */}
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

          {/* Password */}
          <div className="mb-3 position-relative">
            <FontAwesomeIcon
              icon={faLock}
              className="position-absolute"
              style={{ top: "12px", left: "12px", color: "#7f8c8d" }}
            />
            <input
              type={showPassword? "text":"password"}
              className="form-control ps-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
            />
            <Button variant="link" 
            onClick={ () => setShowPassword(!showPassword) }
            style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'grey'
            }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </div>

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <FontAwesomeIcon
              icon={faLock}
              className="position-absolute"
              style={{ top: "12px", left: "12px", color: "#7f8c8d" }}
            />
            <input
              type={showConfirmPassword? "text":"password"}
              className="form-control ps-5"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              style={{ borderColor: "#7f8c8d", fontSize: "16px" }}
            />
            <Button variant="link" 
            onClick={ () => setShowConfirmPassword(!showConfirmPassword) }
            style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'grey'
            }}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </Button>
          </div>

          {/* Role Select */}
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
          
          {/* Register Button */}
          <button
            type={loading? "Loading...":"submit"}
            className="btn btn-success w-100"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Create Account
          </button>
          
            <p className="text-center">Already have an account? 
             <Link to='/login' style={{color:'green'}}> Login </Link> 
            here
          </p>

        </form>
      </div>
      <ToastContainer position="bottom-center"/>
    </div>
  );
};

export default Signup;
