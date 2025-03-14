<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class ComplaintsFunction {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all complaints
    public function getComplaints() {
        $sql = "SELECT * FROM complaintstable 
                        ";

        $result = $this->conn->query($sql);
        
        if ($result) {
            $complaints = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $complaints];
        }
        return ["status" => "error", "message" => "Failed to fetch complaints"];
    }

    // Add new stall
    public function addComplaints($data) {
        $sql = "INSERT INTO complaintstable (`Complainant`, `Category_Id`, `SubCategory_Id`, `Complaint_Message`, `Status`, `Complaint_Image`, `Request`, `Date_End`, `Date_Start`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("isssss", $data['Complainant'], $data['Category_Id'], $data['SubCategory_Id'], $data['Complaint_Message'], $data['Status'], $data['Complaint_Image'], $data['Request'], $data['Date_End'], $data['Date_Start']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "complaints added successfully"];
        }
        error_log("Failed to add complaints");
        return ["status" => "error", "message" => "Failed to add complaints"];
    }

    // Delete stall
    public function deleteComplaints($id) {
        $stmt = $this->conn->prepare("DELETE FROM complaintstable WHERE Complaints_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall deleted successfully"];
        }
        error_log("Failed to delete stall");
        return ["status" => "error", "message" => "Failed to delete stall"];
    }

    // Update stall
    public function updateComplaints($id, $data) {
        $sql = "UPDATE complaintstable SET `Stall_Id` = ?, `FullName` = ?, `Email` = ?, `Contact`= ?, `POI`= ?, `Status`= ? WHERE Complaints_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("isssssi", $data['Stall_Id'], $data['FullName'], $data['Email'], $data['Contact'], $data['POI'] , $data['Status'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall updated successfully"];
        }
        error_log("Failed to update stall");
        return ["status" => "error", "message" => "Failed to update stall"];
    }

     // Update stall
     public function updateComplaintsStatus($id, $data) {
        $sql = "UPDATE complaintstable SET  Status_Id =? WHERE Appoinment_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ii",$data['Status_Id'] , $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall status updated successfully"];
        }
        error_log("Failed to update stall");
        return ["status" => "error", "message" => "Failed to update stall status"];
    }


}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$ComplaintsFunction = new ComplaintsFunction();
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
            echo json_encode($ComplaintsFunction->getComplaints());
            break;
            
        case 'add':
            echo json_encode($ComplaintsFunction->addComplaints($data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($ComplaintsFunction->deleteComplaints($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($ComplaintsFunction->updateComplaints($id, $data));
            break;

        case 'status':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
            exit();
            }
            echo json_encode($ComplaintsFunction->updateComplaintsStatus($id, $data));
            break;
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
