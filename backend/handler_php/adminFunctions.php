<?php
require_once __DIR__ . '/../connect_db.php';

class AdminFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all admins
    public function getAllAdmins() {
        $sql = "SELECT Admin_Id, Username, `Password`, `role` FROM AdminTbl"; // Updated SQL query
        
        $result = $this->conn->query($sql);
        
        if ($result) {
            $admins = $result->fetch_all(MYSQLI_ASSOC);
            return [
                "status" => "success", "data" => $admins
            ];
        }
        return ["status" => "error", "message" => "Failed to fetch admins"];
    }

    // Add new admin
    public function addAdmin($data) {
        $sql = "INSERT INTO AdminTbl (Username, `Password`, `role`) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sss", $data['username'], $data['password'], $data['role']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Admin added successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to add admin");
        return ["status" => "error", "message" => "Failed to add admin"];
    }

    // Delete admin
    public function deleteAdmin($id) {
        $stmt = $this->conn->prepare("DELETE FROM AdminTbl WHERE Admin_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Admin deleted successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to delete admin");
        return ["status" => "error", "message" => "Failed to delete admin"];
    }

    // Update admin
    public function updateAdmin($id, $data) {
        $sql = "UPDATE AdminTbl SET Username = ?, `Password` = ?, `role` = ? WHERE Admin_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssi", $data['username'], $data['password'], $data['role'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Admin updated successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to update admin");
        return ["status" => "error", "message" => "Failed to update admin"];
    }
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$adminFunctions = new AdminFunctions();
$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($adminFunctions->getAllAdmins());
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
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
