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

        if (isset($data['image'])) {
            $base64String = $data['image'];
            // Check if the base64 string has a data URL prefix and remove it
            if (preg_match('/^data:image\/(\w+);base64,/', $base64String, $type)) {
                $base64String = substr($base64String, strpos($base64String, ',') + 1);
            }
            // Validate image type
            $imageData = base64_decode($base64String);
            $imagePath = './../../../../src/assets/uploads/discovery/discovery' . uniqid() . '.jpg'; // Define a unique path for the image

            // Ensure the directory exists
            if (!is_dir('./../../../../src/assets/uploads/discovery/')) {
                mkdir('./../../../../src/assets/uploads/discovery/', 0777, true); // Create the directory if it doesn't exist
            }

            // Save the image
            if (file_put_contents($imagePath, $imageData) === false) {
                return ["status" => "error", "message" => "Failed to save image"];
            }
            $data['image'] = $imagePath; // Update the data to store the image path
        } else {
            return ["status" => "error", "message" => "No image data provided".$data];
        }

        $sql = "INSERT INTO discovertbl (Title, Activity, `image`, `Description`, Date_start, Date_End, Link) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssss", $data['Title'], $data['Activity'], $data['image'], $data['Description'], $data['Date_Start'], $data['Date_End'], $data['Link']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Discovery added successfully"];
        }
        error_log("Failed to add discovery");
        return ["status" => "error", "message" => "Failed to add discovery"];
    }

    // Delete discovery
    public function deleteDiscover($id) {
        // Fetch the current image path from the database
        $currentImageQuery = "SELECT `image` FROM discovertbl WHERE discover_Id = ?";
        $stmt = $this->conn->prepare($currentImageQuery);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $currentImage = $result->fetch_assoc()['image'] ?? null;

        // Delete the discovery
        $stmt = $this->conn->prepare("DELETE FROM discovertbl WHERE discover_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            // Delete the image if it exists
            if ($currentImage && file_exists($currentImage)) {
                unlink($currentImage); // Delete the old image
            }
            return ["status" => "success", "message" => "Discovery deleted successfully"];
        }
        error_log("Failed to delete discovery");
        return ["status" => "error", "message" => "Failed to delete discovery"];
    }

    // Update discovery
    public function updateDiscover($id, $data) {
        // Fetch the current image path from the database
        $currentImageQuery = "SELECT `image` FROM discovertbl WHERE discover_ID = ?";
        $stmt = $this->conn->prepare($currentImageQuery);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $currentImage = $result->fetch_assoc()['image'] ?? null;

        // Check if a new image is provided
        if (isset($data['image'])) {
            $base64String = $data['image'];
            // Check if the base64 string has a data URL prefix and remove it
            if (preg_match('/^data:image\/(\w+);base64,/', $base64String, $type)) {
                $base64String = substr($base64String, strpos($base64String, ',') + 1);
            }


            $imageData = base64_decode($base64String);
            $imagePath = './../../../../src/assets/uploads/discovery/discovery' . uniqid() . '.jpg'; // Define a unique path for the new image

            // Ensure the directory exists
            if (!is_dir('./../../../../src/assets/uploads/discovery/')) {
                mkdir('./../../../../src/assets/uploads/discovery/', 0777, true); // Create the directory if it doesn't exist
            }

            // Save the new image
            if (file_put_contents($imagePath, $imageData) === false) {
                return ["status" => "error", "message" => "Failed to save new image"];
            }
            $data['image'] = $imagePath; // Update the data to store the new image path

            // Delete the old image if it exists
            if ($currentImage && file_exists($currentImage)) {
                unlink($currentImage); // Delete the old image
            }
        }

        $sql = "UPDATE discovertbl SET Title = ?, Activity = ?, `Description` = ?, Date_start = ?, Date_End = ?, Link = ?, `image` = ? WHERE discover_ID = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssssi", $data['Title'], $data['Activity'], $data['Description'], $data['Date_Start'], $data['Date_End'], $data['Link'], $data['image'], $id);
        
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
