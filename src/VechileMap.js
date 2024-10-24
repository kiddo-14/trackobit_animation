// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const VehicleMap = () => {
//   const mapRef = useRef(null); // To keep track of the map instance
//   let completedPathLine = null; // Store the green completed path line

//   useEffect(() => {
//     if (mapRef.current !== null) return; // Prevent reinitialization if the map is already created

//     // Initialize the map and set its view to the starting position
//     mapRef.current = L.map('map', { zoomControl: false }).setView([20.5937, 78.9629], 5); // Disable default zoom controls

//     // Load and display OpenStreetMap tiles
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(mapRef.current);

//     // Custom icons for different types of markers with adjusted sizes
//     const startIcon = L.icon({
//       iconUrl: 'https://img.icons8.com/fluency/48/000000/marker.png',
//       iconSize: [30, 30], // Adjusted icon size
//     });

//     const checkpointIcon = L.icon({
//       iconUrl: 'https://img.icons8.com/color/48/000000/marker.png',
//       iconSize: [30, 30], // Adjusted icon size
//     });

//     const destinationIcon = L.icon({
//       iconUrl: 'https://img.icons8.com/fluency/48/000000/marker.png',
//       iconSize: [30, 30], // Adjusted icon size
//     });

//     const vehicleIcon = L.icon({
//       iconUrl: 'https://img.icons8.com/ios-filled/50/car.png',
//       iconSize: [30, 30], // Adjusted icon size
//     });

//     // Coordinates for start, checkpoints, and destination
//     const locations = {
//       start: { lat: 17.3850, lng: 78.4867 }, // Hyderabad
//       checkpoints: [
//         { lat: 21.1458, lng: 79.0882 }, // Nagpur
//         { lat: 23.2599, lng: 77.4126 }, // Bhopal
//         { lat: 28.6139, lng: 77.2090 }, // Delhi
//       ],
//       destination: { lat: 28.0622, lng: 73.6301 }, // Nohar
//     };

//     // Add a marker for the starting point with a blue icon
//     L.marker([locations.start.lat, locations.start.lng], { icon: startIcon }).addTo(mapRef.current);

//     // Create checkpoints as circle markers initially
//     const checkpointMarkers = locations.checkpoints.map((checkpoint) =>
//       L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current)
//     );

//     // Add a marker for the destination with a red icon
//     L.marker([locations.destination.lat, locations.destination.lng], { icon: destinationIcon }).addTo(mapRef.current);

//     // Add a marker for the vehicle at the starting position
//     const vehicleMarker = L.marker([locations.start.lat, locations.start.lng], { icon: vehicleIcon }).addTo(mapRef.current);

//     let currentCheckpointIndex = 0;
//     const completePath = [];
//     const allPath = [
//       [locations.start.lat, locations.start.lng],
//       ...locations.checkpoints.map((cp) => [cp.lat, cp.lng]),
//       [locations.destination.lat, locations.destination.lng],
//     ];

//     const journeyLine = L.polyline(allPath, { color: 'orange', dashArray: '5, 5' }).addTo(mapRef.current);

//     function moveVehicle() {
//       const pathPoints = [
//         locations.start,
//         ...locations.checkpoints,
//         locations.destination,
//       ];

//       function moveToNextCheckpoint() {
//         if (currentCheckpointIndex < pathPoints.length) {
//           const nextPoint = pathPoints[currentCheckpointIndex];
//           animateVehicleTo(nextPoint, () => {
//             completePath.push(nextPoint);

//             if (currentCheckpointIndex > 0 && currentCheckpointIndex <= locations.checkpoints.length) {
//               checkpointMarkers[currentCheckpointIndex - 1].remove();
//               const checkpointMarker = L.marker([nextPoint.lat, nextPoint.lng], { icon: checkpointIcon }).addTo(mapRef.current);
//               checkpointMarker.bindTooltip(`${currentCheckpointIndex}`, { permanent: true }).openTooltip();

//               setTimeout(() => {
//                 checkpointMarker.closeTooltip();
//                 checkpointMarker.unbindTooltip();
//               }, 1000);
//             }

//             currentCheckpointIndex++;
//             updatePaths();
//             setTimeout(moveToNextCheckpoint, 1000);
//           });
//         } else {
//           resetJourney();
//         }
//       }

//       moveToNextCheckpoint();
//     }

//     function animateVehicleTo(destination, callback) {
//       const startPos = vehicleMarker.getLatLng();
//       const endPos = L.latLng(destination.lat, destination.lng);
//       const deltaLat = (endPos.lat - startPos.lat) / 100;
//       const deltaLng = (endPos.lng - startPos.lng) / 100;
//       let i = 0;

//       function moveStep() {
//         i += 1;
//         const lat = startPos.lat + deltaLat * i;
//         const lng = startPos.lng + deltaLng * i;
//         const nextPos = L.latLng(lat, lng);
//         vehicleMarker.setLatLng(nextPos);

//         if (i < 100) {
//           requestAnimationFrame(moveStep);
//         } else {
//           callback();
//         }
//       }

//       moveStep();
//     }

