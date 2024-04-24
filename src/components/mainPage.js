import ImageList from "./ImageList";
import React, { useState } from 'react';
import searchImages from "../api";
import Box from '@mui/material/Box';



function MainPage({images}) {
    
  return (
      <Box sx={{ mt: 9 }}>
        <ImageList images={images}/>
      </Box>
  );
}

export default MainPage;
