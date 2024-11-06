
// // // import React, { useEffect, useRef, useState } from 'react';
// // // import L from 'leaflet';
// // // import 'leaflet/dist/leaflet.css';

// // // const VehicleMap = () => {
// // //   const mapRef = useRef(null);
// // //   const vehicleMarkerRef = useRef(null);
// // //   const routeLines = useRef([]);
// // //   const checkpointMarkersRef = useRef([]);
// // //   const [selectedRoute, setSelectedRoute] = useState(null);
// // //   const [completedPath, setCompletedPath] = useState([]); // To store completed path

// // //   const routes = [
// // //     {
// // //       id: 1,
// // //       name: 'Route 1',
// // //       path: [
// // //         { lat: 17.3850, lng: 78.4867 }, // Hyderabad
// // //         { lat: 21.1458, lng: 79.0882 }, // Nagpur
// // //         { lat: 23.2599, lng: 77.4126 }, // Bhopal
// // //         { lat: 28.6139, lng: 77.2090 }, // Delhi
// // //         { lat: 28.0622, lng: 73.6301 }, // Nohar (Destination)
// // //       ],
// // //     },
// // //     {
// // //       id: 2,
// // //       name: 'Route 2',
// // //       path: [
// // //         { lat: 17.3850, lng: 78.4867 }, // Hyderabad
// // //         { lat: 19.0760, lng: 72.8777 }, // Mumbai
// // //         { lat: 24.5854, lng: 73.7125 }, // Udaipur
// // //         { lat: 28.6139, lng: 77.2090 }, // Delhi
// // //         { lat: 28.0622, lng: 73.6301 }, // Nohar (Destination)
// // //       ],
// // //     },
// // //     {
// // //       id: 3,
// // //       name: 'Route 3',
// // //       path: [
// // //         { lat: 17.3850, lng: 78.4867 }, // Hyderabad
// // //         { lat: 18.5204, lng: 73.8567 }, // Pune
// // //         { lat: 26.9124, lng: 75.7873 }, // Jaipur
// // //         { lat: 28.7041, lng: 77.1025 }, // Delhi
// // //         { lat: 28.0622, lng: 73.6301 }, // Nohar (Destination)
// // //       ],
// // //     },
// // //   ];

// // //   useEffect(() => {
// // //     // Initialize map
// // //     if (!mapRef.current) {
// // //       mapRef.current = L.map('map', { zoomControl: false }).setView([20.5937, 78.9629], 5);

// // //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// // //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// // //       }).addTo(mapRef.current);
// // //     }

// // //     // Define custom icons
// // //     const startIcon = L.icon({
// // //       iconUrl: 'https://img.icons8.com/fluency/48/000000/marker.png',
// // //       iconSize: [30, 30],
// // //     });

// // //     const destinationIcon = L.icon({
// // //       iconUrl: 'https://img.icons8.com/fluency/48/000000/marker.png',
// // //       iconSize: [30, 30],
// // //     });

// // //     const vehicleIcon = L.icon({
// // //       iconUrl: 'https://img.icons8.com/ios-filled/50/car.png',
// // //       iconSize: [30, 30],
// // //     });

// // //     // Show all routes by default
// // //     routes.forEach((route) => {
// // //       const path = route.path.map((point) => [point.lat, point.lng]);
// // //       const polyline = L.polyline(path, { color: 'blue', dashArray: '5, 5' }).addTo(mapRef.current);
// // //       routeLines.current.push(polyline);

// // //       // Add markers for start and destination
// // //       L.marker([route.path[0].lat, route.path[0].lng], { icon: startIcon })
// // //         .addTo(mapRef.current)
// // //         .bindTooltip("Start")
// // //         .openTooltip();
// // //       L.marker([route.path[route.path.length - 1].lat, route.path[route.path.length - 1].lng], { icon: destinationIcon })
// // //         .addTo(mapRef.current)
// // //         // .bindTooltip("Destination", { permanent: true })
// // //         .openTooltip();
// // //     });

// // //     // Initialize vehicle marker
// // //     if (!vehicleMarkerRef.current) {
// // //       vehicleMarkerRef.current = L.marker([17.3850, 78.4867], { icon: vehicleIcon }).addTo(mapRef.current);
// // //     }

// // //     // Automatically select the first route and show checkpoints
// // //     // setSelectedRoute(1); // Select the first route by default

// // //     // Draw the checkpoints for the default selected route
// // //     const defaultRoute = routes.find((r) => r.id === 1);
// // //     if (defaultRoute) {
// // //       drawCheckpoints(defaultRoute.path);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (selectedRoute !== null) {
// // //       clearPreviousRoute(); // Clear previously drawn routes and markers

