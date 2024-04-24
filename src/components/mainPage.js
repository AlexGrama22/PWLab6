import ImageList from "./components/ImageList";
import React, { useState } from 'react';
import searchImages from "./api";
import Box from '@mui/material/Box';



function MainPage() {
  const [images, setImages] = useState([]);

  const handleSubmit = async (term) => {
    const result = await searchImages(term);
    setImages(result);
  }

  return (
      <Box sx={{ mt: 9 }}>
        <ImageList images={images}/>
      </Box>
  );
}

export default MainPage;