//     function updatePaths() {
//       // Remove the old green line if it exists
//       if (completedPathLine) {
//         mapRef.current.removeLayer(completedPathLine);
//       }

//       // Draw the new completed journey path in green
//       if (completePath.length > 0) {
//         completedPathLine = L.polyline(completePath, { color: 'green' }).addTo(mapRef.current);
//       }

//       // If all journey is completed, update journey line to solid
//       if (currentCheckpointIndex >= locations.checkpoints.length + 1) {
//         journeyLine.setStyle({ dashArray: '' });
//         L.marker([locations.destination.lat, locations.destination.lng]).openPopup();
//       }
//     }

//     function resetJourney() {
//       currentCheckpointIndex = 0; // Reset to start
//       vehicleMarker.setLatLng([locations.start.lat, locations.start.lng]); // Reset vehicle position
//       completePath.length = 0; // Clear completed path

//       // Remove the green solid line if it exists
//       if (completedPathLine) {
//         mapRef.current.removeLayer(completedPathLine);
//         completedPathLine = null;
//       }

//       // Reset journey line to dashed and redraw it
//       journeyLine.setStyle({ dashArray: '5, 5' }); // Set journey line to dashed
//       journeyLine.setLatLngs(allPath); // Reset the line to the full journey path

//       // Reset checkpoints to dots
//       checkpointMarkers.forEach(dot => dot.addTo(mapRef.current));

//       // Start the journey again after a short delay
//       setTimeout(moveVehicle, 1000); // Wait before starting again
//     }

//     moveVehicle();
//   }, []);

//   return (
//     <div className="flex flex-col justify-center items-center h-screen space-y-4">
//       {/* Map Container */}
//       <div id="map" className="h-80 w-80 border-4 border-blue-500 rounded-lg shadow-lg" />

