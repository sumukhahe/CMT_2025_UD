<?php
$connection = new mysqli("localhost","root","","biznewsconnect");

// Check connection
if ($connection -> connect_errno) {
  echo "Failed to connect to MySQL: " . $connection -> connect_error;
  exit();
}
?>