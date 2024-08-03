<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "maps_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$latitude = 17.665462;
$longitude = 83.216487;
$radius = 5;

$sql = "SELECT id, latitude, longitude, 
        (6371 * acos(cos(radians($latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians($longitude)) + sin(radians($latitude)) * sin(radians(latitude)))) AS distance 
        FROM coordinates 
        HAVING distance <= $radius 
        ORDER BY distance";

$result = $conn->query($sql);

$points = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $points[] = $row;
    }
} 

$conn->close();

header('Content-Type: application/json');
echo json_encode($points);
?>
