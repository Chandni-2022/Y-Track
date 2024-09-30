import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/login", { email, password });
      const msg = res.data.message;

      if (msg === "Login successful!") {
        toast.success(msg, { pauseOnHover: false });
        navigate('/dashboard');
        // Navigate to another page if needed
      } else {
        toast.error(msg, { pauseOnHover: false });
      }
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
          Log in
        </h2>

        <form onSubmit={ handleSubmit } >

              {/* // email */}
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

              {/* //password */}
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
                  <option value="Team-Member">Team Member</option>
                  <option value="Team-lead">Team Lead</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* login button */}
              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Log In
              </button>
              
              {/* Bottom section */}
              <div>
                <p className="text-center mt-2">
                  <Link to='/forgot-password' style={{color:'green'}}> Forgot Password? </Link> 
                </p>

                <p className="text-center">Don't have an account? 
                  <Link to='/signup' style={{color:'green'}}> Register </Link> 
                  here
                </p>

              </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
