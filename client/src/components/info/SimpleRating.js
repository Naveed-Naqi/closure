import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function CustomizedRatings() {
  return (
    <div>
      <Box component="fieldset" mb={0} borderColor="transparent">
        <Typography component="legend">Food</Typography>
        <Rating
          name="customized-food"
          defaultValue={3}
          //precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
      <Box component="fieldset" mb={0} borderColor="transparent">
        <Typography component="legend">Location</Typography>
        <Rating
          name="customized-location"
          defaultValue={3}
          //precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
      <Box component="fieldset" mb={0} borderColor="transparent">
        <Typography component="legend">Service</Typography>
        <Rating 
          name="customized-service" 
          defaultValue={3}
          //precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        
        />
      </Box>

    </div>
  );
}
