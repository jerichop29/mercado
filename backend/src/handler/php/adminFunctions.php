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

    // Authenticate admin
    public function authAdmin($data) {
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            
            return ["status" => "error", "message" => "Username and password are required"];
        }

        $stmt = $this->conn->prepare("SELECT `Password` FROM admintbl WHERE Username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $admin = $result->fetch_assoc();
            if (password_verify($password, $admin['Password'])) {
                return ["status" => "success", "message" => "Authentication successful"];
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

$allowedActions = ['get', 'auth', 'add', 'delete', 'update'];
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
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
