<?php
require_once __DIR__ . '/../connect_db.php';

class DiscoverFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all discoveries
    public function getAllDiscovers() {
        $sql = "SELECT * FROM discoverTbl";
        
        $result = $this->conn->query($sql);
        
        if ($result) {
            $discovers = $result->fetch_all(MYSQLI_ASSOC);
            return [
                "status" => "success", "data" => $discovers
            ];
        }
        return ["status" => "error", "message" => "Failed to fetch discoveries"];
    }

    // Add new discovery
    public function addDiscover($data) {
        $sql = "INSERT INTO discoverTbl (Title, Activity, `Description`, Date_start, Date_End) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssss", $data['title'], $data['activity'], $data['description'], $data['date_start'], $data['date_end']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Discovery added successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to add discovery");
        return ["status" => "error", "message" => "Failed to add discovery"];
    }

    // Delete discovery
    public function deleteDiscover($id) {
        $stmt = $this->conn->prepare("DELETE FROM discoverTbl WHERE discover_ID = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Discovery deleted successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to delete discovery");
        return ["status" => "error", "message" => "Failed to delete discovery"];
    }

    // Update discovery
    public function updateDiscover($id, $data) {
        $sql = "UPDATE discoverTbl SET Title = ?, Activity = ?, `Description` = ?, Date_start = ?, Date_End = ? WHERE discover_ID = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssi", $data['title'], $data['activity'], $data['description'], $data['date_start'], $data['date_end'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Discovery updated successfully"];
        }
        ErrorHandler::handleError(E_USER_ERROR, "Failed to update discovery");
        return ["status" => "error", "message" => "Failed to update discovery"];
    }
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$discoverFunctions = new DiscoverFunctions();
$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($discoverFunctions->getAllDiscovers());
            break;
            
        case 'addDiscover':
            echo json_encode($discoverFunctions->addDiscover($data));
            break;
            
        case 'deleteDiscover':
            $id = $_GET['id'] ?? null;
            echo json_encode($discoverFunctions->deleteDiscover($id));
            break;
            
        case 'updateDiscover':
            $id = $_GET['id'] ?? null;
            echo json_encode($discoverFunctions->updateDiscover($id, $data));
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