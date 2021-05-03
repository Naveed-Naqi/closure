import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./info/SeachBar";
import CardList from "./utils/CardList";
import Loading from "./utils/Loading";
import Sort from "./Sort"
import Filter from "./info/Filter";
import {
  Typography,
  Grid,
  Card,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  test:  {
    maxWidth: 140,
    paddingLeft: 180
  },
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      loading: false,
    };
  }

  getPlaces = async () => {
    try {
      this.setState({
        loading: true,
      });
      const res = await axios.get("/api/places/");

      this.setState({
        loading: false,
        places: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    await this.getPlaces();
  };

  onRequestSearch = async (value) => {
    try {
      this.setState({
        loading: true,
      });

      const res = await axios.get(`/api/places/search?content=${value}`);
      console.log(res.data);

      this.setState({
        places: res.data,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { places, loading } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h3">
          Home Page
        </Typography>    
        <SearchBar
          onRequestSearch={this.onRequestSearch}
          onCancelSearch={this.getPlaces}
        />

        <div className={classes.test}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} >
              <Paper>
                <Sort places = {places}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <Filter places = {places} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      
      <CardList places={places} loading={loading} />
      </div>
        
    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);
