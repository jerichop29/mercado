<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class TenantFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all tenants
    public function getAllTenants() {
        $sql = "SELECT 
                    tenanttbl.TenantId,
                    tenanttbl.Date_Start,
                    tenanttbl.`Market Fee` AS Market_Fee, 
                    persontbl.*, 
                    stalltbl.Stall_Id,
                    stalltbl.StallCode,
                    stalltbl.BuildingName, 
                    ownertbl.Person_Id AS Owner_Person_Id, 
                    ownerpersontbl.FName AS Owner_FName,
                    ownerpersontbl.MName AS Owner_MName,
                    ownerpersontbl.LName AS Owner_LName
                FROM tenanttbl
                LEFT JOIN persontbl ON persontbl.Person_Id = tenanttbl.Person_Id
                LEFT JOIN stalltbl ON stalltbl.Stall_Id = tenanttbl.Stall_Id
                LEFT JOIN ownertbl ON ownertbl.Owner_Id = tenanttbl.Owner_Id
                LEFT JOIN persontbl AS ownerpersontbl ON ownerpersontbl.Person_Id = ownertbl.Person_Id
                "; 
        
        $result = $this->conn->query($sql);
        
        if ($result) {
            $tenants = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $tenants];
        }
        return ["status" => "error", "message" => "Failed to fetch tenants"];
    }

    // Add new tenant
    public function addTenant($data) {
        $sql = "INSERT INTO tenanttbl ( Date_Start, Owner_Id, Person_Id, Stall_Id, `Market Fee`) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("siiii",$data['Date_Start'], $data['Owner_Id'], $data['Person_Id'], $data['Stall_Id'], $data['Market_Fee']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Tenant added successfully"];
        }
        error_log("Failed to add tenant");
        return ["status" => "error", "message" => "Failed to add tenant"];
    }

    // Delete tenant
    public function deleteTenant($id) {
        $stmt = $this->conn->prepare("DELETE FROM tenanttbl WHERE TenantId = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Tenant deleted successfully"];
        }
        error_log("Failed to delete tenant");
        return ["status" => "error", "message" => "Failed to delete tenant"];
    }

    // Update tenant
    public function updateTenant($id, $data) {
        $sql = "UPDATE tenanttbl SET Person_Id = ?, Stall_Id = ?, `Market Fee` = ? WHERE TenantId = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("iidi", $data['Person_Id'], $data['Stall_Id'], $data['Market_Fee'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Tenant updated successfully"];
        }
        error_log("Failed to update tenant");
        return ["status" => "error", "message" => "Failed to update tenant"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$tenantFunctions = new TenantFunctions();
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
            echo json_encode($tenantFunctions->getAllTenants());
            break;
            
        case 'add':
            echo json_encode($tenantFunctions->addTenant($data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($tenantFunctions->deleteTenant($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($tenantFunctions->updateTenant($id, $data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
