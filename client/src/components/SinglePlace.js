import React, { Component } from "react";
import axios from "axios";

import { Grid, IconButton, Paper } from "@material-ui/core";

import InfoContainer from "./info/InfoContainer";
import CommentBox from "./comments/CommentBox";
import CommentList from "./comments/CommentList";

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
      numberOfLikes: null,
    };
  }

  postComment = async (value) => {
    try {
      const placeId = this.props.match.params.id;

      const res = await axios.post("/api/comments", {
        placeId: placeId,
        content: value,
      });

      this.setState({
        comments: [res.data, ...this.state.comments],
      });
    } catch (err) {
      console.log(err);
    }
  };

  like = async () => {
    if (this.state.likedStatus) {
      try {
        const res = await axios.delete("/api/likes", {
          data: { placeId: this.props.match.params.id },
        });

        this.setState({
          likedStatus: !this.state.likedStatus,
          numberOfLikes: (this.state.numberOfLikes -= 1),
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post("/api/likes", {
          placeId: this.props.match.params.id,
        });

        this.setState({
          likedStatus: !this.state.likedStatus,
          numberOfLikes: (this.state.numberOfLikes += 1),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  getNumberOfLikes = async () => {
    try {
      const { id } = this.props.match.params;

      const res = await axios.get(`/api/likes/?placeId=${id}`);

      this.setState({
        numberOfLikes: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getLikedStatus = async () => {
    try {
      const { id } = this.props.match.params;

      const res = await axios.get(`/api/places/likedStatus/?placeId=${id}`);

      this.setState({
        likedStatus: res.data,
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

  getComments = async () => {
    try {
      const { id } = this.props.match.params;

      const res = await axios.get(`/api/comments/?placeId=${id}`);

      const comments = res.data.map((elem) => {
        return {
          ...elem,
          replyOpen: false,
          allRepliesOpen: false,
        };
      });

      this.setState({
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    await this.getComments();
    await this.getPlaceInfo();
    await this.getLikedStatus();
    await this.getNumberOfLikes();
  };

  render() {
    const { place, comments, likedStatus, numberOfLikes } = this.state;

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
            numberOfLikes={numberOfLikes}
            likedStatus={likedStatus}
            like={this.like}
          />
        </Grid>

        <Grid container justify="center" alignItems="center" direction="row">
          <Grid item xs={11}>
            <CommentBox postComment={this.postComment} />
            <CommentList comments={comments} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
