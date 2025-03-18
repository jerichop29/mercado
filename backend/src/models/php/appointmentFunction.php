<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class AppointmentFunction {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all appointment
    public function getAppointment() {
        $sql = "SELECT * FROM appointmenttbl";

        $result = $this->conn->query($sql);
        
        if ($result) {
            $appointment = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $appointment];
        }
        return ["status" => "error", "message" => "Failed to fetch appointment"];
    }

    // Add new stall
    public function addAppointment($data) {
        $sql = "INSERT INTO appointmenttbl ( `Stall_Id`, `FullName`, `Email`, `Contact`, `POI`, `Status`) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("isssss", $data['Stall_Id'], $data['FullName'], $data['Email'], $data['Contact'], $data['POI'], $data['Status']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Appointment added successfully"];
        }
        error_log("Failed to add appointment");
        return ["status" => "error", "message" => "Failed to add appointment"];
    }

    // Delete stall
    public function deleteAppointment($id) {
        $stmt = $this->conn->prepare("DELETE FROM appointmenttbl WHERE Appointment_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall deleted successfully"];
        }
        error_log("Failed to delete stall");
        return ["status" => "error", "message" => "Failed to delete stall"];
    }

    // Update stall
    public function updateAppointment($id, $data) {
        $sql = "UPDATE appointmenttbl SET `Stall_Id` = ?, `FullName` = ?, `Email` = ?, `Contact`= ?, `POI`= ?, `Status`= ? WHERE Appointment_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("isssssi", $data['Stall_Id'], $data['FullName'], $data['Email'], $data['Contact'], $data['POI'] , $data['Status'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stall updated successfully"];
        }
        error_log("Failed to update stall");
        return ["status" => "error", "message" => "Failed to update stall"];
    }

     // Update stall
     public function updateAppointmentStatus($id, $data) {
        $sql = "UPDATE appointmenttbl SET  Status_Id =? WHERE Appoinment_Id = ?";
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

$AppointmentFunction = new AppointmentFunction();
$action = $_GET['action'] ?? '';

$allowedActions = ['get', 'add', 'delete', 'update', 'status', 'updateAppointmentStatus'];
if (!in_array($action, $allowedActions, true)) {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($AppointmentFunction->getAppointment());
            break;
            
        case 'add':
            echo json_encode($AppointmentFunction->addAppointment($data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($AppointmentFunction->deleteAppointment($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($AppointmentFunction->updateAppointment($id, $data));
            break;

        case 'status':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
            exit();
            }
            echo json_encode($AppointmentFunction->updateAppointmentStatus($id, $data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
