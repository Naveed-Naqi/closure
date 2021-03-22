import React, { Component } from "react";
import axios from "axios";

import { Grid } from "@material-ui/core";

import InfoContainer from "./info/InfoContainer";
import CommentBox from "./info/CommentBox";
import CommentList from "./CommentList";

import restaurant_pic from "../img/restaurant_clipart.png";
import map from "../img/map_pic.png";

export default class SinglePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: [],
      comments: [],
    };
  }

  getComments = async () => {
    try {
      const { id } = this.props.match.params;

      const res = await axios.get(`/api/comments/?placeId=${id}`);

      this.setState({
        comments: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getPlaceInfo = async () => {
    try {
      const { id } = this.props.match.params;
      const res = await axios.get(`/api/places/single/?id=${id}`);

      this.setState({
        place: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  updateComments = (newComment) => {
    // console.log(newComment);
    // this.setState({
    //   comments: [this.state.comments, newComment],
    // });

    this.getComments();
  };

  componentDidMount = async () => {
    await this.getComments();
    await this.getPlaceInfo();
  };

  render() {
    const { place, comments } = this.state;

    const { name, address, summary, images } = place;

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item sm={6} md={12}>
          <InfoContainer
            restaurant_pic={images && images[0].link}
            mapInfo={map}
            name={name}
            address={address}
            summary={summary}
          />
        </Grid>

        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CommentBox updateComments={this.updateComments} />
          </Grid>
          <Grid item>
            <CommentList comments={comments} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
