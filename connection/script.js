document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container'); // HTML element to display data

    // Function to fetch IoT data from the backend
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data'); // Replace with your backend URL
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            // Display fetched data in the HTML container
            dataContainer.innerHTML = ''; // Clear previous data
            data.forEach(entry => {
                const div = document.createElement('div');
                div.textContent = `Sensor: ${entry.sensorName}, Value: ${entry.value}`;
                dataContainer.appendChild(div);
            });
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const socket = io(); // Establish a connection to the Socket.IO server (assumes the server is running on the same host)

// Example: Sending data from the client to the server
socket.emit('clientEvent', 'Hello Server, this is the client.');

// Example: Receiving data from the server
socket.on('welcome', (message) => {
    console.log('Received message from server:', message);
});


    // Fetch data when the page loads
    fetchData();

    // Optionally, set an interval to fetch data at regular intervals
    setInterval(fetchData, 5000); // Fetch data every 5 seconds as an example
});
