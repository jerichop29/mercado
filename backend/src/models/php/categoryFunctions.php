<?php
require_once __DIR__ . '/../../../config/connect_db.php';
class CategoriesFunctions {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all categories
    public function getAllCategories() {
        $sql = "SELECT Categories_Id, Title, Description FROM categoriestbl WHERE 1";
        $result = $this->conn->query($sql);
        
        if ($result) {
            $categories = $result->fetch_all(MYSQLI_ASSOC);
            return ["status" => "success", "data" => $categories];
        }
        return ["status" => "error", "message" => "Failed to fetch categories"];
    }

    // Add new category
    public function addCategory($data) {
        $sql = "INSERT INTO categoriestbl (Title, Description) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss", $data['Title'], $data['Description']);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Category added successfully"];
        }
        error_log("Failed to add category");
        return ["status" => "error", "message" => "Failed to add category"];
    }

    // Delete category
    public function deleteCategory($id) {
        $stmt = $this->conn->prepare("DELETE FROM categoriestbl WHERE Categories_Id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Category deleted successfully"];
        }
        error_log("Failed to delete category");
        return ["status" => "error", "message" => "Failed to delete category"];
    }

    // Update category
    public function updateCategory($id, $data) {
        $sql = "UPDATE categoriestbl SET Title = ?, Description = ? WHERE Categories_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssi", $data['Title'], $data['Description'], $id);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Category updated successfully"];
        }
        error_log("Failed to update category");
        return ["status" => "error", "message" => "Failed to update category"];
    }
    
    // Get category by ID
    public function getCategoryById($id) {
        $sql = "SELECT Categories_Id, Title, Description FROM categoriestbl WHERE Categories_Id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result && $result->num_rows > 0) {
            $category = $result->fetch_assoc();
            return ["status" => "success", "data" => $category];
        }
        return ["status" => "error", "message" => "Category not found"];
    }
}

// Handle incoming requests
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$categoriesFunctions = new CategoriesFunctions();
$action = $_GET['action'] ?? '';

$allowedActions = ['get', 'getById', 'add', 'delete', 'update'];
if (!in_array($action, $allowedActions, true)) {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($action) {
        case 'get':
            echo json_encode($categoriesFunctions->getAllCategories());
            break;
            
        case 'getById':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($categoriesFunctions->getCategoryById($id));
            break;
            
        case 'add':
            echo json_encode($categoriesFunctions->addCategory($data));
            break;
            
        case 'delete':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($categoriesFunctions->deleteCategory($id));
            break;
            
        case 'update':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "Missing or invalid ID"]);
                exit();
            }
            echo json_encode($categoriesFunctions->updateCategory($id, $data));
            break;
        default:
            throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>