// // //       const route = routes.find((r) => r.id === selectedRoute);
// // //       if (route) {
// // //         const path = route.path.map((point) => [point.lat, point.lng]);

// // //         // Create checkpoints as circle markers initially
// // //         checkpointMarkersRef.current = route.path.slice(1, -1).map((checkpoint) => {
// // //           const marker = L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current);
// // //           return marker;
// // //         });

// // //         // Draw the route with a dashed line
// // //         const routeLine = L.polyline(path, { color: 'orange', dashArray: '5, 5' }).addTo(mapRef.current);

// // //         // Start vehicle movement along the selected route
// // //         moveVehicleAlongRoute(route.path, routeLine);
// // //       }
// // //     }
// // //   }, [selectedRoute]);

// // //   function clearPreviousRoute() {
// // //     // Remove previously drawn polylines
// // //     routeLines.current.forEach((line) => mapRef.current.removeLayer(line));
// // //     routeLines.current = [];

// // //     // Remove previous checkpoint markers
// // //     checkpointMarkersRef.current.forEach((marker) => mapRef.current.removeLayer(marker));
// // //     checkpointMarkersRef.current = [];
    
// // //     // Clear the completed path for a new route
// // //     setCompletedPath([]);
// // //   }

// // //   function drawCheckpoints(path) {
// // //     // Draw checkpoints as circle markers
// // //     checkpointMarkersRef.current = path.slice(1, -1).map((checkpoint) => {
// // //       const marker = L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current);
// // //       return marker;
// // //     });
// // //   }

// // //   function moveVehicleAlongRoute(path, routeLine) {
// // //     let currentCheckpointIndex = 0;
// // //     const checkpointIcon = L.icon({
// // //       iconUrl: 'https://img.icons8.com/color/48/000000/marker.png',
// // //       iconSize: [30, 30],
// // //     });

// // //     function moveToNextCheckpoint() {
// // //       if (currentCheckpointIndex < path.length - 1) {
// // //         const startPoint = path[currentCheckpointIndex];
// // //         const nextPoint = path[currentCheckpointIndex + 1];

// // //         animateVehicleTo(startPoint, nextPoint, () => {
// // //           // Save the completed path for solid line
// // //           setCompletedPath((prev) => [...prev, [startPoint.lat, startPoint.lng]]);

// // //           // Show marker instead of dot at the current checkpoint
// // //           if (currentCheckpointIndex > 0 && currentCheckpointIndex < path.length - 1) {
// // //             const checkpointMarker = checkpointMarkersRef.current[currentCheckpointIndex - 1];
// // //             checkpointMarker.remove(); // Remove the old dot icon

// // //             // Add a new marker in place of the dot icon
// // //             const newCheckpointMarker = L.marker([startPoint.lat, startPoint.lng], { icon: checkpointIcon })
// // //               .addTo(mapRef.current)
// // //               .bindTooltip(`Checkpoint ${currentCheckpointIndex}`, { permanent: true }).openTooltip();

// // //             // Unbind tooltip after a delay
// // //             setTimeout(() => {
// // //               newCheckpointMarker.closeTooltip();
// // //               newCheckpointMarker.unbindTooltip();
// // //             }, 1000);
// // //           }

// // //           currentCheckpointIndex++;
// // //           moveToNextCheckpoint();
// // //         });
// // //       } else {
// // //         // Journey complete, change the route line to solid
// // //         routeLine.setStyle({ dashArray: '' });
// // //         // Draw the completed path line
// // //         if (completedPath.length > 0) {
// // //           L.polyline([...completedPath, [path[path.length - 1].lat, path[path.length - 1].lng]], { color: 'green' }).addTo(mapRef.current);
// // //         }
// // //       }
// // //     }

// // //     moveToNextCheckpoint();
// // //   }

// // //   function animateVehicleTo(start, end, callback) {
// // //     const startPos = L.latLng(start.lat, start.lng);
// // //     const endPos = L.latLng(end.lat, end.lng);
// // //     const deltaLat = (endPos.lat - startPos.lat) / 100;
// // //     const deltaLng = (endPos.lng - startPos.lng) / 100;
// // //     let i = 0;

// // //     function moveStep() {
// // //       i += 1;
// // //       const lat = startPos.lat + deltaLat * i;
// // //       const lng = startPos.lng + deltaLng * i;
// // //       vehicleMarkerRef.current.setLatLng([lat, lng]);

// // //       if (i < 100) {
// // //         requestAnimationFrame(moveStep);
// // //       } else {
// // //         callback();
// // //       }
// // //     }

// // //     moveStep();
// // //   }

