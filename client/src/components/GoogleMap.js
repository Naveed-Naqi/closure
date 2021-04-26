//note: code formatted for ES6 here
import React, { Component } from 'react'; 
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 40.76742,
        lng: -73.92436
      }
    };
   
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
   
    render() {
      return (
        <Map style={{width: "50vw", height: "50vh"}}google={this.props.google}
        initialCenter={{ 
          // lat: this.state.mapCenter.lat, 
          // lng: this.state.mapCenter.lng
          lat: this.props.latitudeMap,
          lng: this.props.longitudeMap
        }}
        center = {{
          // lat: this.state.mapCenter.lat, 
          // lng: this.state.mapCenter.lng
          lat: this.props.latitudeMap,
          lng: this.props.longitudeMap
        }}
        >
          <Marker 
            position = {{
              // lat: this.state.mapCenter.lat, 
              // lng: this.state.mapCenter.lng
              lat: this.props.latitudeMap,
              lng: this.props.longitudeMap
            }}
          />
   
        
        </Map>
      )
    }
  }


  export default GoogleApiWrapper({
    apiKey: ('')
  })(MapContainer)


