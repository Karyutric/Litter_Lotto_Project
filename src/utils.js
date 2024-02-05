export const sendDataToServer = async ({image_url, material_tag, latitude, longitude}) => {
  const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage

  try {
    const response = await fetch('https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/create_image_location/', {
      method: 'POST',
      headers: {
        // Include the token in the Authorization header
        'Authorization': `Bearer ${token}`
        // Don't set the Content-Type header, let the browser set it for FormData
      },
      body: data,  // data is FormData
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

  

  