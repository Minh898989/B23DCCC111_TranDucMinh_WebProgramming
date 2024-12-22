import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const MapModal = ({ selectedLocation, setSelectedLocation, setLocationText, setIsMapOpen }) => {
  // Update the map with the selected location on click
  const LocationUpdater = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setSelectedLocation({ lat, lng });
      },
    });
    return null;
  };

  // Handle location confirmation and update the location text
  const handleConfirmLocation = async () => {
    const address = await getAddressFromCoordinates(selectedLocation.lat, selectedLocation.lng);
    setLocationText(`Vị trí: ${address}`);
    setIsMapOpen(false); // Close the map modal after selecting a location
  };

  // Fetch address from latitude and longitude using OpenStreetMap API
  const getAddressFromCoordinates = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await response.json();
    return data.display_name.split(',').slice(0, -2).join(', ');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <MapContainer center={selectedLocation} zoom={15} style={{ width: '100%', height: '300px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationUpdater />
          <Marker position={selectedLocation}>
            <Popup>Vị trí của bạn: {selectedLocation.lat}, {selectedLocation.lng}</Popup>
          </Marker>
        </MapContainer>
        <div className="modal-actions">
          <button onClick={handleConfirmLocation} className="confirm-button">Xác nhận</button>
          <button onClick={() => setIsMapOpen(false)} className="cancel-button">Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
