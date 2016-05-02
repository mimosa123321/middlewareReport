import React, { Component, PropTypes } from 'react';
import MapOverlayView from './MapOverlayView';

export default class Map extends Component {
    createMap() {
        if( !this.map ) {
            this.map = new google.maps.Map(this.refs.map, {
                center: {lat: 15.496032, lng: 108.522949},
                zoom: 5,
                styles: [{'featureType':'water','elementType':'geometry','stylers':[{'color':'#374e5e'}]},{'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#14222f'}]},{'featureType':'road','elementType':'geometry','stylers':[{'color':'#14222f'},{'lightness':-37}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#14222f'}]},{'featureType':'transit','elementType':'geometry','stylers':[{'color':'#14222f'}]},{'elementType':'labels.text.stroke','stylers':[{'visibility':'off'},{'color':'#14222f'},{'weight':2},{'gamma':0.84}]},{'elementType':'labels.text.fill','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'geometry','stylers':[{'weight':0.6},{'color':'#374e5e'}]},{'elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#374e5e'}]}],
                mapTypeId: google.maps.MapTypeId.MAP
            });
        }
    }

    createOverlayView(airports, routeSpots, addRoute) {
        if( !this.overlayView ) {
            this.overlayView = new MapOverlayView();
            this.overlayView.init(this.map, airports, routeSpots, addRoute);
        }
    }

    updateOverlayView(airports, routeSpots, addRoute) {
        if(routeSpots.length > 0) this.overlayView.updateDraw(airports, routeSpots, addRoute);
    }

    render() {
        const { isReady, airports, routeSpots } = this.props;
        if(isReady) {
            this.createMap();
            this.createOverlayView(airports, routeSpots, this.props.addRouteClicked);
            this.updateOverlayView(airports, routeSpots, this.props.addRouteClicked);
        }
        return (
            <div id="map" ref={"map"}></div>
        )
    }
}

Map.propTypes = {
    isReady: PropTypes.bool.isRequired,
    airports: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        lng: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
        isChosen: PropTypes.bool.isRequired
    })).isRequired,
    routeSpots: PropTypes.array.isRequired,
    addRouteClicked: PropTypes.func.isRequired
};

