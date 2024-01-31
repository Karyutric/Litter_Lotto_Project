const API_URL = "https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/";

export const sendDataToServer = async (data) => {
    const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
  
    try {
      const response = await fetch(API_URL + 'create_image_location/', {
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
        const errorBody = await response.text(); // or response.json() if the response is in JSON format
        console.error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  