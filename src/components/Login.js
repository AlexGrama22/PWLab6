import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            console.log("Login response:", response.data);
            const { token, username: responseUsername } = response.data;
            console.log('Received from login:', response.data);  // Check what's coming back from the server
            localStorage.setItem('token', token);
            localStorage.setItem('username', responseUsername);
            console.log('Saved username:', localStorage.getItem('username')); // Immediately check if it's stored correctly            
            if (token) {
                console.log('Setting token and redirecting...');
                setToken(token);
                localStorage.setItem('token', token);
                navigate('/'); 
            } else {
                console.error('No token received');
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error);
        }
    };

    return (
        <Box sx={{mt:10}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </Box>
    );
};

export default Login;
