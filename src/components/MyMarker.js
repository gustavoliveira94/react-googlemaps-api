/* eslint-disable no-undef */
import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, Marker} from 'react-google-maps'

const MyMarker = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDz9XmXOh4nbDkeyOFFQHk_7SL7Uhc0aKI&v=3.exp&libraries=geometry,drawing,places",
  }),
  withScriptjs,
  withGoogleMap
)(props =>

      <Marker infowindow={props.onToggleOpen}
        onClick={props.onToggleOpen}>
      </Marker>
)

export default MyMarker