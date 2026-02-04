/**
 * HSD Agency API Configuration
 * 
 * BACKEND TEAM: Link your API calls here.
 * The BASE_URL should point to your running backend server (e.g., Python/Node.js).
 */

export const BASE_URL = 'http://localhost:5000';

export const endpoints = {
    login: `${BASE_URL}/auth/login`,
    agencies: `${BASE_URL}/agencies`,
    services: `${BASE_URL}/services`,
    // Add more endpoints here as needed
};

/**
 * Mock API Call helper
 * Use this to simulate backend responses until the real API is ready.
 */
export const mockApiCall = async (data, delay = 800) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};
