// @ts-nocheck
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { relative } from 'path/posix'

const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      style={{
        width: '100%',
        height: '100%',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      }}
      initialCenter={{
        lat: 6.45114,
        lng: 3.3884,
      }}
    ></Map>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD2yVNM8jeKpSxEQrb5Xqcqh0PUOBj2l00',
})(MapContainer)
