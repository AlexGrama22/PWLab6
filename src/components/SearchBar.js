import React, { useState } from 'react';
import Box from '@mui/material/Box';

function SearchBar ({onSubmit}) {
    const [term, setTerm] = useState('');
    
    const handleFormSubmit = (event) => {
      event.preventDefault();
      onSubmit(term);

    }

    const handleChange = (event) => {
      setTerm(event.target.value);
      
    }

    return <div>
      <Box width={'100%'} display="flex" justifyContent="center" >
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Search" onChange={handleChange} value={term} />
      </form>
      </Box>
    </div>
  
  }
  
  export default SearchBar;