// // //   return (
// // //     <div className="flex flex-col w-screen items-center h-screen ">
// // //       <div id="map" className=" h-5/6 w-11/12 border-4  border-blue-500 rounded-lg shadow-lg" />
// // //       <div className="mt-4 flex space-x-2">
// // //         {routes.map((route) => (
// // //           <button
// // //             key={route.id}
// // //             className={`bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 ${
// // //               selectedRoute === route.id ? 'bg-blue-700' : ''
// // //             }`}
// // //             onClick={() => setSelectedRoute(route.id)}
// // //           >
// // //             {route.name}
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default VehicleMap;
// // // import React, { useEffect, useRef, useState } from 'react';
// // // import L from 'leaflet';
// // // import 'leaflet/dist/leaflet.css';

// // // const VehicleMap = () => {
// // //   const mapRef = useRef(null);
// // //   const vehicleMarkersRef = useRef({});
// // //   const routeLines = useRef({});
// // //   const checkpointMarkersRef = useRef({});
// // //   const [activeJourneys, setActiveJourneys] = useState([]);
// // //   const routes = [
// // //     {
// // //       id: 1,
// // //       name: 'Route 1',
// // //       path: [
// // //         { lat: 12.9716, lng: 77.5946 }, // Bangalore
// // //         { lat: 15.3173, lng: 75.7139 }, // Hubli
// // //         { lat: 18.5204, lng: 73.8567 }, // Pune
// // //         { lat: 19.0760, lng: 72.8777 }, // Mumbai
// // //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// // //       ],
// // //     },
// // //     {
// // //       id: 2,
// // //       name: 'Route 2',
// // //       path: [
// // //         { lat: 13.0827, lng: 80.2707 }, // Chennai
// // //         { lat: 16.5062, lng: 80.6480 }, // Vijayawada
// // //         { lat: 19.0760, lng: 72.8777 }, // Mumbai
// // //         { lat: 21.1458, lng: 79.0882 }, // Nagpur
// // //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// // //       ],
// // //     },
// // //     {
// // //       id: 3,
// // //       name: 'Route 3',
// // //       path: [
// // //         { lat: 17.3850, lng: 78.4867 }, // Hyderabad
// // //         { lat: 19.7515, lng: 75.7139 }, // Aurangabad
// // //         { lat: 22.7196, lng: 75.8577 }, // Indore
// // //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// // //         { lat: 25.3176, lng: 82.9739 }, // Varanasi
// // //       ],
// // //     },
// // //     {
// // //       id: 4,
// // //       name: 'Route 4',
// // //       path: [
// // //         { lat: 28.7041, lng: 77.1025 }, // Delhi
// // //         { lat: 27.1767, lng: 78.0081 }, // Agra
// // //         { lat: 26.9124, lng: 75.7873 }, // Jaipur
// // //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// // //         { lat: 21.1458, lng: 79.0882 }, // Nagpur
// // //       ],
// // //     },
// // //   ];
  

// // //   useEffect(() => {
// // //     // Initialize map
// // //     if (!mapRef.current) {
// // //       mapRef.current = L.map('map', { zoomControl: false }).setView([20.5937, 78.9629], 5);
// // //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// // //         attribution: '&copy; OpenStreetMap contributors',
// // //       }).addTo(mapRef.current);
// // //     }

// // //     routes.forEach(route => {
// // //       const path = route.path.map(point => [point.lat, point.lng]);
      
// // //       // Draw polylines for each route and store by route ID
// // //       routeLines.current[route.id] = L.polyline(path, { color: 'blue', dashArray: '5, 5' }).addTo(mapRef.current);
      
// // //       // Add start and destination markers
// // //       L.marker(path[0], { icon: getMarkerIcon('start') }).addTo(mapRef.current);
// // //       L.marker(path[path.length - 1], { icon: getMarkerIcon('destination') }).addTo(mapRef.current);
// // //     });
// // //   }, []);

// // //   function getMarkerIcon(type) {
// // //     const iconUrls = {
// // //       start: 'https://img.icons8.com/fluency/48/000000/marker.png',
// // //       destination: 'https://img.icons8.com/fluency/48/000000/marker.png',
// // //       vehicle: 'https://img.icons8.com/ios-filled/50/car.png',
// // //       checkpoint: 'https://img.icons8.com/color/48/000000/marker.png',
// // //     };
// // //     return L.icon({ iconUrl: iconUrls[type], iconSize: [30, 30] });
// // //   }

// // //   function startJourney(routeId) {
// // //     const route = routes.find(r => r.id === routeId);
// // //     if (!route) return;

// // //     const vehicleId = `${routeId}-${Date.now()}`;
// // //     const initialPosition = route.path[0];

// // //     // Initialize vehicle marker
// // //     vehicleMarkersRef.current[vehicleId] = L.marker(initialPosition, { icon: getMarkerIcon('vehicle') }).addTo(mapRef.current);

