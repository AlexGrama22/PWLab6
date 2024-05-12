import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function LikedPage() {
  const [likedImages, setLikedImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  let cols = 6;
  if(md) cols = 4;
  else if(xs) cols = 1;
  else if(sm) cols = 2;

  const username = localStorage.getItem('username');
  const likedImagesKey = `${username}-likedImages`;

  useEffect(() => {
    const storedImages = localStorage.getItem(likedImagesKey);
    if (storedImages) {
      setLikedImages(JSON.parse(storedImages));
    }
  }, [likedImagesKey]);

  const handleDelete = (imageId) => {
    const updatedImages = likedImages.filter(item => item.image.id !== imageId);
    setLikedImages(updatedImages);
    localStorage.setItem(likedImagesKey, JSON.stringify(updatedImages));
    window.dispatchEvent(new Event('storageUpdate'));
  };

  return (
    <Box sx={{ mt: 9 }}>
      <ImageList sx={{ width: '100%', height: '100%' }} cols={cols} rowHeight={164}>
        {likedImages.map((item) => (
          <ImageListItem key={item.image.id} onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
            <img
              src={item.image.urls.regular}
              alt={item.image.alt_description}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {isHovered &&
            <Box sx={{position: 'absolute', bottom: '0', left:'0', display:"flex", justifyContent:"center", width:"100%"}}>
            <Grid container sx={{}} >
              <Grid item xs={6} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Button variant="contained" color="primary" href={item.image.links.download} target="_blank" sx={{ m: 1 }}>
                  <DownloadForOfflineIcon />
                </Button>
              </Grid>
              <Grid item xs={6} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>

                <Button variant="contained" color="secondary" onClick={() => handleDelete(item.image.id)} sx={{ m: 1 }}>
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
            </Box>
            }
          </ImageListItem>
        ))}
      </ImageList>
      {likedImages.length === 0 && 
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100vw' }}>
              <h2>No liked images to display.</h2>
          </div>
      }
    </Box>
  );
}

export default LikedPage;
