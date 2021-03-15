import React, { Component } from "react";
import axios from "axios";

import { Grid } from "@material-ui/core";

import InfoContainer from "./info/InfoContainer";
import NavBar from "./info/NavBar";
import SimpleRating from "./info/SimpleRating";
import CommentBox from "./info/CommentBox";
import CommentList from "./info/CommentList";

import restaurant_pic from "../img/restaurant_clipart.png";
import map from "../img/map_pic.png";

export default class SinglePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: [],
    };
  }

  componentDidMount = async () => {
    try {
      const { id } = this.props.match.params;
      console.log(id);
      const res = await axios.get(`/api/places/single/?id=${id}`);

      this.setState({
        place: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { place } = this.state;

    const { name, address, summary, images } = place;

    console.log(images);

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item sm={12}>
          <InfoContainer
            restaurant_pic={images && images[0].link}
            mapInfo={map}
            name={name}
            address={address}
            summary={summary}
          />
        </Grid>

        <Grid 
          container
          justify='center'
          alignItems='center'
          item sm={3}
        >
          <SimpleRating />
        </Grid>
        <Grid 
          container
          justify='center'
          alignItems='center'
          item sm={3}        
        >
          <CommentBox />
        </Grid>
        <Grid item sm={6}>
          <CommentList />
        </Grid>
      </Grid>
    );
  }
}