// // //     // Initialize checkpoint markers for this route
// // //     checkpointMarkersRef.current[vehicleId] = route.path.slice(1, -1).map(checkpoint => 
// // //       L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current)
// // //     );

// // //     // Add the journey to activeJourneys
// // //     setActiveJourneys(prev => [...prev, { id: vehicleId, route, completedPath: [] }]);

// // //     // Move the vehicle along the path
// // //     moveVehicleAlongRoute(vehicleId, route.path);
// // //   }

// // //   function moveVehicleAlongRoute(vehicleId, path) {
// // //     let currentCheckpointIndex = 0;

// // //     function moveToNextCheckpoint() {
// // //       if (currentCheckpointIndex < path.length - 1) {
// // //         const startPoint = path[currentCheckpointIndex];
// // //         const nextPoint = path[currentCheckpointIndex + 1];

// // //         animateVehicleTo(vehicleId, startPoint, nextPoint, () => {
// // //           // Update the journey's completed path
// // //           setActiveJourneys(prev =>
// // //             prev.map(journey =>
// // //               journey.id === vehicleId
// // //                 ? { ...journey, completedPath: [...journey.completedPath, [startPoint.lat, startPoint.lng]] }
// // //                 : journey
// // //             )
// // //           );

// // //           currentCheckpointIndex++;
// // //           moveToNextCheckpoint();
// // //         });
// // //       } else {
// // //         // Update the route line to a solid line once completed
// // //         if (routeLines.current[path.id]) {
// // //           routeLines.current[path.id].setStyle({ dashArray: '' });
// // //         }
// // //       }
// // //     }

// // //     moveToNextCheckpoint();
// // //   }

// // //   function animateVehicleTo(vehicleId, start, end, callback) {
// // //     const startPos = L.latLng(start.lat, start.lng);
// // //     const endPos = L.latLng(end.lat, end.lng);
// // //     const deltaLat = (endPos.lat - startPos.lat) / 100;
// // //     const deltaLng = (endPos.lng - startPos.lng) / 100;
// // //     let i = 0;

// // //     function moveStep() {
// // //       i += 1;
// // //       const lat = startPos.lat + deltaLat * i;
// // //       const lng = startPos.lng + deltaLng * i;
// // //       vehicleMarkersRef.current[vehicleId].setLatLng([lat, lng]);

// // //       if (i < 100) {
// // //         requestAnimationFrame(moveStep);
// // //       } else {
// // //         callback();
// // //       }
// // //     }

// // //     moveStep();
// // //   }

// // //   return (
// // //     <div className="flex flex-col w-screen items-center h-screen">
// // //       <div id="map" className="h-5/6 w-11/12 border-4 border-blue-500 rounded-lg shadow-lg"></div>
// // //       <div className="mt-4 flex space-x-2">
// // //         {routes.map(route => (
// // //           <button
// // //             key={route.id}
// // //             className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
// // //             onClick={() => startJourney(route.id)}
// // //           >
// // //             Start {route.name}
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default VehicleMap;

// // import React, { useEffect, useRef, useState } from 'react';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';

// // const VehicleMap = () => {
// //   const mapRef = useRef(null);
// //   const vehicleMarkersRef = useRef({});
// //   const routeLines = useRef({});
// //   const checkpointMarkersRef = useRef({});
// //   const [activeJourneys, setActiveJourneys] = useState([]);
// //   const [activeRouteId, setActiveRouteId] = useState(null); // Track active route ID

// //   const routes = [
// //     {
// //       id: 1,
// //       name: 'Route 1',
// //       path: [
// //         { lat: 12.9716, lng: 77.5946 }, // Bangalore
// //         { lat: 15.3173, lng: 75.7139 }, // Hubli
// //         { lat: 18.5204, lng: 73.8567 }, // Pune
// //         { lat: 19.0760, lng: 72.8777 }, // Mumbai
// //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// //       ],
// //     },
// //     {
// //       id: 2,
// //       name: 'Route 2',
// //       path: [
// //         { lat: 13.0827, lng: 80.2707 }, // Chennai
// //         { lat: 16.5062, lng: 80.6480 }, // Vijayawada
// //         { lat: 19.0760, lng: 72.8777 }, // Mumbai
// //         { lat: 21.1458, lng: 79.0882 }, // Nagpur
// //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// //       ],
// //     },
// //     {
// //       id: 3,
// //       name: 'Route 3',
// //       path: [
// //         { lat: 17.3850, lng: 78.4867 }, // Hyderabad
// //         { lat: 19.7515, lng: 75.7139 }, // Aurangabad
// //         { lat: 22.7196, lng: 75.8577 }, // Indore
// //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// //         { lat: 25.3176, lng: 82.9739 }, // Varanasi
// //       ],
// //     },
// //     {
// //       id: 4,
// //       name: 'Route 4',
// //       path: [
// //         { lat: 28.7041, lng: 77.1025 }, // Delhi
// //         { lat: 27.1767, lng: 78.0081 }, // Agra
// //         { lat: 26.9124, lng: 75.7873 }, // Jaipur
// //         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
// //         { lat: 21.1458, lng: 79.0882 }, // Nagpur
// //       ],
// //     },
// //   ];

