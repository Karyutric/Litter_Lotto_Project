const API_URL = "http://86.173.58.38:8000/image_capture/";

export const register = async (userData) => {
    const response = await fetch(API_URL + 'register/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error: ${response.status}, ${errorData}`);
    }

    return response.json(); 
};

export const login = async (userData) => {
    const response = await fetch(API_URL + 'login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    
    return response;
};
