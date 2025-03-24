<?php
require_once __DIR__ . '/../../../config/connect_db.php';

class AvatarFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all avatars
    public function getAllAvatars() {
        $sql = "SELECT `Avatar_Id`, `Person_Id`, `image` FROM `avatartbl` WHERE 1";
        
        $result = $this->conn->query($sql);
        
        if ($result) {
            $avatars = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $avatars];
        }
        return ["status" => "error", "message" => "Failed to fetch avatars"];
    }

    // Add new avatar
    public function addAvatar($data) {
        // Check if image data is provided
        if (isset($data['image'])) {
            $base64String = $data['image'];
            // Check if the base64 string has a data URL prefix and remove it
            if (preg_match('/^data:image\/(\w+);base64,/', $base64String, $type)) {
                $base64String = substr($base64String, strpos($base64String, ',') + 1);
            }

            $imageData = base64_decode($base64String);
            $imagePath = './../../../../src/assets/uploads/avatar/' . uniqid() . '.jpg'; // Define a unique path for the image

            // Ensure the directory exists
            if (!is_dir('./../../../../src/assets/uploads/avatar/')) {
                mkdir('./../../../../src/assets/uploads/avatar/', 0777, true); // Create the directory if it doesn't exist
            }

            // Save the image
            if (file_put_contents($imagePath, $imageData) === false) {
                return ["status" => "error", "message" => "Failed to save image"];
            }
            $data['image'] = $imagePath; // Update the data to store the image path
        } else {
            return ["status" => "error", "message" => "No image data provided"];
        }

        $sql = "INSERT INTO `avatartbl` (`Person_Id`, `image`) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss", $data['Person_Id'], $data['image']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Avatar added successfully"];
        }
        error_log("Failed to add avatar");
        return ["status" => "error", "message" => "Failed to add avatar"];
    }

    // Update avatar
    public function updateAvatar($id, $data) {
        // First, retrieve the current image path to delete the old file
        $sql = "SELECT `image` FROM `avatartbl` WHERE `Avatar_Id` = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $avatar = $result->fetch_assoc();

        if ($avatar) {
            // Delete the old image file from the server
            if (file_exists($avatar['image'])) {
                unlink($avatar['image']);
            }
        }

        // Check if image data is provided
        if (isset($data['image'])) {
            $base64String = $data['image'];
            $imageData = base64_decode($base64String);
            $imagePath = './../../../../src/assets/uploads/avatar/' . uniqid() . '.jpg'; // Define a unique path for the image

            // Ensure the directory exists
            if (!is_dir('./../../../../src/assets/uploads/avatar/')) {
                mkdir('./../../../../src/assets/uploads/avatar/', 0777, true); // Create the directory if it doesn't exist
            }

            // Save the image
            if (file_put_contents($imagePath, $imageData) === false) {
                return ["status" => "error", "message" => "Failed to save image"];
            }
            $data['image'] = $imagePath; // Update the data to store the image path
        }

        $sql = "UPDATE `avatartbl` SET `Person_Id` = ?, `image` = ? WHERE `Avatar_Id` = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssi", $data['Person_Id'], $data['image'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Avatar updated successfully"];
        }
        error_log("Failed to update avatar");
        return ["status" => "error", "message" => "Failed to update avatar"];
    }

    // Delete avatar
    public function deleteAvatar($id) {
        // First, retrieve the image path to delete the file
        $sql = "SELECT `image` FROM `avatartbl` WHERE `Avatar_Id` = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $avatar = $result->fetch_assoc();

        if ($avatar) {
            // Delete the image file from the server
            if (file_exists($avatar['image'])) {
                unlink($avatar['image']);
            }
        }

        $stmt = $this->conn->prepare("DELETE FROM `avatartbl` WHERE `Avatar_Id` = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Avatar deleted successfully"];
        }
        error_log("Failed to delete avatar");
        return ["status" => "error", "message" => "Failed to delete avatar"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$avatarFunctions = new AvatarFunctions();
$action = $_GET['action'] ?? '';

$allowedActions = ['get', 'add', 'update', 'delete'];
if (!in_array($action, $allowedActions, true)) {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($avatarFunctions->getAllAvatars());
            break;
            
        case 'add':
            echo json_encode($avatarFunctions->addAvatar($data));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($avatarFunctions->updateAvatar($id, $data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($avatarFunctions->deleteAvatar($id));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?> 