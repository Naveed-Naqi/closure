import React, { Component } from "react";
import axios from "axios";
import Carousel from 'react-material-ui-carousel'
import { staffData } from "./staffData.js"

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
  Paper,
  CardContent,
  List
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

import { withStyles } from "@material-ui/core/styles";
import stickFigure from "../img/stick_figure.png";

// import backgroundPic from "../img/tile_background.png"
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    // height: '99vh'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});


class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>About Closure</h1>
        <Grid container justify="center">
          <Grid item xs={8}  >
            <Card style={{ height: "50vh", width: ""}}>
              <CardHeader title="Our Mission"/>
              <CardContent>
                <div>
                  Create a memorial for places that have closed down that people can view and comment on. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id pharetra lacus. Nulla facilisi. Suspendisse volutpat tristique nunc, in volutpat metus ornare ut. Phasellus varius bibendum consectetur. Duis vel interdum ligula. Fusce eu felis eu est hendrerit pretium at faucibus mi. Etiam efficitur viverra nisi, nec placerat lacus maximus nec.
                </div>
              </CardContent>
              <CardHeader title="Our Values"/>
              <CardContent>
                <div>
                Create a memorial for places that have closed down that people can view and comment on. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id pharetra lacus. Nulla facilisi. Suspendisse volutpat tristique nunc, in volutpat metus ornare ut. Phasellus varius bibendum consectetur. Duis vel interdum ligula. Fusce eu felis eu est hendrerit pretium at faucibus mi. Etiam efficitur viverra nisi, nec placerat lacus maximus nec.
                </div>
              </CardContent>
              <CardHeader title="Why We Deserve An A"/>
              <CardContent>
                <div>
                Create a memorial for places that have closed down that people can view and comment on. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id pharetra lacus. Nulla facilisi. Suspendisse volutpat tristique nunc, in volutpat metus ornare ut. Phasellus varius bibendum consectetur. Duis vel interdum ligula. Fusce eu felis eu est hendrerit pretium at faucibus mi. Etiam efficitur viverra nisi, nec placerat lacus maximus nec.
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <h1>Meet the Team</h1>
        <Grid container direction="row" alignItems="left" justify="center">
        <Carousel>
          {staffData.map((elem) => {
            const { Name, Role, Body, image, ID} = elem;
            return (
            <Grid container xs={12} direction="row" alignItems="left" justify="flex-start">
                <Grid item xs={6}>
                    <Paper elevation={0} style={{ height: "25vh", width: "25vw" }}>
                        <img
                        src={image}
                        style={{ height: "100%", maxWidth: "100%" }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6} alignContent="center">
                    <Paper elevation={0}>
                        <Card style={{ height: "25vh", width: "25vw" }}>
                            <CardHeader title={Name} subheader={Role} />
                            <CardContent>
                                <div>{Body}</div>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
            );
          })}
        </Carousel>
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AboutPage);


