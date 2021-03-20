import React, { Component } from "react";
import axios from "axios";

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
  Paper,
  CardContent
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

import { withStyles } from "@material-ui/core/styles";
import stickFigure from "../img/stick_figure.png";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   places: [],
    // };
  }

//   componentDidMount = async () => {
//     try {
//       const res = await axios.get("/api/places/");

//       this.setState({
//         places: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

  render() {
    // const { places } = this.state;
    // const { classes } = this.props;

    return (
      <div>
        <h1>About Us</h1>
        <Grid container spacing={3} direction="row" alignItems="left" justify="flex-start">
            <Grid item xs={4} sm={3}>
                <Paper elevation={6} style={{ height: "25vh", width: "25vw" }}>
                    <img
                    src={stickFigure}
                    style={{ height: "100%", width: "100%" }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={4} sm={3} alignContent="center">
                <Paper>
                    <Card style={{ height: "25vh", width: "25vw" }}>
                        <CardHeader title="Stick" subheader="Does The Works" />
                        <CardContent>
                            <div>{"Our task must be to free ourselves... by widening our circle of compassion to embrace all living creatures and the whole of nature and it's beauty."}</div>
                            <br />
                        </CardContent>
                    </Card>
                    
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper elevation={6} style={{ height: "25vh", width: "25vw" }}>
                    <img
                    src={stickFigure}
                    style={{ height: "100%", width: "100%" }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper elevation={6} style={{ height: "25vh", width: "25vw" }}>
                    <img
                    src={stickFigure}
                    style={{ height: "100%", width: "100%" }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper elevation={6} style={{ height: "25vh", width: "25vw" }}>
                    <img
                    src={stickFigure}
                    style={{ height: "100%", width: "100%" }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper elevation={6} style={{ height: "25vh", width: "25vw" }}>
                    <img
                    src={stickFigure}
                    style={{ height: "100%", width: "100%" }}
                    />
                </Paper>
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);
