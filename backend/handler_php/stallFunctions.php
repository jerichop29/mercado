<?php


require_once __DIR__ . '/../connect_db.php';

class StallFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all stalls
    public function getStalls() {
        $sql = "SELECT StallTbl.*, BuildingTbl.BuildingName ,TypesTbl.Name
                FROM StallTbl 
                LEFT JOIN TypesTbl ON StallTbl.Type_Id = TypesTbl.Types_Id
                LEFT JOIN BuildingTbl ON StallTbl.BuildingName = BuildingTbl.Id ";

        $result = $this->conn->query($sql);
        
        if ($result) {
            $stalls = $result->fetch_all(MYSQLI_ASSOC);
            return [
                "status" => "success", "data" => $stalls
            ];
        }
        return ["status" => "error", "message" => "Failed to fetch stalls"];
    }

    // Add new stall
    public function addStall($data) {
        $sql = "INSERT INTO StallTbl (StallName, BuildingName, Type_Id) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssi", $data['stallName'], $data['buildingName'], $data['type']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall added successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to add stall");
        return ["status" => "error", "message" => "Failed to add stall"];
    }

    // Delete stall
    public function deleteStall($id) {
        $stmt = $this->conn->prepare("DELETE FROM StallTbl WHERE Stall_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall deleted successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to delete stall");
        return ["status" => "error", "message" => "Failed to delete stall"];
    }

    // Update stall
    public function updateStall($id, $data) {
        $sql = "UPDATE StallTbl SET StallName = ?, BuildingName = ?, Type_Id = ? WHERE Stall_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssii", $data['stallName'], $data['buildingName'], $data['type'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall updated successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to update stall");
        return ["status" => "error", "message" => "Failed to update stall"];
    }
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$stallFunctions = new StallFunctions();
$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($stallFunctions->getStalls());
            break;
            
        case 'add':
            echo json_encode($stallFunctions->addStall($data));
            break;
            
        case 'delete':
            $id = $_GET['id'] ?? null;
            echo json_encode($stallFunctions->deleteStall($id));
            break;
            
        case 'update':
            $id = $_GET['id'] ?? null;
            echo json_encode($stallFunctions->updateStall($id, $data));
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