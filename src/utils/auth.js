import axios from 'axios';

// Check if user is authenticated
 const isAuthenticated = () => {
    const token = sessionStorage.getItem('authToken');
    const user = sessionStorage.getItem('user');
    return !!token && !!user;
};

// Get the authentication token
 const getToken = () => {
    return sessionStorage.getItem('authToken');
};

// Get the user data
 const getUser = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Set authentication data
 const setAuth = (token, user) => {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    // Set default authorization header for all future axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear authentication data (logout)
 const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
};

// Check if token is expired (if you're using JWT)
 const isTokenExpired = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp < Date.now() / 1000;
    } catch (error) {
        return true;
    }
};

// Initialize axios auth header if token exists
 const initializeAuth = () => {
    const token = getToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}; 
export {isAuthenticated, initializeAuth,isTokenExpired,logout,setAuth,getUser,getToken}