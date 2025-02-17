<?php
class ErrorHandler {
    public static function handleError($errno, $errstr, $errfile, $errline) {
        $error = [
            "status"    => "error",
            "type"      => "Runtime Error",
            "message"   => $errstr,
            "file"      => $errfile,
            "line"      => $errline
        ];

        self::outputError($error);
        return true;
    }

    public static function handleException($exception) {
        $error = [
            "status"    => "error",
            "type"      => "Exception",
            "message"   => $exception->getMessage(),
            "file"      => $exception->getFile(),
            "line"      => $exception->getLine()
        ];

        self::outputError($error);
    }

    public static function handleFatalError() {
        $error = error_get_last();
        if ($error !== null && $error["type"] === E_ERROR) {
            $errorData = [
                "status"    => "error",
                "type"      => "Fatal Error",
                "message"   => $error["message"],
                "file"      => $error["file"],
                "line"      => $error["line"]
            ];

            self::outputError($errorData);
        }
    }

    private static function outputError($error) {
        header('Content-Type: application/json');
        // Only show detailed error info in development
        if ($_SERVER['SERVER_NAME'] === 'localhost') {
            echo json_encode($error);
        } else {
            // In production, show generic error
            echo json_encode([
                "status"    => "error",
                "message"   => "An error occurred. Please try again later."
            ]);
        }
        exit();
    }
}

// Set error handlers
set_error_handler([ErrorHandler::class, 'handleError']);
set_exception_handler([ErrorHandler::class, 'handleException']);
register_shutdown_function([ErrorHandler::class, 'handleFatalError']);

// Disable error reporting to prevent double error messages
error_reporting(0);
?> 