// //   useEffect(() => {
// //     // Initialize map
// //     if (!mapRef.current) {
// //       mapRef.current = L.map('map', { zoomControl: false }).setView([20.5937, 78.9629], 5);
// //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //         attribution: '&copy; OpenStreetMap contributors',
// //       }).addTo(mapRef.current);
// //     }
// //   }, []);

// //   function getMarkerIcon(type) {
// //     const iconUrls = {
// //       start: 'https://img.icons8.com/fluency/48/000000/marker.png',
// //       destination: 'https://img.icons8.com/fluency/48/000000/marker.png',
// //       vehicle: 'https://img.icons8.com/ios-filled/50/car.png',
// //       checkpoint: 'https://img.icons8.com/color/48/000000/marker.png',
// //     };
// //     return L.icon({ iconUrl: iconUrls[type], iconSize: [30, 30] });
// //   }

// //   function startJourney(routeId) {
// //     const route = routes.find(r => r.id === routeId);
// //     if (!route) return;

// //     // Remove previous route elements if any
// //     clearPreviousRoute();

// //     // Set active route ID
// //     setActiveRouteId(routeId);

// //     const vehicleId = `${routeId}-${Date.now()}`;
// //     const initialPosition = route.path[0];

// //     // Draw the selected route line
// //     const path = route.path.map(point => [point.lat, point.lng]);
// //     routeLines.current[routeId] = L.polyline(path, { color: 'blue', dashArray: '5, 5' }).addTo(mapRef.current);

// //     // Add start and destination markers
// //     L.marker(path[0], { icon: getMarkerIcon('start') }).addTo(mapRef.current);
// //     L.marker(path[path.length - 1], { icon: getMarkerIcon('destination') }).addTo(mapRef.current);

// //     // Initialize vehicle marker
// //     vehicleMarkersRef.current[vehicleId] = L.marker(initialPosition, { icon: getMarkerIcon('vehicle') }).addTo(mapRef.current);

// //     // Initialize checkpoint markers for this route
// //     checkpointMarkersRef.current[vehicleId] = route.path.slice(1, -1).map(checkpoint =>
// //       L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current)
// //     );

// //     // Add the journey to activeJourneys
// //     setActiveJourneys(prev => [...prev, { id: vehicleId, route, completedPath: [] }]);

// //     // Move the vehicle along the path
// //     moveVehicleAlongRoute(vehicleId, route.path);
// //   }

// //   function clearPreviousRoute() {
// //     // Remove previous route lines and markers if any
// //     Object.values(routeLines.current).forEach(line => mapRef.current.removeLayer(line));
// //     Object.values(vehicleMarkersRef.current).forEach(marker => mapRef.current.removeLayer(marker));
// //     Object.values(checkpointMarkersRef.current).forEach(markersArray => 
// //       markersArray.forEach(marker => mapRef.current.removeLayer(marker))
// //     );

// //     // Clear references for previous route
// //     routeLines.current = {};
// //     vehicleMarkersRef.current = {};
// //     checkpointMarkersRef.current = {};
// //   }

// //   function moveVehicleAlongRoute(vehicleId, path) {
// //     let currentCheckpointIndex = 0;

// //     function moveToNextCheckpoint() {
// //       if (currentCheckpointIndex < path.length - 1) {
// //         const startPoint = path[currentCheckpointIndex];
// //         const nextPoint = path[currentCheckpointIndex + 1];

// //         animateVehicleTo(vehicleId, startPoint, nextPoint, () => {
// //           setActiveJourneys(prev =>
// //             prev.map(journey =>
// //               journey.id === vehicleId
// //                 ? { ...journey, completedPath: [...journey.completedPath, [startPoint.lat, startPoint.lng]] }
// //                 : journey
// //             )
// //           );

// //           currentCheckpointIndex++;
// //           moveToNextCheckpoint();
// //         });
// //       } else if (routeLines.current[path.id]) {
// //         routeLines.current[path.id].setStyle({ dashArray: '' });
// //       }
// //     }

// //     moveToNextCheckpoint();
// //   }

