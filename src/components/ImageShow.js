import { Box } from '@mui/system';


function ImageShow (image) {
  console.log('img prev', image);
    return <div>
      {/* <img src={image.urls.regular} alt={image.alt_description} /> */}
      <Box height={209} display="flex" justifyContent="center" alignItems="center" overflow={'hidden'} >
        {/* <img width={'100%'} 
        src={image.image.urls.regular} alt={image.image.alt_description} /> */}
                      <Box component="img" src={image.image.urls.regular} alt={image.image.alt_description} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      </Box>
    </div>
  
  }
  
  export default ImageShow;