<?php
require_once __DIR__ . '/../../../config/connect_db.php';

class TenantPaymentFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all tenant payments
    public function getAllPayments() {
        $sql = "SELECT Tenant_PaymentId, Stall_Id, Owner_Id, Price, DueDate, Status FROM tenant_paymenttbl";
        $result = $this->conn->query($sql);
        
        if ($result) {
            $payments = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $payments];
        }
        return ["status" => "error", "message" => "Failed to fetch tenant payments"];
    }

    // Add a new payment
    public function addPayment($data) {
        $sql = "INSERT INTO tenant_paymenttbl (Stall_Id, Owner_Id, Price, DueDate, Status) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iidss", $data['stall_id'], $data['owner_id'], $data['price'], $data['due_date'], $data['status']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Payment added successfully"];
        }
        error_log("Failed to add payment");
        return ["status" => "error", "message" => "Failed to add payment"];
    }

    // Update a payment
    public function updatePayment($id, $data) {
        $sql = "UPDATE tenant_paymenttbl SET Stall_Id = ?, Owner_Id = ?, Price = ?, DueDate = ?, Status = ? WHERE Tenant_PaymentId = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iidssi", $data['stall_id'], $data['owner_id'], $data['price'], $data['due_date'], $data['status'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Payment updated successfully"];
        }
        error_log("Failed to update payment");
        return ["status" => "error", "message" => "Failed to update payment"];
    }

    // Delete a payment
    public function deletePayment($id) {
        $stmt = $this->conn->prepare("DELETE FROM tenant_paymenttbl WHERE Tenant_PaymentId = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Payment deleted successfully"];
        }
        error_log("Failed to delete payment");
        return ["status" => "error", "message" => "Failed to delete payment"];
    }

    // Get payments by owner
    public function getPaymentsByOwner($ownerId) {
        $sql = "SELECT * FROM tenant_paymenttbl WHERE Owner_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $ownerId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result) {
            return ["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)];
        }
        return ["status" => "error", "message" => "Failed to fetch payments for owner"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$paymentFunctions = new TenantPaymentFunctions();
$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($paymentFunctions->getAllPayments());
            break;
        
        case 'add':
            echo json_encode($paymentFunctions->addPayment($data));
            break;
        
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            echo json_encode($paymentFunctions->updatePayment($id, $data));
            break;
        
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            echo json_encode($paymentFunctions->deletePayment($id));
            break;
        
        case 'getByOwner':
            $ownerId = isset($_GET['owner_id']) ? (int)$_GET['owner_id'] : null;
            echo json_encode($paymentFunctions->getPaymentsByOwner($ownerId));
            break;

        default:
            echo json_encode(["status" => "error", "message" => "Invalid action"]);
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
