<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class DiscoverFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all discoveries
    public function getAllDiscovers() {
        $sql = "SELECT * FROM discovertbl";
        $result = $this->conn->query($sql);
        
        if ($result) {
            $discovers = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $discovers];
        }
        return ["status" => "error", "message" => "Failed to fetch discoveries"];
    }

    // Add new discovery
    public function addDiscover($data) {
        $sql = "INSERT INTO discovertbl (Title, Activity,`image`, `Description`, Date_start, Date_End, Link) VALUES (?, ?, ?, ?, ?, ?,?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssbssss", $data['Title'], $data['Activity'], $data['image'], $data['Description'], $data['Date_Start'], $data['Date_End'], $data['Link']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Discovery added successfully"];
        }
        error_log("Failed to add discovery");
        return ["status" => "error", "message" => "Failed to add discovery"];
    }

    // Delete discovery
    public function deleteDiscover($id) {
        $stmt = $this->conn->prepare("DELETE FROM discovertbl WHERE discover_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Discovery deleted successfully"];
        }
        error_log("Failed to delete discovery");
        return ["status" => "error", "message" => "Failed to delete discovery"];
    }

    // Update discovery
    public function updateDiscover($id, $data) {
        $sql = "UPDATE discovertbl SET Title = ?, Activity = ?, `Description` = ?, Date_start = ?, Date_End = ?, Link = ? WHERE discover_ID = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssssi", $data['Title'], $data['Title'], $data['Description'], $data['Date_Start'], $data['Date_End'], $data['Link'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Discovery updated successfully"];
        }
        error_log("Failed to update discovery");
        return ["status" => "error", "message" => "Failed to update discovery"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$discoverFunctions = new DiscoverFunctions();
$action = $_GET['action'] ?? '';

$allowedActions = ['get', 'add', 'delete', 'update'];
if (!in_array($action, $allowedActions, true)) {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($discoverFunctions->getAllDiscovers());
            break;
            
        case 'add':
            echo json_encode($discoverFunctions->addDiscover($data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($discoverFunctions->deleteDiscover($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($discoverFunctions->updateDiscover($id, $data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
