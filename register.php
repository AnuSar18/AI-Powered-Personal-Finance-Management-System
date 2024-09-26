<?php
// Database connection settings
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = "sukh1234"; // Replace with your database password
$dbname = "demo"; // Replace with your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$salary = $_POST['salary'];
$short_term_goal = $_POST['short_term_goal'];
$years_to_reach_short_term_goal = $_POST['years_to_reach_short_term_goal'];
$long_term_goal = $_POST['long_term_goal'];
$years_to_reach_long_term_goal = $_POST['years_to_reach_long_term_goal'];
$loan_taken = $_POST['loan_taken'];
$loan_amount = $_POST['loan_amount'];
$savings_goal = $_POST['savings_goal'];
$goal_years = $_POST['goal_years'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO registrations (name, salary, short_term_goal, years_to_reach_short_term_goal, long_term_goal, years_to_reach_long_term_goal, loan_taken, loan_amount, savings_goal, goal_years) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sdssssiids", $name, $salary, $short_term_goal, $years_to_reach_short_term_goal, $long_term_goal, $years_to_reach_long_term_goal, $loan_taken, $loan_amount, $savings_goal, $goal_years);

// Execute the statement
if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
