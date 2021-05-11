// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
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

import MapContainer from "../GoogleMap.js";

function Closure_Info(props) {
  const {
    name,
    address,
    summary,
    numberOfLikes,
    like,
    likedStatus,
    latitude,
    longitude,
  } = props;
  const res_website = "www.whatismywebsite.com";
  const res_website_link = "https://" + res_website;

  const auth = useSelector((state) => state.auth);

  const [isShown, setIsShown] = useState(false);
  const [opacity, changeOpacity] = useState(false);

  const buttonStyles = {
    padding: 0,
    border: "none",
    background: "none",
    width: "100%",
  };
  return (
    <div>
      <Grid container direction="row">
        <Grid item sm={6}>
          {isShown ? (
            <Paper elevation={6} style={{ height: "46vh", width: "48vw" }}>
              <Card style={{ height: "100%", width: "100%", overflow: "auto" }}>
                <CardHeader title={name} subheader={address} />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {summary}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {auth.isAuthenticated && (
                    <IconButton onClick={like} style={{ paddingBottom: "0px" }}>
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
                <div style={{ paddingBottom: "10px" }}>
                  <button
                    style={buttonStyles}
                    className="example"
                    onClick={() => setIsShown(!isShown)}
                    onMouseOver={() => changeOpacity(true)}
                    onMouseLeave={() => changeOpacity(false)}
                  >
                    Click Here To Flip Over
                  </button>
                </div>
              </Card>
            </Paper>
          ) : (
            <Paper elevation={6} style={{ height: "46vh", width: "48vw" }}>
              <button
                style={buttonStyles}
                className="example"
                onClick={() => setIsShown(!isShown)}
                onMouseOver={() => changeOpacity(true)}
                onMouseLeave={() => changeOpacity(false)}
              >
                <img
                  src={props.restaurant_pic}
                  style={{ height: "46vh", width: "48vw" }}
                />
              </button>
            </Paper>
          )}
        </Grid>
        <Grid item sm={6}>
          <Paper elevation={6} style={{ height: "46vh", width: "49vw" }}>
            <MapContainer latitudeMap={latitude} longitudeMap={longitude} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Closure_Info;
