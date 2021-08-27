import { useState, useRef, useEffect } from "react";
import ReactMapGL, {
    Marker,
    Popup,
    GeolocateControl,
    NavigationControl,
    ScaleControl,
} from "react-map-gl";
let secrets = require("../../secrets.json");
import * as trails from "../../trails.json";
import axios from "axios";
import MapPopup from "./mappopup";
import TopThree from "./topthreetrails";

export default function Map() {
    const [viewport, setViewport] = useState({
        width: 1300,
        height: 810,
        latitude: 52.520008,
        longitude: 13.404954,
        zoom: 10,
    });
    const [selectedTrail, setSelectedTrail] = useState(null);

    const geolocateControlStyle = {
        right: 10,
        top: 10,
    };

    const navControlStyle = {
        right: 10,
        top: 10,
    };

    const scaleControlStyle = {
        left: 20,
        bottom: 30,
    };

    return (
        <div className="mapMain">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={secrets.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/duygutuncer/cksoguv2cbji417ocfbeb5dmi"
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <GeolocateControl
                    className="locateControl"
                    style={geolocateControlStyle}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    auto={false}
                />

                <NavigationControl style={navControlStyle} />
                <ScaleControl
                    maxWidth={200}
                    maxHeight={100}
                    unit="metric"
                    style={scaleControlStyle}
                />

                {trails.features.map((trail) => {
                    // console.log("trail.properties.id", trail.properties.id);
                    return (
                        <Marker
                            key={trail.properties.id}
                            latitude={trail.geometry.coordinates[0]}
                            longitude={trail.geometry.coordinates[1]}
                        >
                            <button
                                className="bikeButton"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedTrail(trail);
                                }}
                            >
                                <img
                                    className="logoBike"
                                    src="/images/bike.jpg"
                                    alt="bike"
                                />
                            </button>
                        </Marker>
                    );
                })}
                {selectedTrail ? (
                    <MapPopup
                        selectedTrail={selectedTrail}
                        setSelectedTrail={setSelectedTrail}
                    />
                ) : null}
            </ReactMapGL>
            <div>
                <TopThree className="topThreeMain"></TopThree>
            </div>
        </div>
    );
}

// import * as React from "react";
// import ReactMapGL, { Marker } from "react-map-gl";

// // mapboxgl.accessToken =
// //     "pk.eyJ1IjoiZHV5Z3V0dW5jZXIiLCJhIjoiY2tzbHFjM3JhMGw3YjJvcG5kOXp3cnJndCJ9.k9oUARDp8JnHfURp2QIFUA";

// export default function Map() {
//     const [viewport, setViewport] = React.useState({
//         longitude: -122.45,
//         latitude: 37.78,
//         zoom: 14,
//     });
//     return (
//         <ReactMapGL
//             mapboxApiAccessToken={secrets.REACT_APP_MAPBOX_TOKEN}
//             {...viewport}
//             width="100vw"
//             height="100vh"
//             onViewportChange={setViewport}
//         >
//             <Marker
//                 latitude={37.78}
//                 longitude={-122.41}
//                 offsetLeft={-20}
//                 offsetTop={-10}
//             >
//                 <div>You are here</div>
//             </Marker>
//         </ReactMapGL>
//     );
// }

// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import {Marker} from "react-map-gl";

// mapboxgl.accessToken =
//     "pk.eyJ1IjoiZHV5Z3V0dW5jZXIiLCJhIjoiY2tzbHFjM3JhMGw3YjJvcG5kOXp3cnJndCJ9.k9oUARDp8JnHfURp2QIFUA";

// export default function Map() {
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(-70.9);
//     const [lat, setLat] = useState(42.35);
//     const [zoom, setZoom] = useState(9);

//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: "mapbox://styles/mapbox/streets-v11",
//             center: [lng, lat],
//             zoom: zoom,
//         });
//     });

//     useEffect(() => {
//         if (!map.current) return; // wait for map to initialize
//         map.current.on("move", () => {
//             setLng(map.current.getCenter().lng.toFixed(4));
//             setLat(map.current.getCenter().lat.toFixed(4));
//             setZoom(map.current.getZoom().toFixed(2));
//         });
//     });

//     return (
//         <div>
//             <div className="sidebar">
//                 Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//             </div>
//             <div ref={mapContainer} className="map-container" />
//         </div>
//     );
// }
