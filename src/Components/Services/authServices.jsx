// Base URL for the API endpoints
const API_URL = "http://86.185.79.60:8000/image_capture/";

// Function to register a new user
export const register = async (userData) => {
    // Perform a POST request to the register endpoint with user data
    const response = await fetch(API_URL + 'register/', {
        method: 'POST', // HTTP method
        headers: {'Content-Type': 'application/json'}, // Content type header to indicate JSON data
        body: JSON.stringify(userData) // Convert userData object to JSON string
    });

    // Check if the response is not OK (i.e., status code outside the range 200-299)
    if (!response.ok) {
        const errorData = await response.text(); // Attempt to read the response text
        // Throw an error with the response status and error data
        throw new Error(`Error: ${response.status}, ${errorData}`);
    }

    // If the response is OK, parse the JSON body of the response and return it
    return response.json(); 
};

// Function to log in an existing user
export const login = async (userData) => {
    // Perform a POST request to the login endpoint with user data
    const response = await fetch(API_URL + 'login/', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(userData) 
    });
    
    return response;
};
