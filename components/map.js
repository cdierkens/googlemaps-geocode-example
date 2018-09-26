import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const styles = {
    marker: {
        text: { 
            background: 'white', 
            whiteSpace: 'nowrap', 
            padding: '10px'
        }
    }
}

const Marker = ({ text }) => (
    <div>
        <span style={styles.marker.text}>{text}</span>
        <br></br>
        <FontAwesomeIcon size='4x' color='rgb(255, 153, 0, 0.65)' icon={faMapMarkerAlt} />
    </div>
)

class Map extends Component {
  render() {
    let [ defaultMarker ] = this.props.markers
    let center = {
        lat: 33.8077297,
        lng: -84.2399398
    }
    
    if (defaultMarker) {
        center = {
            lat: defaultMarker.geometry.location.lat,
            lng: defaultMarker.geometry.location.lng
        }
    }

    let zoom = 11;

    return (
      <div style={{ height: '80vh', width: '100vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
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