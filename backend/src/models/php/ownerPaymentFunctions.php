<?php
require_once __DIR__ . '/../../../config/connect_db.php';

class OwnerPaymentFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all owner payments
    public function getAllOwnerPayments() {
        $sql = "SELECT Owner_PaymentId, DueDate, Status, Price FROM owner_paymenttbl";
        $result = $this->conn->query($sql);
        
        if ($result) {
            return ["status" => "success", "data" => $result->fetch_all(MYSQLI_ASSOC)];
        }
        return ["status" => "error", "message" => "Failed to fetch owner payments"];
    }

    // Add a new owner payment
    public function addOwnerPayment($data) {
        $sql = "INSERT INTO owner_paymenttbl (DueDate, Status, Price) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssd", $data['due_date'], $data['status'], $data['price']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner payment added successfully"];
        }
        return ["status" => "error", "message" => "Failed to add owner payment"];
    }

    // Update an owner payment
    public function updateOwnerPayment($id, $data) {
        $sql = "UPDATE owner_paymenttbl SET DueDate = ?, Status = ?, Price = ? WHERE Owner_PaymentId = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssdi", $data['due_date'], $data['status'], $data['price'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner payment updated successfully"];
        }
        return ["status" => "error", "message" => "Failed to update owner payment"];
    }

    // Delete an owner payment
    public function deleteOwnerPayment($id) {
        $stmt = $this->conn->prepare("DELETE FROM owner_paymenttbl WHERE Owner_PaymentId = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Owner payment deleted successfully"];
        }
        return ["status" => "error", "message" => "Failed to delete owner payment"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$paymentFunctions = new OwnerPaymentFunctions();
$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($paymentFunctions->getAllOwnerPayments());
            break;
        
        case 'add':
            echo json_encode($paymentFunctions->addOwnerPayment($data));
            break;
        
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            echo json_encode($paymentFunctions->updateOwnerPayment($id, $data));
            break;
        
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            echo json_encode($paymentFunctions->deleteOwnerPayment($id));
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
