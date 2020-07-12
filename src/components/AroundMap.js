import React from 'react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
// import { AroundMarker } from './AroundMarker';


class NormalAroundMap extends React.Component {
  render() {
    //const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
    return (
      // <div>Map</div>

      <GoogleMap
        ref={this.getMapRef}
        defaultZoom={11}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}

        onDragEnd={this.reloadMarker}
        onZoomChanged={this.reloadMarker}
      >
        {this.props.posts.map((post) => <Marker post={post} key={post.url} />)}
      </GoogleMap>

    );
  }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));
