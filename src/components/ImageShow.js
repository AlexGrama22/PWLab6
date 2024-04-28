import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

function ImageShow({ image }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
    const isLiked = likedImages.some(img => img.id === image.id);
    setLiked(isLiked);
    
    const handleStorageUpdate = () => {
      const likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
      const isLiked = likedImages.some(img => img.image.id === image.id);
      setLiked(isLiked);
    };
  
    window.addEventListener('storageUpdate', handleStorageUpdate);
    handleStorageUpdate();
    return () => {
      window.removeEventListener('storageUpdate', handleStorageUpdate);
    };
  }, [image.id]);

const handleLike = () => {
  let likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
  // console.log('Before operation, likedImages:', likedImages); 

  if (!liked) {
    likedImages.push({ image: image }); 
  } else {
    likedImages = likedImages.filter(img => img.image.id !== image.id); 
  }

  localStorage.setItem('likedImages', JSON.stringify(likedImages));
  setLiked(!liked);
  // console.log('After operation, likedImages:', likedImages); 
}


  return (
    <div>
      <Box height={209} display="flex" justifyContent="center" alignItems="center" overflow="hidden">
        <Box component="img" src={image.urls.regular} alt={image.alt_description} sx={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <Grid container spacing={2} width={'60%'} sx={{position: 'absolute', bottom: '0', right:'0'}}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" href={image.links.download} target="_blank" sx={{ m: 1 }}><DownloadForOfflineIcon/></Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleLike} sx={{ m: 1 }}>
              {liked ? <FavoriteIcon color="secondary" /> : <FavoriteIcon />}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ImageShow;
