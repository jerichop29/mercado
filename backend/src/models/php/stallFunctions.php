<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class StallFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all stalls
    public function getStalls() {
        $sql = "SELECT 
                    stalltbl.*, 
                    buildingtbl.BuildingName, 
                    typestbl.Name AS TypeName, 
                    ownertbl.Date_Start,
                    statustbl.Status,
                    persontbl.FName AS OwnerFname,
                    persontbl.MName AS OwnerMname,
                    persontbl.LName AS OwnerLname 
                FROM stalltbl 
                LEFT JOIN typestbl ON stalltbl.Type_Id = typestbl.Types_Id 
                LEFT JOIN buildingtbl ON stalltbl.BuildingName = buildingtbl.Id 
                LEFT JOIN ownertbl ON stalltbl.Owner_Id = ownertbl.Owner_Id 
                LEFT JOIN persontbl ON ownertbl.Person_Id = persontbl.Person_Id
                LEFT JOIN statustbl ON stalltbl.Status_Id = statustbl.Status_Id;
                        ";

        $result = $this->conn->query($sql);
        
        if ($result) {
            $stalls = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $stalls];
        }
        return ["status" => "error", "message" => "Failed to fetch stalls"];
    }

    // Add new stall
    public function addStall($data) {
        $sql = "INSERT INTO stalltbl (StallCode, BuildingName, Type_Id) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sii", $data['stallName'], $data['BuildingName'], $data['type']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall added successfully"];
        }
        error_log("Failed to add stall");
        return ["status" => "error", "message" => "Failed to add stall"];
    }

    // Delete stall
    public function deleteStall($id) {
        $stmt = $this->conn->prepare("DELETE FROM stalltbl WHERE Stall_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall deleted successfully"];
        }
        error_log("Failed to delete stall");
        return ["status" => "error", "message" => "Failed to delete stall"];
    }

    // Update stall
    public function updateStall($id, $data) {
        if($data['Owner_Id'] != null){
        $sql = "UPDATE stalltbl SET  Type_Id = ?,Owner_Id =?, Status_Id =? WHERE Stall_Id = ?";
        }else{
        $sql = "UPDATE stalltbl SET  Type_Id = ?,Owner_Id = NULL, Status_Id =? WHERE Stall_Id = ?";
        }$stmt = $this->conn->prepare($sql);

        if($data['Owner_Id'] != null){
        $stmt->bind_param("siii", $data['Type_Id'],$data['Owner_Id'], $data['Status'], $id);    
        }
        else{
        $stmt->bind_param("sii", $data['Type_Id'], $data['Status'], $id);
        }
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall updated successfully"];
        }
        error_log("Failed to update stall");
        return ["status" => "error", "message" => "Failed to update stall"];
    }

     // Update stall
     public function updateStallStatus($id, $data) {
        $sql = "UPDATE stalltbl SET  Status_Id =?, Owner_Id =? WHERE Stall_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iii",$data['Status_Id'], $data['Owner_Id'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall status updated successfully"];
        }
        error_log("Failed to update stall");
        return ["status" => "error", "message" => "Failed to update stall status"];
    }

    // Update all stalls with the same owner
    public function updateAllStallsByOwner($ownerId, $data) {
        $sql = "UPDATE stalltbl SET Status_Id = ? , Owner_Id = NULL WHERE Owner_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ii", $data['Status_Id'] , $ownerId);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "All stalls updated successfully"];
        }
        error_log("Failed to update stalls for owner ID: $ownerId");
        return ["status" => "error", "message" => "Failed to update stalls"];
    }

}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$stallFunctions = new StallFunctions();
$action = $_GET['action'] ?? '';

$allowedActions = ['get', 'add', 'delete', 'update', 'status', 'updateAllByOwner'];
if (!in_array($action, $allowedActions, true)) {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit();
}

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
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($stallFunctions->deleteStall($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($stallFunctions->updateStall($id, $data));
            break;

        case 'status':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
            exit();
            }
            echo json_encode($stallFunctions->updateStallStatus($id, $data));
            break;

        case 'updateAllByOwner':
            $ownerId = isset($_GET['ownerId']) ? (int)$_GET['ownerId'] : null;
            if (!$ownerId) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid Owner ID"]);
                exit();
            }
            echo json_encode($stallFunctions->updateAllStallsByOwner($ownerId, $data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
