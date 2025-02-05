<?php
require_once __DIR__ . '/../connect_db.php';

class OwnerFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all owners
    public function getAllOwners() {
        $sql = "SELECT Owner_Id, Person_Id, Admin_Id, Username FROM OwnerTbl"; // Updated SQL query
        
        $result = $this->conn->query($sql);
        
        if ($result) {
            $owners = $result->fetch_all(MYSQLI_ASSOC);
            return [
                "status" => "success", "data" => $owners
            ];
        }
        return ["status" => "error", "message" => "Failed to fetch owners"];
    }

    // Add new owner
    public function addOwner($data) {
        $sql = "INSERT INTO OwnerTbl (Person_Id, Admin_Id, Username, `Password`) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iiss", $data['person_id'], $data['admin_id'], $data['username'], $data['password']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner added successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to add owner");
        return ["status" => "error", "message" => "Failed to add owner"];
    }

    // Delete owner
    public function deleteOwner($id) {
        $stmt = $this->conn->prepare("DELETE FROM OwnerTbl WHERE Owner_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner deleted successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to delete owner");
        return ["status" => "error", "message" => "Failed to delete owner"];
    }

    // Update owner
    public function updateOwner($id, $data) {
        $sql = "UPDATE OwnerTbl SET Person_Id = ?, Admin_Id = ?, Username = ?, `Password` = ? WHERE Owner_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iissi", $data['person_id'], $data['admin_id'], $data['username'], $data['password'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner updated successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to update owner");
        return ["status" => "error", "message" => "Failed to update owner"];
    }
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$ownerFunctions = new OwnerFunctions();
$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($ownerFunctions->getAllOwners());
            break;
            
        case 'add':
            echo json_encode($ownerFunctions->addOwner($data));
            break;
            
        case 'delete':
            $id = $_GET['id'] ?? null;
            echo json_encode($ownerFunctions->deleteOwner($id));
            break;
            
        case 'update':
            $id = $_GET['id'] ?? null;
            echo json_encode($ownerFunctions->updateOwner($id, $data));
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
