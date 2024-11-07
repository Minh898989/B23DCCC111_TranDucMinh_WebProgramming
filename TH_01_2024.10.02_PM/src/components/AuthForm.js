import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const AuthForm = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                
                const response = await axios.post('http://localhost:5000/users/login', {
                    username,
                    password,
                });
                localStorage.setItem('token', response.data.token);
                onLoginSuccess();  
            } else {
               
                await axios.post('http://localhost:5000/users/register', {
                    username,
                    password,
                });
                alert('Registration successful!');
                setIsLogin(true);  
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert('Authentication error occurred!');
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleAuth}>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={toggleAuthMode} className="toggle-button">
                    {isLogin ? 'Register here' : 'Login here'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
