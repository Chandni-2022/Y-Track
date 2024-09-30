import React, { useState } from 'react';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import this to apply the styles
import axios from 'axios';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/send-otp", { email });
            const msg = res.data.message;
            
            if (msg === "OTP sent successfully!") {
                toast.success(msg, { pauseOnHover: false });
                setIsOtpSent(true);
            } else {
                toast.error(msg, { pauseOnHover: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred", { pauseOnHover: false });
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/verify-otp", { email, otp });
            const msg = res.data.message;

            if (msg === 'OTP verified successfully!') {
                toast.success(msg, { pauseOnHover: false });
                setIsOtpVerified(true);
            } else {
                toast.error(msg, { pauseOnHover: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred", { pauseOnHover: false });
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!", { pauseOnHover: false });
            return;
        }

        try {
            const res = await axios.post("http://localhost:5001/api/reset-password", { email, newPassword });
            const msg = res.data.message;

            if (msg === 'Password changed successfully!') {
                toast.success(msg, { pauseOnHover: false });
                navigate("/login");
            } else {
                toast.error(msg, { pauseOnHover: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred", { pauseOnHover: false });
        }
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center" 
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="bg-white p-4 rounded shadow" 
            style={{ maxWidth: "400px", width: "100%", border: "1px solid #dcdcdc", opacity: 0.9 }}>
                {/* OTP Form */}
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
                    <button type="submit" className="btn btn-success w-100 mb-3" style={{ fontWeight: "bold", fontSize: "16px" }} onClick={handleSendOtp}>Send OTP</button>
                </>
                {isOtpSent && (
                    <>
                        <div className="mb-3 position-relative">
                            <input type="text" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required style={{ borderColor: "#7f8c8d", fontSize: "16px" }} />
                        </div>
                        <button type="submit" className="btn btn-success w-100" style={{ fontWeight: "bold", fontSize: "16px" }} onClick={handleVerifyOtp}>Verify OTP</button>
                    </>
                )}

                {isOtpVerified && (
                    <>
                        <div className="mt-3 position-relative">
                            <input type="password" className="form-control mb-3" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required style={{ borderColor: "#7f8c8d", fontSize: "16px" }} />
                            <input type="password" className="form-control mb-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required style={{ borderColor: "#7f8c8d", fontSize: "16px" }} />
                        </div>
                        <button type="button" className="btn btn-success w-100" onClick={handleResetPassword} style={{ fontWeight: "bold", fontSize: "16px" }}>Reset Password</button>
                    </>
                )}

                {/* Including a ToastContainer */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgotPassword;