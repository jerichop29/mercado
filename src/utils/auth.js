import axios from 'axios';

// Check if user is authenticated
 const isAuthenticated = () => {
    const token = sessionStorage.getItem('authToken');
    const user = sessionStorage.getItem('user');
    const role = sessionStorage.getItem('role')
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

function hashData(data) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(data)).then((hashBuffer) => {
        return Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    });
}

async function storeHashedData(user, role) {
    const userHash = await hashData(user);
    const roleHash = await hashData(role);

    sessionStorage.setItem("user", userHash);
    sessionStorage.setItem("role", roleHash);
}

// Set authentication data
 const setAuth = (token, user , role) => {
    sessionStorage.setItem('authToken', token);
    storeHashedData(JSON.stringify(user),JSON.stringify(role));
    // Set default authorization header for all future axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear authentication data (logout)
 const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
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
async function verifyData(input, storedHash) {
    const inputHash = await hashData(input);
    return inputHash === storedHash;
};

// Example Usage
async function checkUser(inputUser, inputRole) {
    const storedUserHash = sessionStorage.getItem("user");
    const storedRoleHash = sessionStorage.getItem("role");

    const isUserValid = await verifyData(inputUser, storedUserHash);
    const isRoleValid = await verifyData(inputRole, storedRoleHash);

    if (isUserValid && isRoleValid) {
        console.log("User verification successful!");
    } else {
        console.log("Verification failed.");
    }
};

export {isAuthenticated, initializeAuth,isTokenExpired,logout,setAuth,getUser,getToken}