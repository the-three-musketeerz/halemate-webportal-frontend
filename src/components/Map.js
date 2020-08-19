import React from "react";

import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";

const points = [
  { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
  { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
  { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 }
];

export default function GoogleMap() {
  return (
    <div className="App">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAqOazqPcP8E-_s-Vp7MRbP3UMUgS2xfQw",
          language: "en",
          region: "IN"
        }}
        defaultCenter={{ lat: 51.506, lng: -0.169 }}
        defaultZoom={15}
      >
        {points.map(({ lat, lng, id, title }) => {
          return (
            <MyMarker
              key={id}
              lat={lat}
              lng={lng}
              text={id}
              tooltip={title}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}