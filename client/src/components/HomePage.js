import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./info/SeachBar";
import CardList from "./utils/CardList";
import Loading from "./utils/Loading";

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
        <h1>Homepage</h1>
        <SearchBar
          onRequestSearch={this.onRequestSearch}
          onCancelSearch={this.getPlaces}
        />

        <CardList places={places} loading={loading} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);
