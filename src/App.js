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
import { AuthProvider, useAuth } from './context/AuthContext';


function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [images, setImages] = useState([]);
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (term, page = 1) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setImages([]);
    } else {
      const result = await searchImages(term, page); 
      setImages(result);
    }
  }

  const handleDelete = (imageId) => {
    const updatedImages = images.filter(image => image.id !== imageId);
    setImages(updatedImages);
  }
  

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  function RequireAuth({ children }) {
    const { auth } = useAuth();
    return auth.token ? children : <Navigate to="/login" replace />;
}

  const theme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'dark' : 'light',
      primary: { main: '#90caf9' },
      secondary: { main: '#f48fb1' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <AuthProvider>
        <Header
          onSubmit={handleSubmit}
          handleToggleTheme={toggleDarkTheme}
          toggleTheme={toggleDarkMode}
          setImages={setImages} // Ensures Header can clear images
        />
         <Routes>
         <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><MainPage images={images} searchTerm={searchTerm} onSearch={handleSubmit} onDelete={handleDelete} /></RequireAuth>} />
            <Route path="/liked" element={<RequireAuth><LikedPage /></RequireAuth>} />
            <Route path="/user-data" element={<RequireAuth><UserData /></RequireAuth>} />
        </Routes>
        </AuthProvider>
      </Router> 
    </ThemeProvider>
  );
}

export default App;
