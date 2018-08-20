import React, { Component } from 'react'
class ListMarkers extends Component {

    render() {
      return (
            <ul>
              {
                this.props.searchMarkers.map((marker, index) => {
                  return <li key={index}>{marker.name}</li>
                })
              }
            </ul>
      );
    }
  }

  export default ListMarkers;