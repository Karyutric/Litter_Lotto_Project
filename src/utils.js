export const sendDataToServer = async (data) => {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  