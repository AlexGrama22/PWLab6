import React from 'react';
import Box from '@mui/material/Box';
import ImageList from "./ImageList";
import SearchBar from './SearchBar';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

function MainPage({ images, searchTerm, onSearch,  onDelete}) {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    onSearch(searchTerm, value); 
  };

  return (
    <Box sx={{ mt: 9, height:"auto" }}>
      {images.length > 0 ? (
        <>
        <ImageList images={images} onDelete={onDelete}/>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", my:3}}>
        <Pagination count={5} page={page} onChange={handlePageChange} />  
        </Box>
      </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100vw' }}>
          {searchTerm ? <h2>No results for "{searchTerm}"</h2> : <h2>Search images</h2>}
          <SearchBar onSearch={onSearch} />
        </div>
      )}
    </Box>
  );
}

export default MainPage;
