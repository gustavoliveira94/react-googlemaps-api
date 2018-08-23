/* eslint-disable no-undef */
import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input'
import Map from './components/Map'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state =
      {
        markers: [],
        iconDefault: 'https://image.ibb.co/kpxg5z/placeholder_2.png',
        iconSelected: 'https://image.ibb.co/bC9PXe/placeholder_4.png',
        isOpen: false,
        indexInfo: 0,
        onToggleOpen: ({ isOpen }) => (index, isOpen) => ({
          indexInfo: index,
          isOpen: !isOpen
        })
      }
    this.filterList = this.filterList.bind(this)
    this.viewMarkers = this.viewMarkers.bind(this)
  }

  // CALL API FOURSQUARE
  componentDidMount() {
    const url = [
      `https://api.foursquare.com/v2/venues/search?`,
      `client_id=RUL3K0COWWO3LFT2ONJABQ2P4SXFKXISTMWXKENFWC04Y1SA`,
      `&client_secret=VKCHEYUH1M4AN1JAC315U45POZGMHUXCWFWGPLJFCRDJKC4G`,
      `&v=20180323`,
      `&limit=30`,
      `&ll=-22.8813215,-43.4647076`,
      `&radius=200`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.response.venues });
      });
  }

  // METHOD FILTER SEARCH
  filterList(event) {
    this.setState({
      markers: this.state.markers.filter(marker => {
        return marker.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
    })
    if (event.target.value <= 0) {
      const url = [
        `https://api.foursquare.com/v2/venues/search?`,
        `client_id=RUL3K0COWWO3LFT2ONJABQ2P4SXFKXISTMWXKENFWC04Y1SA`,
        `&client_secret=VKCHEYUH1M4AN1JAC315U45POZGMHUXCWFWGPLJFCRDJKC4G`,
        `&v=20180323`,
        `&limit=30`,
        `&ll=-22.8813215,-43.4647076`,
        `&radius=200`
      ].join("")

      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({ markers: data.response.venues });
        });
    }
  }

  // METHOD TO RESPONSIVE PLACES FILTERS
  viewMarkers() {
    const list = document.querySelector('.locations ul');
    if (list.classList.contains('hidden')) {
      window.addEventListener("click", () => {
        list.classList.remove('hidden')
      })
    } else {
      window.addEventListener("click", () => {
        list.classList.add('hidden')
      }
      )
    }
  }

  // METHOD OPEN INFOWINDOW
  onToggleOpen = (index, isOpen) => {
    this.setState({
      indexInfo: index,
      isOpen: isOpen
    });
  }

  render() {

    return (
      <header className="main">

        {/* CONTAINER FILTER PLACES */}
        <div className="locations">
          <div className="logo"><h1>U-LOCATIONS</h1> <i onClick={this.viewMarkers} className="fas fa-2x fa-bars"></i></div>
          <DebounceInput
            className="filter"
            minLength={1}
            debounceTimeout={0}
            placeholder="DIGITE UM LOCAL"
            onChange={this.filterList} />
          <ul className="hidden">
            {
              this.state.markers.map((marker, index) => {
                return <li onClick={() => this.onToggleOpen(index, true)} key={index}>{marker.name}</li>
              })
            }
          </ul>
        </div>

        {/* CONTAINER MAP */}
        <div className="map">
          <Map
            markers={this.state.markers}
            onToggleOpen={this.onToggleOpen}
            indexInfo={this.state.indexInfo}
            isOpen={this.state.isOpen}
            iconDefault={this.state.iconDefault}
            iconSelected={this.state.iconSelected} />
        </div>

      </header >
    );
  }
}

export default App;