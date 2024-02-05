export const sendDataToServer = async ({image_url, material_tag, latitude, longitude}) => {
  const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage

  try {
    // Assuming your backend expects a JSON payload
    const response = await fetch('https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/create_image_location/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Since we're sending JSON now
      },
      body: JSON.stringify({
        image_url, // URL from Firebase
        material_tag,
        latitude,
        longitude,
      }),
    });

    if (!response.ok) {
      // Retrieve and log the response body for more details
      const errorBody = await response.json(); // Assuming error response is also in JSON
      console.error(`HTTP error! status: ${response.status}, body: ${errorBody.detail || errorBody}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Assuming you want to parse and return the JSON response
  } catch (error) {
    console.error('Error sending data:', error);
    throw error; // Rethrow or handle error appropriately
  }
};

  

  