import React, { Component } from "react";
import axios from "axios";

import { Grid, IconButton, Paper, Chip } from "@material-ui/core";

import InfoContainer from "./info/InfoContainer";
import CommentBox from "./comments/CommentBox";
import CommentList from "./comments/CommentList";

import restaurant_pic from "../img/restaurant_clipart.png";
import map from "../img/map_pic.png";

import FavoriteIcon from "@material-ui/icons/Favorite";

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import MapContainer from "./GoogleMap.js"

export default class SinglePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: [],
      comments: [],
      likedStatus: false,
      numberOfLikes: null,
      replyCommentId: null,
      comment: "",
      latitude: 0,
      longitude: 0
    };

    this.textInput = React.createRef();
  }

  postComment = async (e) => {
    try {
      e.preventDefault();
      const { replyCommentId, replyCommentIndex } = this.state;

      const placeId = this.props.match.params.id;
      const { comment } = this.state;

      const res = await axios.post("/api/comments", {
        placeId: placeId,
        content: comment,
        commentId: replyCommentId,
      });

      console.log(res.data);

      if (replyCommentId !== null) {
        console.log("Hi");

        let comments = [...this.state.comments];
        const index = this.state.replyCommentIndex;

        let comment = { ...comments[index] };
        comment.replies = comment.replies
          ? [res.data, ...comment.replies]
          : [res.data];
        console.log(comment.replies);
        comments[index] = comment;

        this.setState({
          comments: comments,
          replyUsername: null,
          replyCommentId: null,
          replyCommentIndex: null,
          comment: "",
        });
      } else {
        this.setState({
          comments: [res.data, ...this.state.comments],
          comment: "",
        });
      }
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

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handleCancel = () => {
    this.setState({
      comment: "",
    });
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
      //using react-places-autocomplete to get lat and long here
      geocodeByAddress(this.state.place.address)
        .then(results => getLatLng(results[0]))
        .then(({lat, lng}) => 
          {this.setState({
            latitude: lat,
            longitude: lng
          })});
          // console.log("Successfully got latitude and longitude", {lat, lng}));
    } catch (err) {
      console.log(err);
    }
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

  openReplyTextBox = (e) => {
    const { comments } = this.state;
    const index = e.currentTarget.id;
    const username = comments[index].user.username;
    const replyCommentId = comments[index].id;

    this.setState(
      {
        replyCommentIndex: index,
        replyUsername: username,
        replyCommentId: replyCommentId,
      },
      () => {
        this.textInput.current.focus();
      }
    );
  };

  removeReplyTextBox = () => {
    this.setState({
      replyUsername: null,
      replyCommentId: null,
      replyCommentIndex: null,
    });
  };

  componentDidMount = async () => {
    await this.getComments();
    await this.getPlaceInfo();
    await this.getLikedStatus();
    await this.getNumberOfLikes();
  };

  toggleAllReplies = async (e) => {
    const index = e.currentTarget.id;
    let comments = [...this.state.comments];

    let comment = { ...comments[index] };
    comment.allRepliesOpen = !comment.allRepliesOpen;

    comments[index] = comment;

    this.setState({
      comments: comments,
    });
  };

  render() {
    const {
      place,
      comments,
      likedStatus,
      numberOfLikes,
      comment,
      replyUsername,
      latitude,
      longitude
    } = this.state;

    const { name, address, summary, images } = place;

    // console.log(latitude)
    // console.log(longitude)

    return (
      <Grid
        container
        direction="row"
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
            latitude={latitude}
            longitude={longitude}
          />
        </Grid>

        <Grid container justify="center" alignItems="center" direction="row">
          <Grid item xs={11}>
            <CommentBox
              postComment={this.postComment}
              handleChange={this.handleChange}
              handleCancel={this.handleCancel}
              value={comment}
              inputRef={this.textInput}
              replyUsername={replyUsername}
              removeReplyTextBox={this.removeReplyTextBox}
            />
            <CommentList
              comments={comments}
              openReplyTextBox={this.openReplyTextBox}
              toggleAllReplies={this.toggleAllReplies}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
