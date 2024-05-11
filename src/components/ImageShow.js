import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DeleteIcon from '@mui/icons-material/Delete';

function ImageShow({ image, onDelete  }) {
  const [liked, setLiked] = useState(false);
  const isAdmin = localStorage.getItem('role') === 'ADMIN';
  const username = localStorage.getItem('username');
  const likedImagesKey = `${username}-likedImages`;
  const [isHovered, setIsHovered] = useState(false);

  const getLikedImagesKey = () => {
    return `${username}-likedImages`;
  }

  useEffect(() => {
    const likedImages = JSON.parse(localStorage.getItem(likedImagesKey)) || [];
    const isLiked = likedImages.some(img => img.image.id === image.id);
    setLiked(isLiked);
    
    const handleStorageUpdate = () => {
      const updatedLikedImages = JSON.parse(localStorage.getItem(likedImagesKey)) || [];
      const updatedIsLiked = updatedLikedImages.some(img => img.image.id === image.id);
      setLiked(updatedIsLiked);
    }
  
    window.addEventListener('storageUpdate', handleStorageUpdate);
    handleStorageUpdate();
    return () => {
      window.removeEventListener('storageUpdate', handleStorageUpdate);
    };
  }, [image.id, username]);  

const handleLike = () => {
  const likedImagesKey = getLikedImagesKey();
  let likedImages = JSON.parse(localStorage.getItem(likedImagesKey)) || [];
  // console.log('Before operation, likedImages:', likedImages); 

  if (!liked) {
    likedImages.push({ image: image }); 
  } else {
    likedImages = likedImages.filter(img => img.image.id !== image.id); 
  }

  localStorage.setItem(likedImagesKey, JSON.stringify(likedImages));
  setLiked(!liked);
  // console.log('After operation, likedImages:', likedImages); 
}


  return (
    <Box sx={{width:"auto"}}>
      <Box height={200} display="flex" justifyContent="center" alignItems="center" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
        <Box component="img" src={image.urls.regular} alt={image.alt_description} sx={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        {isHovered && 
        <Box sx={{position: 'absolute', bottom: '0', left:'0', display:"flex", justifyContent:"center", width:"100%"}}>
        <Grid container sx={{}} >
          <Grid item xs={4} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Button variant="contained" color="primary" href={image.links.download} target="_blank" sx={{  }}><DownloadForOfflineIcon/></Button>
          </Grid>
          <Grid item xs={4} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Button variant="contained" color="primary" onClick={handleLike} sx={{ }}>
              {liked ? <FavoriteIcon color="secondary" /> : <FavoriteIcon />}
            </Button>
          </Grid>
          {isAdmin && (
            <Grid item xs={4} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Button variant="contained" color="error" onClick={() => onDelete(image.id)} sx={{ mt: 1 }}>
                <DeleteIcon />
              </Button>
            </Grid>
          )}
        </Grid>
        </Box>
        }
      </Box>
    </Box>
  );
}

export default ImageShow;
