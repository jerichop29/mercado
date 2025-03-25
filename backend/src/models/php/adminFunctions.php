<?php
require_once __DIR__ . '/../../../config/connect_db.php';

class AdminFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all admins (WITHOUT returning passwords)
    public function getAllAdmins() {
        $sql = "SELECT Admin_Id, Username, `role`,admintbl.Person_Id, persontbl.* FROM admintbl
                LEFT JOIN persontbl ON persontbl.Person_Id = admintbl.Person_Id; "; 
        $result = $this->conn->query($sql);

        if ($result) {
            return ["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)];
        }
        return ["status" => "error", "message" => "Failed to fetch admins"];
    }
    //check UID if existing
    public function checkUsernameExists($data) {
        $stmt = $this->conn->prepare("SELECT Username FROM admintbl WHERE Username = ?");
        $stmt->bind_param("s", $data['username']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->num_rows > 0; // Returns true if username exists, false otherwise
    }
    // Authenticate admin
    public function authAdmin($data) {
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            
            return ["status" => "error", "message" => "Username and password are required"];
        }

        $stmt = $this->conn->prepare("SELECT Username,`Password`,`role` FROM admintbl WHERE Username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $admin = $result->fetch_assoc();
            $token = bin2hex(random_bytes(16));
            if (password_verify($password, $admin['Password'])) {
                return ["status" => "success", "message" => "Authentication successful","user" => $admin['Username'], "role" => $admin['role'],"token" => $token];
            }
        }
        return ["status" => "error", "message" => "Invalid Username or Password"];
    }
    // Add new admin
    public function addAdmin($data) {
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        $stmt = $this->conn->prepare("INSERT INTO admintbl (Username, `Password`, `role`,Person_Id) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $data['username'], $hashedPassword, $data['role'], $data['Person_Id']);

        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Admin added successfully"];
        }
        error_log("Failed to add admin: " . $stmt->error);
        return ["status" => "error", "message" => "Failed to add admin"];
    }

    // Update admin (only hash the password if changed)
    public function updateAdmin($id, $data) {
        $updatePassword = !empty($data['password']);
        $sql = "UPDATE admintbl SET Username = ?, `role` = ?" . ($updatePassword ? ", `Password` = ?" : "") . " WHERE Admin_Id = ?";
        $stmt = $this->conn->prepare($sql);

        if ($updatePassword) {
            $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
            $stmt->bind_param("sssi", $data['username'], $data['role'], $hashedPassword, $id);
        } else {
            $stmt->bind_param("ssi", $data['username'], $data['role'], $id);
        }

        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Admin updated successfully"];
        }
        error_log("Failed to update admin: " . $stmt->error);
        return ["status" => "error", "message" => "Failed to update admin"];
    }

    public function updatePassword($id,$data) {
        $username = $data['Username'] ?? null;
        $currentPassword = $data['current_password'] ?? null;
        $newPassword = $data['new_password'] ?? null;
        
        // Validate inputs
        if (empty($username) || empty($currentPassword) || empty($newPassword)) {
            return ["status" => "error", "message" => "Username, current password, and new password are required"];
        }
        
        // First authenticate the user
        $authData = [
            'username' => $username,
            'password' => $currentPassword
        ];
        
        $authResult = $this->authAdmin($authData);
        
        if ($authResult['status'] !== "success") {
            return ["status" => "error", "message" => "Authentication failed. Current password is incorrect."];
        }
        
        // If authentication succeeded, proceed with password update
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        
        // Prepare and execute the update query
        $sql = "UPDATE admintbl SET `Password` = ? WHERE Admin_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("si", $hashedPassword, $id);
        
        if ($stmt->execute()) {
            // Check if any row was affected
            if ($stmt->affected_rows > 0) {
                return ["status" => "success", "message" => "Password updated successfully"];
            } else {
                return ["status" => "error", "message" => "Failed to update password. Please try again."];
            }
        }
        
        error_log("Failed to update password for id: " . $id);
        return ["status" => "error", "message" => "Failed to update password"];
    }

    // Delete admin
    public function deleteAdmin($id) {
        $stmt = $this->conn->prepare("DELETE FROM admintbl WHERE Admin_Id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Admin deleted successfully"];
        }
        error_log("Failed to delete admin: " . $stmt->error);
        
        return ["status" => "error", "message" => "Failed to delete admin"];
    }
}



// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    
    exit();
}

$adminFunctions = new AdminFunctions();
$action = $_GET['action'] ?? '';

$allowedActions = ['get', 'auth', 'add', 'delete', 'update','checkUsername','updatePassword'];
if (!in_array($action, $allowedActions, true)) {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($adminFunctions->getAllAdmins());
            break;
        case 'auth':
            echo json_encode($adminFunctions->authAdmin($data));
            break;
        case 'add':
            echo json_encode($adminFunctions->addAdmin($data));
            break;
        case 'delete':
            $id = $_GET['id'] ?? null;
            echo json_encode($adminFunctions->deleteAdmin($id));
            break;
        case 'update':
            $id = $_GET['id'] ?? null;
            echo json_encode($adminFunctions->updateAdmin($id, $data));
            break;
        case 'checkUsername':
            echo json_encode($adminFunctions->checkUsernameExists($data));
            break;
        case 'updatePassword':
            $id = $_GET['id'] ?? null;
            echo json_encode($adminFunctions->updatePassword($id,$data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
