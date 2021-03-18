import React, { Component } from "react";
import axios from "axios";

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;
    return <div>{JSON.stringify(comments)}</div>;
  }
}
