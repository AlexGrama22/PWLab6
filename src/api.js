import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; 
const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";


const getAuthToken = () => localStorage.getItem('token');

// Axios instance for Unsplash
const unsplashAPI = axios.create({
    baseURL: UNSPLASH_BASE_URL,
    headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    }
});


const customAPI = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


customAPI.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Search images from Unsplash
export const searchImages = async (term, page) => {
    try {
        const response = await unsplashAPI.get("/", {
            params: { query: term, per_page: 30, page: page }
        });
        return response.data.results; // Make sure to return the results
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
};



export const fetchUserData = async () => {
    try {
        const response = await customAPI.get("/user-data");
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch data: ' + response.status);
        }
    } catch (error) {
        console.error("API call error: ", error.message);
        throw error;  
    }
};


export default {
    searchImages,
    fetchUserData
};
