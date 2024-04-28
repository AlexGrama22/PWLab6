import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function LikedPage() {
  const [likedImages, setLikedImages] = useState([]);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  let cols = 6
  if(md) cols = 4
  else if(xs) cols = 1
  else if(sm) cols = 2

  useEffect(() => {
    const storedImages = localStorage.getItem('likedImages');
    // console.log('storedImages:', storedImages);
    if (storedImages) {
      setLikedImages(JSON.parse(storedImages));
    }
  }, []);

  // If there are no liked images, return a message instead
  if (!likedImages.length) {
    return <div>No liked images to display.</div>;
  }

  return (
    <Box sx={{ mt: 9 }}>
      <ImageList sx={{ width: '100%', height: '100%' }} cols={cols} rowHeight={164}>
        {likedImages.map((item) => (
          <ImageListItem key={item.image.id}>
            <img
              src={item.image.urls.regular} // Access the nested image object
              alt={item.image.alt_description}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}


export default LikedPage;
