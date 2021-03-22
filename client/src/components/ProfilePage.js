import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Grid } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
      minWidth: 10,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 500,
    },
  });

    


  const ProfilePage = () => {
    const classes = useStyles();
    const classess = useStyless();
    const bull = <span className={classes.bullet}>•</span>;
    return(

      <Grid container spacing = {100}>
        <Grid item xs= {2}>
        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          fdsfsdf
        </Typography>
        <Typography variant="h5" component="h2">
          NAME
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          EMAIL
        </Typography>
        <Typography variant="body2" component="p">
          sdfsdfs.
          <br />
          {'"fsdfsdfs"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">sign out</Button>
      </CardActions>
    </Card>
    </Grid>
    </Grid>
  
  
  
  
  
  
  );
  
};

export default ProfilePage;