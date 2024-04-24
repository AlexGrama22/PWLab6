import ImageList from "./components/ImageList";
import React, { useState } from 'react';
import searchImages from "./api";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Card, CardContent, CardMedia, Switch, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LikedPage from './components/likedPage';


function App() {
  const [images, setImages] = useState([]);
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  const handleSubmit = async (term) => {
    const result = await searchImages(term);
    setImages(result);
  }

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    },
  });

  return (
    <ThemeProvider theme={toggleDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
      <Routes>
        <Route path="/liked" element={<LikedPage />} />
      </Routes>
        {/* <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} /> */}
      <Header onSubmit={handleSubmit} handleToggleTheme={toggleDarkTheme} toggleTheme={toggleDarkMode} />
      <Box sx={{ mt: 9 }}>
        <ImageList images={images}/>
      </Box>
      </Router> 
    </ThemeProvider>
  );
}

export default App;