// //   function animateVehicleTo(vehicleId, start, end, callback) {
// //     const startPos = L.latLng(start.lat, start.lng);
// //     const endPos = L.latLng(end.lat, end.lng);
// //     const deltaLat = (endPos.lat - startPos.lat) / 100;
// //     const deltaLng = (endPos.lng - startPos.lng) / 100;
// //     let i = 0;

// //     function moveStep() {
// //       i += 1;
// //       const lat = startPos.lat + deltaLat * i;
// //       const lng = startPos.lng + deltaLng * i;
// //       vehicleMarkersRef.current[vehicleId].setLatLng([lat, lng]);

// //       if (i < 100) {
// //         requestAnimationFrame(moveStep);
// //       } else {
// //         callback();
// //       }
// //     }

// //     moveStep();
// //   }

// //   return (
// //     <div className="flex flex-col w-screen items-center h-screen">
// //       <div id="map" className="h-5/6 w-11/12 border-4 border-blue-500 rounded-lg shadow-lg"></div>
// //       <div className="mt-4 flex space-x-2">
// //         {routes.map(route => (
// //           <button
// //             key={route.id}
// //             className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
// //             onClick={() => startJourney(route.id)}
// //           >
// //             Start {route.name}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VehicleMap;


import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const VehicleMap = () => {
  const mapRef = useRef(null);
  const vehicleMarkersRef = useRef({});
  const routeLines = useRef({});
  const checkpointMarkersRef = useRef({});
  const [activeJourneys, setActiveJourneys] = useState([]);
  const [activeRouteId, setActiveRouteId] = useState(null); // Track active route ID

  const routes = [
    {
      id: 1,
      name: 'Route 1',
      path: [
        { lat: 12.9716, lng: 77.5946 }, // Bangalore
        { lat: 15.3173, lng: 75.7139 }, // Hubli
        { lat: 18.5204, lng: 73.8567 }, // Pune
        { lat: 19.0760, lng: 72.8777 }, // Mumbai
        { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
      ],
    },
    {
      id: 2,
      name: 'Route 2',
      path: [
        { lat: 13.0827, lng: 80.2707 }, // Chennai
        { lat: 16.5062, lng: 80.6480 }, // Vijayawada
        { lat: 19.0760, lng: 72.8777 }, // Mumbai
        { lat: 21.1458, lng: 79.0882 }, // Nagpur
        { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
      ],
    },
    {
      id: 3,
      name: 'Route 3',
      path: [
        { lat: 17.3850, lng: 78.4867 }, // Hyderabad
        { lat: 19.7515, lng: 75.7139 }, // Aurangabad
        { lat: 22.7196, lng: 75.8577 }, // Indore
        { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
        { lat: 25.3176, lng: 82.9739 }, // Varanasi
      ],
    },
    {
      id: 4,
      name: 'Route 4',
      path: [
        { lat: 28.7041, lng: 77.1025 }, // Delhi
        { lat: 27.1767, lng: 78.0081 }, // Agra
        { lat: 26.9124, lng: 75.7873 }, // Jaipur
        { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
        { lat: 21.1458, lng: 79.0882 }, // Nagpur
      ],
    },
  ];

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('map', { zoomControl: false }).setView([20.5937, 78.9629], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
      
      // Show Route 1 by default
      startJourney(1);
    }
  }, []);

  function getMarkerIcon(type) {
    const iconUrls = {
      start: 'https://img.icons8.com/fluency/48/000000/marker.png',
      destination: 'https://img.icons8.com/fluency/48/000000/marker.png',
      vehicle: 'https://img.icons8.com/ios-filled/50/car.png',
      checkpoint: 'https://img.icons8.com/color/48/000000/marker.png',
    };
    return L.icon({ iconUrl: iconUrls[type], iconSize: [30, 30] });
  }

  function startJourney(routeId) {
    const route = routes.find(r => r.id === routeId);
    if (!route) return;

    // Remove previous route elements if any
    clearPreviousRoute();

    // Set active route ID
    setActiveRouteId(routeId);

    const vehicleId = `${routeId}-${Date.now()}`;
    const initialPosition = route.path[0];

    // Draw the selected route line
    const path = route.path.map(point => [point.lat, point.lng]);
    routeLines.current[routeId] = L.polyline(path, { color: 'blue', dashArray: '5, 5' }).addTo(mapRef.current);

    // Add start and destination markers
    L.marker(path[0], { icon: getMarkerIcon('start') }).addTo(mapRef.current);
    L.marker(path[path.length - 1], { icon: getMarkerIcon('destination') }).addTo(mapRef.current);

    // Initialize vehicle marker
    vehicleMarkersRef.current[vehicleId] = L.marker(initialPosition, { icon: getMarkerIcon('vehicle') }).addTo(mapRef.current);

    // Initialize checkpoint markers for this route
    checkpointMarkersRef.current[vehicleId] = route.path.slice(1, -1).map(checkpoint =>
      L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current)
    );

    // Add the journey to activeJourneys
    setActiveJourneys(prev => [...prev, { id: vehicleId, route, completedPath: [] }]);

    // Move the vehicle along the path
    moveVehicleAlongRoute(vehicleId, route.path);
  }

  function clearPreviousRoute() {
    // Remove previous route lines and markers if any
    Object.values(routeLines.current).forEach(line => mapRef.current.removeLayer(line));
    Object.values(vehicleMarkersRef.current).forEach(marker => mapRef.current.removeLayer(marker));
    Object.values(checkpointMarkersRef.current).forEach(markersArray => 
      markersArray.forEach(marker => mapRef.current.removeLayer(marker))
    );

    // Clear references for previous route
    routeLines.current = {};
    vehicleMarkersRef.current = {};
    checkpointMarkersRef.current = {};
  }

  function moveVehicleAlongRoute(vehicleId, path) {
    let currentCheckpointIndex = 0;

    function moveToNextCheckpoint() {
      if (currentCheckpointIndex < path.length - 1) {
        const startPoint = path[currentCheckpointIndex];
        const nextPoint = path[currentCheckpointIndex + 1];

        animateVehicleTo(vehicleId, startPoint, nextPoint, () => {
          setActiveJourneys(prev =>
            prev.map(journey =>
              journey.id === vehicleId
                ? { ...journey, completedPath: [...journey.completedPath, [startPoint.lat, startPoint.lng]] }
                : journey
            )
          );

          currentCheckpointIndex++;
          moveToNextCheckpoint();
        });
      } else if (routeLines.current[path.id]) {
        routeLines.current[path.id].setStyle({ dashArray: '' });
      }
    }

    moveToNextCheckpoint();
  }

  function animateVehicleTo(vehicleId, start, end, callback) {
    const startPos = L.latLng(start.lat, start.lng);
    const endPos = L.latLng(end.lat, end.lng);
    const deltaLat = (endPos.lat - startPos.lat) / 100;
    const deltaLng = (endPos.lng - startPos.lng) / 100;
    let i = 0;

    function moveStep() {
      i += 1;
      const lat = startPos.lat + deltaLat * i;
      const lng = startPos.lng + deltaLng * i;
      vehicleMarkersRef.current[vehicleId].setLatLng([lat, lng]);

      if (i < 100) {
        requestAnimationFrame(moveStep);
      } else {
        callback();
      }
    }

    moveStep();
  }

  return (
    <div className="flex flex-col w-screen items-center h-screen">
      <div id="map" className="h-5/6 w-11/12 border-4 border-blue-500 rounded-lg shadow-lg"></div>
      <div className="mt-4 flex space-x-2">
        {routes.map(route => (
          <button
            key={route.id}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
            onClick={() => startJourney(route.id)}
          >
            Start {route.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleMap;


// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const VehicleMap = () => {
//   const mapRef = useRef(null);
//   const vehicleMarkersRef = useRef({});
//   const routeLines = useRef({});
//   const checkpointMarkersRef = useRef({});
//   const [activeJourneys, setActiveJourneys] = useState([]);
//   const [activeRouteId, setActiveRouteId] = useState(null); // Track active route ID

//   const routes = [
//     {
//       id: 1,
//       name: 'Route 1',
//       path: [
//         { lat: 12.9716, lng: 77.5946 }, // Bangalore
//         { lat: 15.3173, lng: 75.7139 }, // Hubli
//         { lat: 18.5204, lng: 73.8567 }, // Pune
//         { lat: 19.0760, lng: 72.8777 }, // Mumbai
//         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
//       ],
//     },
//     {
//       id: 2,
//       name: 'Route 2',
//       path: [
//         { lat: 13.0827, lng: 80.2707 }, // Chennai
//         { lat: 16.5062, lng: 80.6480 }, // Vijayawada
//         { lat: 19.0760, lng: 72.8777 }, // Mumbai
//         { lat: 21.1458, lng: 79.0882 }, // Nagpur
//         { lat: 23.2599, lng: 77.4126 }, // Bhopal (Destination)
//       ],
//     },
//     // Additional routes...
//   ];

//   useEffect(() => {
//     // Initialize map
//     if (!mapRef.current) {
//       mapRef.current = L.map('map', { zoomControl: false }).setView([20.5937, 78.9629], 5);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//       }).addTo(mapRef.current);

//       // Draw only the Route 1 path initially without starting the journey
//       drawRoutePath(1);
//     }
//   }, []);

//   function getMarkerIcon(type) {
//     const iconUrls = {
//       start: 'https://img.icons8.com/fluency/48/000000/marker.png',
//       destination: 'https://img.icons8.com/fluency/48/000000/marker.png',
//       vehicle: 'https://img.icons8.com/ios-filled/50/car.png',
//       checkpoint: 'https://img.icons8.com/color/48/000000/marker.png',
//     };
//     return L.icon({ iconUrl: iconUrls[type], iconSize: [30, 30] });
//   }

//   function drawRoutePath(routeId) {
//     const route = routes.find(r => r.id === routeId);
//     if (!route) return;

//     // Clear previous route paths if any
//     clearPreviousRoute();

//     // Draw the selected route line
//     const path = route.path.map(point => [point.lat, point.lng]);
//     routeLines.current[routeId] = L.polyline(path, { color: 'blue', dashArray: '5, 5' }).addTo(mapRef.current);

//     // Add start and destination markers
//     L.marker(path[0], { icon: getMarkerIcon('start') }).addTo(mapRef.current);
//     L.marker(path[path.length - 1], { icon: getMarkerIcon('destination') }).addTo(mapRef.current);
//   }

//   function startJourney(routeId) {
//     const route = routes.find(r => r.id === routeId);
//     if (!route) return;

//     // Set active route ID and initialize vehicle journey
//     setActiveRouteId(routeId);
//     const vehicleId = `${routeId}-${Date.now()}`;
//     const initialPosition = route.path[0];

//     // Initialize vehicle marker
//     vehicleMarkersRef.current[vehicleId] = L.marker(initialPosition, { icon: getMarkerIcon('vehicle') }).addTo(mapRef.current);

//     // Initialize checkpoint markers for this route
//     checkpointMarkersRef.current[vehicleId] = route.path.slice(1, -1).map(checkpoint =>
//       L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current)
//     );

//     // Add the journey to activeJourneys
//     setActiveJourneys(prev => [...prev, { id: vehicleId, route, completedPath: [] }]);

//     // Move the vehicle along the path
//     moveVehicleAlongRoute(vehicleId, route.path);
//   }

//   function clearPreviousRoute() {
//     // Remove previous route lines and markers if any
//     Object.values(routeLines.current).forEach(line => mapRef.current.removeLayer(line));
//     Object.values(vehicleMarkersRef.current).forEach(marker => mapRef.current.removeLayer(marker));
//     Object.values(checkpointMarkersRef.current).forEach(markersArray =>
//       markersArray.forEach(marker => mapRef.current.removeLayer(marker))
//     );

//     // Clear references for previous route
//     routeLines.current = {};
//     vehicleMarkersRef.current = {};
//     checkpointMarkersRef.current = {};
//   }

//   function moveVehicleAlongRoute(vehicleId, path) {
//     let currentCheckpointIndex = 0;

//     function moveToNextCheckpoint() {
//       if (currentCheckpointIndex < path.length - 1) {
//         const startPoint = path[currentCheckpointIndex];
//         const nextPoint = path[currentCheckpointIndex + 1];

//         animateVehicleTo(vehicleId, startPoint, nextPoint, () => {
//           setActiveJourneys(prev =>
//             prev.map(journey =>
//               journey.id === vehicleId
//                 ? { ...journey, completedPath: [...journey.completedPath, [startPoint.lat, startPoint.lng]] }
//                 : journey
//             )
//           );

//           currentCheckpointIndex++;
//           moveToNextCheckpoint();
//         });
//       } else if (routeLines.current[path.id]) {
//         routeLines.current[path.id].setStyle({ dashArray: '' });
//       }
//     }

//     moveToNextCheckpoint();
//   }

//   function animateVehicleTo(vehicleId, start, end, callback) {
//     const startPos = L.latLng(start.lat, start.lng);
//     const endPos = L.latLng(end.lat, end.lng);
//     const deltaLat = (endPos.lat - startPos.lat) / 100;
//     const deltaLng = (endPos.lng - startPos.lng) / 100;
//     let i = 0;

//     function moveStep() {
//       i += 1;
//       const lat = startPos.lat + deltaLat * i;
//       const lng = startPos.lng + deltaLng * i;
//       vehicleMarkersRef.current[vehicleId].setLatLng([lat, lng]);

//       if (i < 100) {
//         requestAnimationFrame(moveStep);
//       } else {
//         callback();
//       }
//     }

//     moveStep();
//   }

//   return (
//     <div className="flex flex-col w-screen items-center h-screen">
//       <div id="map" className="h-5/6 w-11/12 border-4 border-blue-500 rounded-lg shadow-lg"></div>
//       <div className="mt-4 flex space-x-2">
//         {routes.map(route => (
//           <button
//             key={route.id}
//             className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
//             onClick={() => startJourney(route.id)}
//           >
//             Start {route.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VehicleMap;
