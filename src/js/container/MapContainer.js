import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Map from './../components/Map';
import { addRoute } from './../actions'

function createMapOptions(maps) {
    return {
        panControl: false,
        mapTypeControl: false,
        scrollwheel: false,
        styles: [{'featureType':'water',
            'elementType':'geometry',
            'stylers':[{'color':'#374e5e'}]
        }, {'featureType':'landscape',
            'elementType':'geometry',
            'stylers':[{'color':'#14222f'}]
        }, {'featureType':'road',
            'elementType':'geometry',
            'stylers':[{'color':'#14222f'}, {'lightness':-37}]
        }, {'featureType':'poi',
            'elementType':'geometry',
            'stylers':[{'color':'#14222f'}]
        }, {'featureType':'transit',
            'elementType':'geometry',
            'stylers':[{'color':'#14222f'}]
        }, {'elementType':'labels.text.stroke',
            'stylers':[{'visibility':'off'}, {'color':'#14222f'}, {'weight':2}, {'gamma':0.84}]
        }, {'elementType':'labels.text.fill',
            'stylers':[{'visibility':'off'}]
        }, {'featureType':'administrative',
            'elementType':'geometry',
            'stylers':[{'weight':0.6}, {'color':'#374e5e'}]
        }, {'elementType':'labels.icon',
            'stylers':[{'visibility':'off'}]
        }, {'featureType':'poi.park',
            'elementType':'geometry',
            'stylers':[{'color':'#374e5e'}]
        }]
    };
}

function mapStateToProps(state) {
    return {
        routeSpots: state.map.routeSpots,
        airports: state.map.airports,
        isMapReady: state.map.isReady
    }
}

class MapContainer extends Component {
    static defaultProps = {
        center : {lat: 15.496032, lng: 108.522949},
        zoom : 5
    };
    render() {
        const { airports, isMapReady, routeSpots } = this.props;
        return (
            <div className="mapContainer">
                <Map isReady={isMapReady} airports={airports} routeSpots={routeSpots} addRouteClicked={this.props.addRoute} />
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    { addRoute }
)(MapContainer)



