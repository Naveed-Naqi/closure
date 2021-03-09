import React, { Component } from "react";
import axios from "axios";

import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";

export default class HomePage extends Component {
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

    return (
      <div>
        <h1>Homepage</h1>
        {places.map((elem) => {
          const { name, address } = elem;

          return (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item sm={6}>
                <Card>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <InfoIcon />
                      </IconButton>
                    }
                    title={name}
                    subheader={address}
                  />
                </Card>
              </Grid>
            </Grid>
          );
        })}
      </div>
    );
  }
}
