// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";

import "./info.css";

import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector } from "react-redux";

import MapContainer from "../GoogleMap.js"

function Closure_Info(props) {
  const { name, address, summary, numberOfLikes, like, likedStatus, latitude, longitude } = props;
  const res_website = "www.whatismywebsite.com";
  const res_website_link = "https://" + res_website;

  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Grid
        container
        direction="row"
      >
        <Grid item sm={6}>
          <Paper elevation={6} style={{ height: "50vh", width: "50vw" }}>
            <img
              src={props.restaurant_pic}
              style={{ height: "100%", width: "100%" }}
            />
          </Paper>
        </Grid>
        <Grid item sm ={6} >
          <MapContainer style={{width:"500"}} latitudeMap = {latitude} longitudeMap={longitude}/>
        </Grid>
        <Grid item sm={12} style={{}}>
          <Paper elevation={6} >
            <Card style={{ height: "50vh", width: "50vw", overflow: "auto" }}>
              <CardHeader title={name} subheader={address} />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {summary}
                </Typography>
              </CardContent>

              {/* <Grid container>
                <Grid item xs={6} >
                  <MapContainer latitudeMap = {latitude} longitudeMap={longitude}/>
                </Grid>
              </Grid> */}
              

              <CardActions disableSpacing>
                {auth.isAuthenticated && (
                  <IconButton onClick={like}>
                    <FavoriteIcon
                      style={{ color: likedStatus ? "red" : "gray" }}
                    />
                    <Typography
                      variant="h6"
                      style={{ justifyContent: "center" }}
                    >
                      {numberOfLikes}
                    </Typography>
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Closure_Info;
