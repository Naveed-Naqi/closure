import React, { Component } from "react";
import axios from "axios";

import { Grid, IconButton, Paper } from "@material-ui/core";

import InfoContainer from "./info/InfoContainer";
import CommentBox from "./info/CommentBox";
import CommentList from "./CommentList";

import restaurant_pic from "../img/restaurant_clipart.png";
import map from "../img/map_pic.png";

import FavoriteIcon from "@material-ui/icons/Favorite";

export default class SinglePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: [],
      comments: [],
      likedStatus: false,
    };
  }

  like = async () => {
    if (this.state.likedStatus) {
    } else {
      try {
        const res = await axios.post("/api/likes", {
          placeId: this.props.match.params.id,
          status: !this.state.likedStatus,
        });

        this.setState({
          likedStatus: !this.state.likedStatus,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  getLikedStatus = async () => {};

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
    await this.getLikedStatus();
  };

  render() {
    const { place, comments, likedStatus } = this.state;

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
            <Paper padding={10}>
              {"Number of Likes"}
              <IconButton aria-label="add to favorites" onClick={this.like}>
                <FavoriteIcon style={{ color: likedStatus ? "red" : "gray" }} />
              </IconButton>
            </Paper>
          </Grid>
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