//       {/* Custom Zoom Controls */}
//       <div className="flex space-x-2">
//         <button
//           className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
//           onClick={() => mapRef.current.zoomIn()}
//         >
//           Zoom In
//         </button>
//         <button
//           className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
//           onClick={() => mapRef.current.zoomOut()}
//         >
//           Zoom Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VehicleMap;
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const VehicleMap = () => {
  const mapRef = useRef(null);
  const vehicleMarkerRef = useRef(null);
  const routeLines = useRef([]);
  const checkpointMarkersRef = useRef([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [completedPath, setCompletedPath] = useState([]); // To store completed path

  const routes = [
    {
      id: 1,
      name: 'Route 1',
      path: [
        { lat: 17.3850, lng: 78.4867 }, // Hyderabad
        { lat: 21.1458, lng: 79.0882 }, // Nagpur
        { lat: 23.2599, lng: 77.4126 }, // Bhopal
        { lat: 28.6139, lng: 77.2090 }, // Delhi
        { lat: 28.0622, lng: 73.6301 }, // Nohar (Destination)
      ],
    },
    {
      id: 2,
      name: 'Route 2',
      path: [
        { lat: 17.3850, lng: 78.4867 }, // Hyderabad
        { lat: 19.0760, lng: 72.8777 }, // Mumbai
        { lat: 24.5854, lng: 73.7125 }, // Udaipur
        { lat: 28.6139, lng: 77.2090 }, // Delhi
        { lat: 28.0622, lng: 73.6301 }, // Nohar (Destination)
      ],
    },
    {
      id: 3,
      name: 'Route 3',
      path: [
        { lat: 17.3850, lng: 78.4867 }, // Hyderabad
        { lat: 18.5204, lng: 73.8567 }, // Pune
        { lat: 26.9124, lng: 75.7873 }, // Jaipur
        { lat: 28.7041, lng: 77.1025 }, // Delhi
        { lat: 28.0622, lng: 73.6301 }, // Nohar (Destination)
      ],
    },
  ];

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('map', { zoomControl: false }).setView([20.5937, 78.9629], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Define custom icons
    const startIcon = L.icon({
      iconUrl: 'https://img.icons8.com/fluency/48/000000/marker.png',
      iconSize: [30, 30],
    });

    const destinationIcon = L.icon({
      iconUrl: 'https://img.icons8.com/fluency/48/000000/marker.png',
      iconSize: [30, 30],
    });

    const vehicleIcon = L.icon({
      iconUrl: 'https://img.icons8.com/ios-filled/50/car.png',
      iconSize: [30, 30],
    });

    // Show all routes by default
    routes.forEach((route) => {
      const path = route.path.map((point) => [point.lat, point.lng]);
      const polyline = L.polyline(path, { color: 'blue', dashArray: '5, 5' }).addTo(mapRef.current);
      routeLines.current.push(polyline);

      // Add markers for start and destination
      L.marker([route.path[0].lat, route.path[0].lng], { icon: startIcon })
        .addTo(mapRef.current)
        .bindTooltip("Start")
        .openTooltip();
      L.marker([route.path[route.path.length - 1].lat, route.path[route.path.length - 1].lng], { icon: destinationIcon })
        .addTo(mapRef.current)
        // .bindTooltip("Destination", { permanent: true })
        .openTooltip();
    });

    // Initialize vehicle marker
    if (!vehicleMarkerRef.current) {
      vehicleMarkerRef.current = L.marker([17.3850, 78.4867], { icon: vehicleIcon }).addTo(mapRef.current);
    }

    // Automatically select the first route and show checkpoints
    // setSelectedRoute(1); // Select the first route by default

    // Draw the checkpoints for the default selected route
    const defaultRoute = routes.find((r) => r.id === 1);
    if (defaultRoute) {
      drawCheckpoints(defaultRoute.path);
    }
  }, []);

  useEffect(() => {
    if (selectedRoute !== null) {
      clearPreviousRoute(); // Clear previously drawn routes and markers

      const route = routes.find((r) => r.id === selectedRoute);
      if (route) {
        const path = route.path.map((point) => [point.lat, point.lng]);

        // Create checkpoints as circle markers initially
        checkpointMarkersRef.current = route.path.slice(1, -1).map((checkpoint) => {
          const marker = L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current);
          return marker;
        });

        // Draw the route with a dashed line
        const routeLine = L.polyline(path, { color: 'orange', dashArray: '5, 5' }).addTo(mapRef.current);

        // Start vehicle movement along the selected route
        moveVehicleAlongRoute(route.path, routeLine);
      }
    }
  }, [selectedRoute]);

  function clearPreviousRoute() {
    // Remove previously drawn polylines
    routeLines.current.forEach((line) => mapRef.current.removeLayer(line));
    routeLines.current = [];

    // Remove previous checkpoint markers
    checkpointMarkersRef.current.forEach((marker) => mapRef.current.removeLayer(marker));
    checkpointMarkersRef.current = [];
    
    // Clear the completed path for a new route
    setCompletedPath([]);
  }

  function drawCheckpoints(path) {
    // Draw checkpoints as circle markers
    checkpointMarkersRef.current = path.slice(1, -1).map((checkpoint) => {
      const marker = L.circleMarker([checkpoint.lat, checkpoint.lng], { radius: 5, color: 'orange' }).addTo(mapRef.current);
      return marker;
    });
  }

  function moveVehicleAlongRoute(path, routeLine) {
    let currentCheckpointIndex = 0;
    const checkpointIcon = L.icon({
      iconUrl: 'https://img.icons8.com/color/48/000000/marker.png',
      iconSize: [30, 30],
    });

    function moveToNextCheckpoint() {
      if (currentCheckpointIndex < path.length - 1) {
        const startPoint = path[currentCheckpointIndex];
        const nextPoint = path[currentCheckpointIndex + 1];

        animateVehicleTo(startPoint, nextPoint, () => {
          // Save the completed path for solid line
          setCompletedPath((prev) => [...prev, [startPoint.lat, startPoint.lng]]);

          // Show marker instead of dot at the current checkpoint
          if (currentCheckpointIndex > 0 && currentCheckpointIndex < path.length - 1) {
            const checkpointMarker = checkpointMarkersRef.current[currentCheckpointIndex - 1];
            checkpointMarker.remove(); // Remove the old dot icon

            // Add a new marker in place of the dot icon
            const newCheckpointMarker = L.marker([startPoint.lat, startPoint.lng], { icon: checkpointIcon })
              .addTo(mapRef.current)
              .bindTooltip(`Checkpoint ${currentCheckpointIndex}`, { permanent: true }).openTooltip();

            // Unbind tooltip after a delay
            setTimeout(() => {
              newCheckpointMarker.closeTooltip();
              newCheckpointMarker.unbindTooltip();
            }, 1000);
          }

          currentCheckpointIndex++;
          moveToNextCheckpoint();
        });
      } else {
        // Journey complete, change the route line to solid
        routeLine.setStyle({ dashArray: '' });
        // Draw the completed path line
        if (completedPath.length > 0) {
          L.polyline([...completedPath, [path[path.length - 1].lat, path[path.length - 1].lng]], { color: 'green' }).addTo(mapRef.current);
        }
      }
    }

    moveToNextCheckpoint();
  }

  function animateVehicleTo(start, end, callback) {
    const startPos = L.latLng(start.lat, start.lng);
    const endPos = L.latLng(end.lat, end.lng);
    const deltaLat = (endPos.lat - startPos.lat) / 100;
    const deltaLng = (endPos.lng - startPos.lng) / 100;
    let i = 0;

    function moveStep() {
      i += 1;
      const lat = startPos.lat + deltaLat * i;
      const lng = startPos.lng + deltaLng * i;
      vehicleMarkerRef.current.setLatLng([lat, lng]);

      if (i < 100) {
        requestAnimationFrame(moveStep);
      } else {
        callback();
      }
    }

    moveStep();
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div id="map" className="h-80 w-80 border-4 border-blue-500 rounded-lg shadow-lg" />
      <div className="flex space-x-2">
        {routes.map((route) => (
          <button
            key={route.id}
            className={`bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 ${
              selectedRoute === route.id ? 'bg-blue-700' : ''
            }`}
            onClick={() => setSelectedRoute(route.id)}
          >
            {route.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleMap;
