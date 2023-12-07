// utils.js
// utils.js
export const sendDataToServer = async (data) => {
  try {
      const response = await fetch('/image_capture/create_image_location/', {
          method: 'POST',
          body: data,  // data is FormData, not JSON
          // Don't set the Content-Type header
      });

      if (!response.ok) {
          console.error('Error sending data:', response.statusText);
      }
      return response;
  } catch (error) {
      console.error('Error:', error);
  }
};


  