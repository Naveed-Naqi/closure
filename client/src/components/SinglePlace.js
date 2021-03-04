import React, { Component } from "react";
import axios from "axios";

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
    return <div>{JSON.stringify(place)}</div>;
  }
}
