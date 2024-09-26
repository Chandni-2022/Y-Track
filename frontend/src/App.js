import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user'); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                username,
                email,
                password,
                role 
            });
            alert(response.data.message);
            
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRole('user');
        } catch (error) {
            console.error(error);
            alert('Error creating user');
        }
    };

    return (
        <div style={{
            minHeight: '100vh', 
            backgroundImage: 'url("https://your-image-url-here.jpg")', // Replace with your background image URL
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative'
        }}>
            <div 
                style={{ 
                    maxWidth: '500px', 
                    margin: 'auto', 
                    borderRadius: '15px', 
                    background: 'rgba(255, 255, 255, 0.9)', 
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '20px',
                    border: '1px solid #ff5722'
                }}
            >
                <h2 className="text-center mb-4" style={{ color: '#00695c', fontWeight: 'bold' }}>Signup Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 position-relative">
                        <FontAwesomeIcon icon={faUser} style={{ position: 'absolute', top: '12px', left: '12px', color: '#ff5722' }} />
                        <input 
                            type="text" 
                            style={{ 
                                width: '100%', 
                                padding: '12px 40px', 
                                borderRadius: '10px', 
                                border: '1px solid #ff5722', 
                                transition: 'border-color 0.3s', 
                                boxShadow: '0 2px 5px rgba(255, 87, 34, 0.2)' 
                            }}
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Username"
                            required 
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <FontAwesomeIcon icon={faEnvelope} style={{ position: 'absolute', top: '12px', left: '12px', color: '#ff5722' }} />
                        <input 
                            type="email" 
                            style={{ 
                                width: '100%', 
                                padding: '12px 40px', 
                                borderRadius: '10px', 
                                border: '1px solid #ff5722', 
                                transition: 'border-color 0.3s', 
                                boxShadow: '0 2px 5px rgba(255, 87, 34, 0.2)' 
                            }}
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email"
                            required 
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <FontAwesomeIcon icon={faLock} style={{ position: 'absolute', top: '12px', left: '12px', color: '#ff5722' }} />
                        <input 
                            type="password" 
                            style={{ 
                                width: '100%', 
                                padding: '12px 40px', 
                                borderRadius: '10px', 
                                border: '1px solid #ff5722', 
                                transition: 'border-color 0.3s', 
                                boxShadow: '0 2px 5px rgba(255, 87, 34, 0.2)' 
                            }}
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password"
                            required 
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <FontAwesomeIcon icon={faLock} style={{ position: 'absolute', top: '12px', left: '12px', color: '#ff5722' }} />
                        <input 
                            type="password" 
                            style={{ 
                                width: '100%', 
                                padding: '12px 40px', 
                                borderRadius: '10px', 
                                border: '1px solid #ff5722', 
                                transition: 'border-color 0.3s', 
                                boxShadow: '0 2px 5px rgba(255, 87, 34, 0.2)' 
                            }}
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Confirm Password"
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" style={{ color: '#00695c', fontWeight: 'bold' }}>Select Your Role</label>
                        <select 
                            id="role" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            style={{ 
                                width: '100%', 
                                borderRadius: '10px', 
                                border: '1px solid #ff5722', 
                                padding: '10px'
                            }}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            borderRadius: '10px', 
                            backgroundColor: '#ff5722', 
                            color: '#fff', 
                            border: 'none', 
                            transition: 'background-color 0.3s',
                            padding: '10px',
                            fontWeight: 'bold'
                        }} 
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e64a19'} 
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ff5722'}
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
