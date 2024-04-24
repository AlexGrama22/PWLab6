import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageShow from "./ImageShow";

function ImageListComp({ images }) {
  return (
    <ImageList sx={{ width: '100%', height: '100%' }} cols={6}>
      {images.map((image) => (
        <ImageListItem key={image.id}>
          <ImageShow image={image} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ImageListComp;
