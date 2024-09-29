// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { toast } from 'react-toastify';

// const PasswordReset = () => {
//     const [step, setStep] = useState(1);
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isOtpVerified, setIsOtpVerified] = useState(false);
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');

//     const history = useHistory();

//     // Function to handle sending OTP
//     const handleSendOtp = async () => {
//         try {
//             const response = await axios.post('http://localhost:5001/api/send-otp', { email });
//             setMessage(response.data.message);
//             setError('');
//             setStep(2); // Move to OTP verification step
//         } catch (error) {
//             setError(error.response?.data?.message || 'Error sending OTP');
//             setMessage('');
//         }
//     };

//     // Function to handle OTP verification
//     const handleVerifyOtp = async () => {
//         try {
//             const response = await axios.post('http://localhost:5001/api/verify-otp', { email, otp });
//             toast.success(response.data.message, { pauseOnHover: false });
//             setIsOtpVerified(true);
//             setError('');
//         } catch (error) {
//             setError(error.response?.data?.message || 'Error verifying OTP');
//             setMessage('');
//         }
//     };

//     // Function to handle password reset
//     const handleResetPassword = async () => {
//         // Check if passwords match
//         if (newPassword !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:5001/api/reset-password', { email, newPassword });
            
//             // Check the response and set success message
//             if (response.data.success) {  // Assuming the API response contains a success field
//                 toast.success(response.data.message, { pauseOnHover: false });
//                 setError('');
//                 setNewPassword('');
//                 setConfirmPassword('');
//                 console.log("Password reset successful. Redirecting to login..."); // Debug line
//                 history.push('/login'); // Redirect to login page after successful reset
//             } else {
//                 setError("Failed to reset password. Please try again."); // Handle unexpected response
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || 'Error resetting password');
//             setMessage('');
//         }
//     };

//     return (
//         <div>
//             {/* Step 1: Enter Email and Send OTP */}
//             {step === 1 && (
//                 <div>
//                     <input
//                         type="email"
//                         className="form-control mb-3"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <Button variant="success" onClick={handleSendOtp} className="w-100">Send OTP</Button>
//                 </div>
//             )}

//             {/* Step 2: Verify OTP */}
//             {step === 2 && !isOtpVerified && (
//                 <div>
//                     <input
//                         type="text"
//                         className="form-control mb-3"
//                         placeholder="Enter the OTP sent to your email"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                     />
//                     <Button variant="success" onClick={handleVerifyOtp} className="w-100">Verify OTP</Button>
//                 </div>
//             )}

//             {/* Step 2: Reset Password */}
//             {step === 2 && isOtpVerified && (
//                 <div>
//                     <input
//                         type="password"
//                         className="form-control mb-3"
//                         placeholder="Enter new password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         className="form-control mb-3"
//                         placeholder="Confirm new password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />
//                     <Button variant="success" onClick={handleResetPassword} className="w-100">Reset Password</Button>
//                 </div>
//             )}

//             {/* Error and Success Messages */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {message && <p style={{ color: 'green' }}>{message}</p>}
//         </div>
//     );
// };

// export default PasswordReset;
