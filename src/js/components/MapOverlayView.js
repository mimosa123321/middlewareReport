const padding = 10;
export default class MapOverlayView {
    init(map, airports, routeSpots, addRouteClicked) {
        this.airports = airports;
        this.routeSpots = routeSpots;
        this.addRouteClicked = addRouteClicked;
        this.overlay = new google.maps.OverlayView();
        this.overlay.onAdd = () => { this.onAdd() };
        this.overlay.draw = () => { this.onDraw()};
        this.overlay.update = () => { this.onUpdate() };
        this.overlay.setMap(map);
    }

    onAdd() {
        this.layer = d3.select(this.overlay.getPanes().overlayMouseTarget)
            .append('div')
            .attr('class', 'airports');

        this.routesLayer = d3.select(this.overlay.getPanes().overlayLayer)
            .append('div')
            .attr('class','routesContainer')
    }

    onDraw() {
        /* clear contents */
        d3.select(this.overlay.getPanes().overlayLayer).select('.airports').selectAll('*').remove();
        d3.select(this.overlay.getPanes().overlayLayer).select('.routesContainer').selectAll('*').remove();

        this.drawAirports();
        this.calcRoutes();
    }

    drawAirports() {
        var out = this;
        let airport = this.layer.selectAll('svg')
            .data(d3.entries(this.airports))
            .each(function(d) { out.transform(this, d); })
            .enter().append('svg:svg')
            .each(function(d) { out.transform(this, d); })
            .attr('class', 'airport')
            .on("click", (d) => {
                let destIndex = d.key;
                if(d.value.isChosen === false) {
                    this.addRouteClicked({
                        id: d.value.id,
                        lat: d.value.lat,
                        lng: d.value.lng,
                        name: d.value.name
                    }, destIndex);
                }
            });

        airport
            .append('svg:circle')
            .attr('r', 7)
            .attr('cx', padding)
            .attr('cy', padding)
            .style('fill', 'white')
            .style('stroke-width', '6')
            .style('stroke', '#ffc631');
    }

    transform(svg, coords) {
        let latLng = new google.maps.LatLng(coords.value.lat, coords.value.lng);
        let position = this.changeLatLngToDivPixel(latLng),
            result = d3.select(svg)
                .style('left', (position.x - padding) + 'px')
                .style('top', (position.y - padding) + 'px');
        return result;
    }

    //route
    calcRoutes() {
        let position = this.convert(this.routeSpots),
            totalPaths = this.routeSpots.length - 1,
            i = 0;
        while(i < totalPaths) {
            let dx = position[i+1].x - position[i].x,
                dy = position[i+1].y - position[i].y,
                dr = Math.sqrt(dx * dx + dy * dy);
            let svgPath = 'M' + position[i].x + ',' + position[i].y + 'A' + dr + ',' + dr + ' 0 0,0 ' + position[i+1].x + ',' + position[i+1].y;
            this.path = this.drawPath(svgPath);
            i++;
        }
    }

    drawPath = function(svgPath) {
        let svg = this.routesLayer
            .append('svg'),
            path;

        path = svg.append('path')
            .attr('d', svgPath)
            .attr('class','route')
            .style('stroke', '#aabbcc')
            .style('stroke-width', '10px')
            .style('stroke-linecap', 'round')
            .style('stroke-opacity', 0.5)
            .style('fill', 'none');

        return path;
    };

    convert(data) {
        let i,
            convertData = [],
            screenPositions;
        for (i = 0; i< data.length; i++) {
            screenPositions = this.changeLatLngToDivPixel(new google.maps.LatLng(data[i].lat, data[i].lng));
            convertData.push(screenPositions);
        }
        return convertData;
    }

    changeLatLngToDivPixel(latLng) {
        return this.overlay.getProjection().fromLatLngToDivPixel(latLng);
    }

    animatePath() {
        if(this.path) {
            let len = this.path.node().getTotalLength();
            this.path
                .attr("stroke-dasharray", len + " " + len)
                .attr("stroke-dashoffset", len)
                .transition()
                .duration(800)
                .ease("linear")
                .attr("stroke-dashoffset",0);
        }
    }

    updateDraw(airports,  routeSpots, addRouteClicked) {
        this.airports = airports;
        this.routeSpots = routeSpots;
        this.addRouteClicked = addRouteClicked;

        this.overlay.draw();

        this.animatePath();
    }
};





