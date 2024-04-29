// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./components/Header";
import MainPage from './components/mainPage';
import LikedPage from './components/likedPage';

import searchImages from "./api"; // Make sure this path is correct

function App() {
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
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/" element={<MainPage images={images} searchTerm={searchTerm} onSearch={handleSubmit} />} />        </Routes>
      </Router> 
    </ThemeProvider>
  );
}

export default App;
