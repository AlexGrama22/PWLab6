import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import MainPage from './components/mainPage';
import LikedPage from './components/likedPage';
import UserData from './components/UserData';
import Login from './components/Login';
import { searchImages } from './api';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [images, setImages] = useState([]);
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setImages([]);
    } else {
      const result = await searchImages(term);
      setImages(result);
    }
  }
  

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'dark' : 'light',
      primary: { main: '#90caf9' },
      secondary: { main: '#f48fb1' },
    },
  });

  const requireAuth = (element) => {
    return token ? element : <Navigate to="/login" replace />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header
          onSubmit={handleSubmit}
          handleToggleTheme={toggleDarkTheme}
          toggleTheme={toggleDarkMode}
          setImages={setImages} // Ensures Header can clear images
        />
         <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={requireAuth(<MainPage images={images} searchTerm={searchTerm} onSearch={handleSubmit} />)} />
          <Route path="/liked" element={requireAuth(<LikedPage />)} />
          <Route path="/user-data" element={requireAuth(<UserData />)} />
        </Routes>
      </Router> 
    </ThemeProvider>
  );
}

export default App;
