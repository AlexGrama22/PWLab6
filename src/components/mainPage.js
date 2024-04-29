import ImageList from "./ImageList";
import React from 'react';
import Box from '@mui/material/Box';

function MainPage({images}) {
    return (
        <Box sx={{ mt: 9 }}>
            {images.length > 0 ? (
                <ImageList images={images}/>  
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100vw' }}>
              <h2>Search images</h2>
              
          </div>
            )}
        </Box>
    );
}

export default MainPage;
