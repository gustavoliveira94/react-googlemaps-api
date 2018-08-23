/* eslint-disable no-undef */
import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input'

class ListPlaces extends Component {
    render() {

        return (
            <div className="locations">
                <div className="logo">
                    <h1>U-LOCATIONS</h1>
                    <i onClick={this.props.viewMarkers}
                        className="fas fa-2x fa-bars">
                    </i>
                </div>
                <DebounceInput
                    className="filter"
                    aria-label="write one place"
                    minLength={1}
                    debounceTimeout={0}
                    placeholder="DIGITE UM LOCAL"
                    onChange={this.props.filterList} />
                <ul className="hidden" role-props="list places">
                    {
                        this.props.markers.map((marker, index) => {
                            return (
                                <li
                                    tabIndex="0"
                                    onKeyUp={() => this.props.onToggleOpen(index, true)}
                                    role-props="places"
                                    aria-label="choose one place"
                                    onClick={() => this.props.onToggleOpen(index, true)} key={index}>{marker.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ListPlaces;