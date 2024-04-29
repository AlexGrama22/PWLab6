import React from 'react';
import Box from '@mui/material/Box';
import ImageList from "./ImageList";
import SearchBar from './SearchBar';

function MainPage({ images, searchTerm }) {
  return (
    <Box sx={{ mt: 9 }}>
      {images.length > 0 ? (
        <ImageList images={images}/>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100vw' }}>
          {searchTerm ? <h2>No results for "{searchTerm}"</h2> : <h2>Search images</h2>}
          <SearchBar />
        </div>
      )}
    </Box>
  );
}

export default MainPage;
