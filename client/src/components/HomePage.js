import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./info/SeachBar";

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

import { withStyles } from "@material-ui/core/styles";

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
    this.state = {
      places: [],
    };
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get("/api/places/");

      this.setState({
        places: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { places } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>Homepage</h1>
        <SearchBar />
        <Grid container spacing={3} alignItems="center" justify="center" >
          {places.map((elem) => {
            const { name, address, images, id } = elem;

            return (
              <Grid item xs={3}>
                <Card>
                  <CardHeader
                    action={
                      <IconButton
                        id={id}
                        onClick={(e) => {
                          const id = e.currentTarget.id;
                          this.props.history.push(`/single/${id}`);
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                    title={name}
                    subheader={address}
                  />
                  <CardMedia className={classes.media} image={images[0].link} />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);
