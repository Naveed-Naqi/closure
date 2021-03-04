import React, { Component } from "react";
import axios from "axios";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount = async () => {
    try {
      const places = await axios.get("/api/places/");

      this.setState({
        places: places,
      });
    } catch (err) {}
  };

  render() {
    const { places } = this.state;

    return <div>{JSON.stringify(places)}</div>;
  }
}
