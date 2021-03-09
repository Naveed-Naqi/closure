import React, { Component } from "react";
import axios from "axios";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const displayCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Name</Typography>
        <Typography variant="body2">Address</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

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

    //return (<div>{JSON.stringify(places)}</div>)
    return (
      <div className="container">
        <h1>Homepage</h1>
        <Card>
          {places.map((elem) => {
            const { name, address } = elem;

            return (
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">{name}</Typography>s
                      <Typography variant="body2">{address}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            );
          })}
        </Card>
      </div>
    );
  }
}
