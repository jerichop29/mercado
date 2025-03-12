import axios from 'axios';

const SESSION_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes

// Get current timestamp
const getCurrentTimestamp = () => Date.now();

// Check if user is authenticated
const isAuthenticated = () => {
    const token = sessionStorage.getItem('authToken');
    const user = sessionStorage.getItem('user');
    const expiry = sessionStorage.getItem('expiry');

    if (!token || !user || !expiry) return false;

    // Check if the session has expired
    if (getCurrentTimestamp() > parseInt(expiry)) {
        logout(); // Clear expired session
        return false;
    }

    return true;
};

// Get the authentication token
const getToken = () => {
    if (isSessionExpired()) return null;
    return sessionStorage.getItem('authToken');
};

// Get the user data
const getUser = () => {
    if (isSessionExpired()) return null;
    try {
        const user = sessionStorage.getItem('username');
        return user ? user?.replace(/^"|"$/g, "") : null;
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};



const isSessionExpired = () => {
    const expiry = sessionStorage.getItem('expiry');
    if (!expiry) return true;
    if (getCurrentTimestamp() > parseInt(expiry)) {
        logout();
        return true;
    }
    return false;
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
    sessionStorage.setItem("username", user);
    sessionStorage.setItem("role", roleHash);
}

// Set authentication data with expiration
const setAuth = (token, user, role) => {
    const expiryTime = getCurrentTimestamp() + SESSION_EXPIRY_TIME;
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('expiry', expiryTime.toString());
    storeHashedData(JSON.stringify(user), JSON.stringify(role));

    // Set default authorization header for axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear authentication data (logout)
const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('expiry');
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

// Initialize axios auth header if token exists and session is valid
const initializeAuth = () => {
    if (isSessionExpired()) return;
    const token = getToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

async function verifyData(input, storedHash) {
    const inputHash = await hashData(input);
    return inputHash === storedHash;
}

// Example Usage
async function checkUser(inputUser, inputRole) {
    if (isSessionExpired()) {
        console.log("Session expired.");
        return;
    }

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

async function checkRole() {
    if (isSessionExpired()) {
        console.log("Session expired.");
        return false;
    }
    
    const storedRoleHash = sessionStorage.getItem("role");
    const role = '"admin"';
    const role2 = '"superadmin"';
    const hashrole = await hashData(role);
    const hashrole2 = await hashData(role2);
    const isRoleValid = hashrole == storedRoleHash || hashrole2 == storedRoleHash ?true:false;

    if (isRoleValid) {
        console.log("Role verification successful!");
        const allowedRoles = ["superadmin", "admin"];
        if (allowedRoles.includes(role.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    } else {
        console.log("Role verification failed.");
        return false;
    }
}
async function checkRoleisOwner() {
    if (isSessionExpired()) {
        console.log("Session expired.");
        return false;
    }
    
    const storedRoleHash = sessionStorage.getItem("role");
    console.log(storedRoleHash);
    const role = '"Owner"';
    const hashrole = await hashData(role);
    console.log(storedRoleHash+" \n" + hashrole);
    const isRoleValid = hashrole == storedRoleHash ? true :false;

    if (isRoleValid) {
        console.log("Role verification successful!");

        const allowedRoles = ["Owner"];
        if (allowedRoles.includes(role.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    } else {
        console.log("Role verification failed.");
        return false;
    }
}

export {isAuthenticated, initializeAuth,isTokenExpired,logout,setAuth,getUser,getToken,checkRole,checkRoleisOwner}