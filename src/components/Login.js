import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContext';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            const { token, username: responseUsername, role } = response.data;
            if (token) {
                login(token, responseUsername, role); // Update the context with the new token and user info
                navigate('/'); // Redirect to the home page
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
