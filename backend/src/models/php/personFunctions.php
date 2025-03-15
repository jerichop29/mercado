<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class PersonFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all persons
    public function getAllPersons() {
        $sql = "SELECT * FROM persontbl";
        
        $result = $this->conn->query($sql);
        
        if ($result) {
            $persons = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $persons];
        }
        return ["status" => "error", "message" => "Failed to fetch persons"];
    }

    // Add new person
    public function addPerson($data) {
        $sql = "INSERT INTO `persontbl` 
                (`Person_Id`, `FName`, `LName`, `MName`, `Gender`, `Address`, `Contact`, `Email`, `Birthdate`) 
                VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssssss", 
                          $data['FName'], 
                          $data['LName'], 
                          $data['MName'], 
                          $data['Gender'], 
                          $data['Address'], 
                          $data['Contact'], 
                          $data['Email'], 
                          $data['Birthdate']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "User added successfully"];
        }
        error_log("Failed to add person");
        return ["status" => "error", "message" => "Failed to add person"];
    }

    // Delete person
    public function deletePerson($id) {
        $stmt = $this->conn->prepare("DELETE FROM persontbl WHERE Person_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "User deleted successfully"];
        }
        error_log("Failed to delete person");
        return ["status" => "error", "message" => "Failed to delete user"];
    }

    // Update person
    public function updatePerson($id, $data) {
        $sql = "UPDATE persontbl 
                SET FName = ?, 
                    LName = ?, 
                    MName = ?, 
                    Gender = ?, 
                    `Address` = ?, 
                    Contact = ?, 
                    Email = ?, 
                    Birthdate = ? 
                WHERE Person_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssssssi",
                    $data['FName'],
                    $data['LName'], 
                    $data['MName'], 
                    $data['Gender'], 
                    $data['Address'], 
                    $data['Contact'], 
                    $data['Email'], 
                    $data['Birthdate'], 
                    $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "User edited successfully"];
        }
        error_log("Failed to update person");
        return ["status" => "error", "message" => "Failed to update person"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$personFunctions = new PersonFunctions();
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
            echo json_encode($personFunctions->getAllPersons());
            break;
            
        case 'add':
            echo json_encode($personFunctions->addPerson($data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($personFunctions->deletePerson($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($personFunctions->updatePerson($id, $data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
