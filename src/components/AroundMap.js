import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";
import { AroundMarker } from './AroundMarker';

class NormalAroundMap extends React.Component {
  render() {
    return {
      // <div>Map</div>
      <GoogleMap
        ref={this.getMapRef}
        defaultZoom={11}
        defaultCenter={{ lat, lng: lon }}
        onDragEnd={this.reloadMarker}
        onZoomChanged={this.reloadMarker}
      >
        {this.props.posts.map((post) => <AroundMarker post={post} key={post.url} />)}
      </GoogleMap>
    };
  }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));
