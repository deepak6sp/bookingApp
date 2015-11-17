<?php  

	require "connection.php";

	$data=array();
	$location_information = array();

	$cites_information = $conn->query("select * from location");
	while($row = $cites_information->fetch_assoc()){
	    $data["location_name"] = $row['location_name'];
	    array_push($location_information,$data);
	}
	echo json_encode($location_information);

?>