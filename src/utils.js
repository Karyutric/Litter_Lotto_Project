// Define an asynchronous function to send form data to the server
export const sendDataToServer = async (formData) => {
    // Retrieve the access token from local storage to use for authorization
    const token = localStorage.getItem('accessToken'); 
    // Base URL of the server where the API endpoint is located
    const serverBaseUrl = 'http://86.185.79.60:8000';
  
    try {
        // Perform an asynchronous POST request to the server with the provided form data
        const response = await fetch(`${serverBaseUrl}/image_capture/create_image_location/`, {
            method: 'POST', // Specify the request method
            headers: {
                // Authorization header with Bearer token for secure access
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // The form data to be sent in the request
        });
  
        if (!response.ok) {
          // Check if the server response indicates an error and handle it
          try {
              // Attempt to parse the response body as JSON to get detailed error information
              const errorBody = await response.json();
              console.error(`HTTP error! status: ${response.status}, body: `, errorBody);
              // Throw a detailed error message including the status and error body
              throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorBody)}`);
          } catch (parseError) {
              // Handle cases where the error response cannot be parsed as JSON
              console.error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
              throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
          }
      }
  
      // If the request was successful, parse the JSON response and return it
      return await response.json(); 
  } catch (error) {
      // Log and re-throw any errors encountered during the request or error handling
      console.error('Error sending data:', error);
      throw error;
  }
  };
  