import { Box } from '@mui/system';
import { Button } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createSvgIcon } from '@mui/material/utils';
import Grid from '@mui/material/Grid';


function ImageShow (image) {
    return <div>
      <Box height={209} display="flex" justifyContent="center" alignItems="center" overflow={'hidden'} >        
          <Box component="img" src={image.image.urls.regular} alt={image.image.alt_description} sx={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          <Grid container spacing={2} width={'60%'} sx={{position: 'absolute', bottom: '0', right:'0'}}>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" href={image.image.links.download} target="_blank" sx={{ m: 1}}><DownloadForOfflineIcon/></Button>    
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" href={image.image.links.download} target="_blank" sx={{ m: 1}}><FavoriteIcon/></Button>    
            </Grid>
   
          </Grid>
          


      </Box>
    </div>
  
  }
  
  export default ImageShow;