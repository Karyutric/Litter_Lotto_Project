export const sendDataToServer = async (formData) => {
  const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
  const serverBaseUrl = 'http://86.174.135.135:8000';

  try {
      const response = await fetch(`${serverBaseUrl}/image_capture/create_image_location/`, {
          method: 'POST',
          headers: {
              // 'Content-Type' header is not needed; it will be set automatically when sending FormData
              'Authorization': `Bearer ${token}`,
          },
          body: formData,
      });

      if (!response.ok) {
        // Attempt to parse the error body for detailed error message
        try {
            const errorBody = await response.json(); // Attempt to parse JSON error response
            console.error(`HTTP error! status: ${response.status}, body: `, errorBody);
            throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorBody)}`);
        } catch (parseError) {
            // If parsing fails, log the original response status and statusText
            console.error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
            throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
        }
    }

    return await response.json(); // Parse and return the successful JSON response
} catch (error) {
    console.error('Error sending data:', error);
    throw error; // Re-throw to be handled by caller
}
};


  

  