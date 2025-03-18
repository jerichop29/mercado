<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../src/models/php/ErrorHandler.php';

class Database {
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "mercado-database";
    private $conn;

    public function __construct() {
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
            
            if ($this->conn->connect_error) {
                throw new Exception("Database connection failed: " . $this->conn->connect_error);
            }

            // Set charset to handle special characters
            if (!$this->conn->set_charset("utf8mb4")) {
                throw new Exception("Error setting charset: " . $this->conn->error);
            }
        } catch (Exception $e) {
            throw new Exception("Connection error: " . $e->getMessage());
        }
    }

    public function getConnection() {
        if (!$this->conn) {
            throw new Exception("Database connection not established");
        }
        return $this->conn;
    }

    public function closeConnection() {
        if ($this->conn) {
            try {
                $this->conn->close();
            } catch (Exception $e) {
                throw new Exception("Error closing connection: " . $e->getMessage());
            }
        }
    }

    public function query($sql) {
        try {
            $result = $this->conn->query($sql);
            if ($result === false) {
                throw new Exception("Query failed: " . $this->conn->error);
            }
            return $result;
        } catch (Exception $e) {
            throw new Exception("Query error: " . $e->getMessage());
        }
    }

    public function prepare($sql) {
        try {
            $stmt = $this->conn->prepare($sql);
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $this->conn->error);
            }
            return $stmt;
        } catch (Exception $e) {
            throw new Exception("Prepare error: " . $e->getMessage());
        }
    }
}

?>