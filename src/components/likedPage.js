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
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  let cols = 6;
  if(md) cols = 4;
  else if(xs) cols = 1;
  else if(sm) cols = 2;

  useEffect(() => {
    const storedImages = localStorage.getItem('likedImages');
    if (storedImages) {
      setLikedImages(JSON.parse(storedImages));
    }
  }, []);

  const handleDelete = (imageId) => {
    const updatedImages = likedImages.filter(item => item.image.id !== imageId);
    setLikedImages(updatedImages);
    localStorage.setItem('likedImages', JSON.stringify(updatedImages));
  };

  return (
    <Box sx={{ mt: 9 }}>
      <ImageList sx={{ width: '100%', height: '100%' }} cols={cols} rowHeight={164}>
        {likedImages.map((item) => (
          <ImageListItem key={item.image.id}>
            <img
              src={item.image.urls.regular}
              alt={item.image.alt_description}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Grid container spacing={2} width={'60%'} sx={{position: 'absolute', bottom: '0', right:'0'}}>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" href={item.image.links.download} target="_blank" sx={{ m: 1 }}>
                  <DownloadForOfflineIcon />
                </Button>
              </Grid>
              <Grid item xs={6}>
                {/* Change the button to call handleDelete when clicked */}
                <Button variant="contained" color="secondary" onClick={() => handleDelete(item.image.id)} sx={{ m: 1 }}>
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </ImageListItem>
        ))}
      </ImageList>
      {likedImages.length === 0 && <div>No liked images to display.</div>}
    </Box>
  );
}

export default LikedPage;
