<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class FacilitiesFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all Facilities
    public function getFacility($id) {
        $sql = "SELECT * FROM eventtbl WHERE facilities_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result) {
            $facilities = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $facilities];
        }
        return ["status" => "error", "message" => "Failed to fetch Facilities"];
    }

    // Add new Facility
    public function addFacilities($data) {
        $sql = "INSERT INTO eventtbl (Event_Name, Event_Date) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss", $data['Event_Name'], $data['Event_Date']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Facility added successfully"];
        }
        error_log("Failed to add Facility");
        return ["status" => "error", "message" => "Failed to add Facility"];
    }

    // Delete Facility
    public function deleteFacilities($id) {
        $stmt = $this->conn->prepare("DELETE FROM eventtbl WHERE Event_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Facility deleted successfully"];
        }
        error_log("Failed to delete Facility");
        return ["status" => "error", "message" => "Failed to delete Facility"];
    }

    // Update Facility
    public function updateFacilities($id, $data) {
        $sql = "UPDATE eventtbl SET Event_Name = ?, Event_Date = ? WHERE Event_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssi", $data['Event_Name'], $data['Event_Date'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Facility updated successfully"];
        }
        error_log("Failed to update Facility");
        return ["status" => "error", "message" => "Failed to update Facility"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$facilitiesFunctions = new FacilitiesFunctions();
$action = $_GET['action'] ?? '';

$allowedActions = ['get', 'addFacilities', 'deleteFacilities', 'updateFacilities'];
if (!in_array($action, $allowedActions, true)) {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($facilitiesFunctions->getFacility($id));
            break;
            
        case 'addFacilities':
            echo json_encode($facilitiesFunctions->addFacilities($data));
            break;
            
        case 'deleteFacilities':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($facilitiesFunctions->deleteFacilities($id));
            break;
            
        case 'updateFacilities':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($facilitiesFunctions->updateFacilities($id, $data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
