import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteSensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all sensor data
    axios.get("http://localhost:3000/api/sensor-data")
      .then(response => {
        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setSensorData(response.data);
        } else {
            console.log(response.data)
          console.error('Unexpected response data format:', response.data);
          setMessage('Error fetching sensor data.');
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('API error response:', error.response.data);
          setMessage(`Error: ${error.response.data.message || 'An error occurred'}`);
        } else {
          console.error('Error:', error.message);
          setMessage('Error fetching sensor data.');
        }
      });
      
  }, []);

  const handleDelete = async () => {
    if (selectedSensor) {
      try {
        await axios.delete("http://localhost:3000/api/sensor-data", { data: { serial_number: selectedSensor } });
        setMessage('Sensor data deleted successfully.');
        setSensorData(sensorData.filter(sensor => sensor.serial_number !== selectedSensor));
      } catch (error) {
        setMessage('Error deleting sensor data.');
        console.error('Error deleting sensor data:', error);
      }
    } else {
      setMessage('Please select a sensor to delete.');
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-12 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
       <h1 className="text-2xl font-bold text-white mb-6 text-center">Delete Sensor Data</h1>
      <label className="text-gray-300 text-sm mb-1 capitalize">Select Sensor to Delete:</label>
      <select
        value={selectedSensor}
        onChange={(e) => setSelectedSensor(e.target.value)}
        required
        className="w-full hover:scale-105 px-3 py-2 bg-gray-200 border text-gray-400 border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
      >
        <option value="">Select Sensor</option>
        {Array.isArray(sensorData) && sensorData.map(sensor => (
          <option key={sensor.serial_number} value={sensor.serial_number}>
            {sensor.serial_number}
          </option>
        ))}
      </select>
      <button onClick={handleDelete} className="w-full hover:scale-105 bg-gray-500 text-white py-2 px-4 mt-4 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
        Delete Sensor
      </button>
      {message && <p className="mt-4 text-center text-sm text-gray-300">{message}</p>}
    </div>
  );
};

export default DeleteSensorData;