import React, { Component } from "react";
import axios from "axios";

import {Grid} from "@material-ui/core"

import InfoContainer from "./info/InfoContainer"
import NavBar from "./info/NavBar"
import SimpleRating from "./info/SimpleRating"
import CommentBox from "./info/CommentBox"

import restaurant_pic from "../img/restaurant_clipart.png"
import map from "../img/map_pic.png"

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
    console.log("Hello")
  };
  render() {
    const { place } = this.state;
    const name = place.name
    // return <div>{JSON.stringify(place)}</div>;
    return <Grid> 
              <InfoContainer restaurant_pic={restaurant_pic} mapInfo={map} name={place.name} address={place.address} summary={place.summary}/> 
              <Grid container direction="row" alignItems="center">
                <Grid item sm={6}>
                 <SimpleRating />
                </Grid>
                <Grid item sm={6}>
                  <CommentBox />
                </Grid>
              </Grid>
              
            </Grid>
  }
}
