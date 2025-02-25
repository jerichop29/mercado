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

    // Authenticate owners
    public function AuthOwner($data) {
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            return ["status" => "error", "message" => "Username and password are required"];
        }

        $sql = "SELECT `Password` FROM ownertbl WHERE Username = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $username);
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $owner = $result->fetch_assoc();
                if (password_verify($password, $owner['Password'])) {
                    return ["status" => "success", "message" => "Authentication successful"];
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
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$ownerFunctions = new OwnerFunctions();
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
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
