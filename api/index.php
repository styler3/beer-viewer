<?php

/*
Proxy the BreweryDB API for Cross-Origin security and
to hide the API Key.
*/

$API_KEY = getenv("BDB_API_KEY");
$API_URL = "http://api.brewerydb.com/v2";

//Get the path from the original request; strip the '/api'
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$x = 1; //Must pass by reference
$path = str_replace('/api','',$path,$x);

//Get the query parameters
$query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);

//Build the URL
$URL = $API_URL . $path. '?key=' . $API_KEY . '&' . $query;

//Proxy the request
header('Content-Type: application/json');
print(file_get_contents($URL));


?>
