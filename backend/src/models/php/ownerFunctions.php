<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class OwnerFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all owners
    public function getAllOwners() {
        $sql = "SELECT ownertbl.*,persontbl.* FROM ownertbl 
                LEFT JOIN persontbl ON persontbl.Person_Id = ownertbl.Person_Id; ";
        $result = $this->conn->query($sql);
        
        if ($result) {
            $owners = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $owners];
        }
        return ["status" => "error", "message" => "Failed to fetch owners"];
    }
    //check UID if existing
    public function checkUsernameExists($data) {
        $stmt = $this->conn->prepare("SELECT Username FROM ownertbl WHERE Username = ?");
        $stmt->bind_param("s", $data['username']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->num_rows > 0; // Returns true if username exists, false otherwise
    }
    // Authenticate owners
    public function AuthOwner($data) {
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            return ["status" => "error", "message" => "Username and password are required"];
        }

        $sql = "SELECT Username,`Password`,`role` FROM ownertbl WHERE Username = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $username);
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $owner = $result->fetch_assoc();
                $token = bin2hex(random_bytes(16));
                if (password_verify($password, $owner['Password'])) {
                    return ["status" => "success", "message" => "Authentication successful","user" => $owner['Username'], "role" => $owner['role'],"token" => $token];
                }
            }
            return ["status" => "error", "message" => "Invalid Username or Password"];
        }
        return ["status" => "error", "message" => "Failed to authenticate"];
    }

    // Add new owner
    public function addOwner($data) {
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        
        $sql = "INSERT INTO ownertbl (Person_Id, Admin_Id, Username, `Password`,`role` , Date_Start ) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iissss", 
                    $data['Person_Id'], 
                    $data['Admin_Id'], 
                    $data['username'], 
                    $hashedPassword,
                    $data['role'],
                    $data['Date_Start']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner added successfully"];
        }
        error_log("Failed to add owner");
        return ["status" => "error", "message" => "Failed to add owner"];
    }

    // Delete owner
    public function deleteOwner($id) {
        $stmt = $this->conn->prepare("DELETE FROM ownertbl WHERE Owner_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner deleted successfully"];
        }
        error_log("Failed to delete owner");
        return ["status" => "error", "message" => "Failed to delete owner"];
    }

    // Update owner
    public function updateOwner($id, $data) {
        if (!empty($data['password'])) {
            $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
            $sql = "UPDATE ownertbl SET Person_Id = ?, Admin_Id = ?, Username = ?, `Password` = ? WHERE Owner_Id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("iissi", $data['person_id'], $data['admin_id'], $data['username'], $hashedPassword, $id);
        } else {
            $sql = "UPDATE ownertbl SET Person_Id = ?, Admin_Id = ?, Username = ? WHERE Owner_Id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("iisi", $data['person_id'], $data['admin_id'], $data['username'], $id);
        }

        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner updated successfully"];
        }
        error_log("Failed to update owner");
        return ["status" => "error", "message" => "Failed to update owner"];
    }

    public function updatePassword($id,$data) {
        $username = $data['Username'] ?? null;
        $currentPassword = $data['current_password'] ?? null;
        $newPassword = $data['new_password'] ?? null;
        
        // Validate inputs
        if (empty($username) || empty($currentPassword) || empty($newPassword)) {
            return ["status" => "error", "message" => "Username, current password, and new password are required"];
        }
        
        $authData = [
            'username' => $username,
            'password' => $currentPassword
        ];
        
        $authResult = $this->AuthOwner($authData);
        
        if ($authResult['status'] !== "success") {
            return ["status" => "error", "message" => "Authentication failed. Current password is incorrect."];
        }
        
        // If authentication succeeded, proceed with password update
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        
        // Prepare and execute the update query
        $sql = "UPDATE ownertbl SET `Password` = ? WHERE Owner_Id = ?";
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
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$ownerFunctions = new OwnerFunctions();
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
            echo json_encode($ownerFunctions->getAllOwners());
            break;
            
        case 'auth':
            echo json_encode($ownerFunctions->AuthOwner($data));
            break;

        case 'add':
            echo json_encode($ownerFunctions->addOwner($data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            echo json_encode($ownerFunctions->deleteOwner($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            echo json_encode($ownerFunctions->updateOwner($id, $data));
            break;
        case 'checkUsername':
            echo json_encode($ownerFunctions->checkUsernameExists($data));
            break;
        case 'updatePassword':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            echo json_encode($ownerFunctions->updatePassword($id,$data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
