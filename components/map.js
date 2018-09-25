import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Marker = ({ text }) => (
    <div>
        <FontAwesomeIcon size="4x" color="rgb(255, 153, 0, 0.65)" icon={faMapMarkerAlt} />
        <span>{text}</span>
        <style jsx>{`
            span {
                width: 200px;
            }
        `}</style>
    </div>
)

class Map extends Component {
  render() {
    let [ defaultMarker ] = this.props.markers
    let center = {
        lat: defaultMarker.geometry.location.lat,
        lng: defaultMarker.geometry.location.lng
    }
    let zoom = 11;

    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC2PdbxM6c-r9VTdzb5HtrARnPZu-XylH4' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        {
            this.props.markers.map(marker => (
                <Marker 
                    lat={marker.geometry.location.lat}
                    lng={marker.geometry.location.lng}
                    text={marker.formatted_address}
                    key={marker.formatted_address}/>
            ))
        }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;