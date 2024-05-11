import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageShow from "./ImageShow";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ImageListComp({ images, isAdmin, onDelete }) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  let cols = 6
  if(md) cols = 4
  else if(xs) cols = 1
  else if(sm) cols = 2


  return (
    <ImageList sx={{ width: '100%', height: 'auto', overflow:"visible" }} cols={cols} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image.id} sx={{width:"auto"}}>
          <ImageShow image={image} isAdmin={isAdmin} onDelete={onDelete} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ImageListComp;
