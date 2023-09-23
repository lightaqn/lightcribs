// import React, { FC, useState } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import getCenter from "geolib/es/getCenter";

// interface IProps {}

// const Map: FC<IProps> = ({ search }) => {
//   const [viewport, setViewport] = useState({
//     width: "100%",
//     height: "100%",
//     longitude: center.longitude,
//     latitude: center.latitude,
//     zoom: 10,
//   });
//   const [selectedCrib, setSelectedCrib] = useState({});

//   const coordinates = search.map((item: any) => ({
//     longitude: item.long,
//     latitude: item.lat,
//   }));

//   const center = getCenter(coordinates);
//   //   =process.env.mapbox_key
//   return (
//     <ReactMapGL
//       mapStyle=""
//       mapboxAccessToken
//       {...viewport}
//       onViewportChange={(newViewport: any) => setViewport(newViewport)}
//     >
//       {search.map((item) => (
//         <div key={item.long}>
//           <Marker
//             latitude={item.lat}
//             longitude={item.long}
//             offsetLeft={-20}
//             offsetTop={-10}
//           >
//             <p
//               onClick={(e) => setSelectedCrib(item)}
//               className="text-2xl cursor-pointer animate-pulse"
//               aria-label="push-pin"
//               role="img"
//             >
//               pin
//             </p>
//           </Marker>{" "}
//           {selectedCrib.long === item.long ? (
//             <Popup
//               onClose={() => setSelectedCrib({})}
//               closeOnClick={true}
//               latitude={item.lat}
//               longitude={item.long}
//             >
//               {item.title}
//             </Popup>
//           ) : null}
//         </div>
//       ))}
//     </ReactMapGL>
//   );
// };
// export default Map;
