import React, { Component } from "react";
import axios from "axios";

export default class SinglePlaceComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount = async () => {
    try {
      const { placeId } = this.props.match.params;
      console.log(placeId); // ?id=${id}
      const res = await axios.get(`/api/comments/?placeId=${placeId}`);

      this.setState({
        comments: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { comments } = this.state;
    return <div>{JSON.stringify(comments)}</div>;
  }
}