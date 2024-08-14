import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Grid, Card, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import './Map.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const generateNearbyCoordinates = (lat, lng) => {
  const branches = [];
  for (let i = 0; i < 3; i++) {
    const offsetLat = (Math.random() - 0.5) * 0.05; 
    const offsetLng = (Math.random() - 0.5) * 0.05;
    branches.push({ name: `Branch ${String.fromCharCode(65 + i)}`, lat: lat + offsetLat, lng: lng + offsetLng });
  }
  return branches;
};

const MapComponent = () => {
  const [position, setPosition] = useState(null);
  const [location, setLocation] = useState('');
  const [manualLocation, setManualLocation] = useState(null);
  const [nearbyBranches, setNearbyBranches] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error getting location:', error);
        setPosition([51.505, -0.09]); 
      }
    );
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = async () => {
    try {
      const apiKey = '66a18f348a6c42d983b63c6cf90a1562'; 
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`);
      
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setManualLocation([lat, lng]);
        setPosition([lat, lng]);

        const nearby = generateNearbyCoordinates(lat, lng);
        setNearbyBranches(nearby);
      } else {
        alert('Location not found. Please enter a valid place name.');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      alert('Error fetching location data. Please try again.');
    }
  };

  return (
    <Box className="map-wrapper" sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center" style={{borderRadius:'15px'}}>
        <Grid item xs={12} sm={4}>
            <Box className="location-input" sx={{ textAlign: 'center', p: 2 }}>
              <p style={{fontWeight:'bolder'}}>Locate our Nearby Branches</p>
              <TextField
                label="Enter your location"
                variant="outlined"
                value={location}
                onChange={handleLocationChange}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLocationSubmit}
                sx={{ marginTop: '10px' }}
              >
                Locate Branches Near You
              </Button>
            </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card className="map-card">
            {position ? (
              <MapContainer center={position} zoom={13} style={{ height: '50vh', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    {manualLocation ? `Location: ${location}` : 'You are here!'}
                  </Popup>
                </Marker>
                {nearbyBranches.map((branch, index) => (
                  <Marker
                    key={index}
                    position={[branch.lat, branch.lng]}
                    icon={L.icon({
                      iconUrl: require('leaflet/dist/images/marker-icon.png'),
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })}
                  >
                    <Popup>
                      {branch.name}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <p>Loading map...</p>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MapComponent;
