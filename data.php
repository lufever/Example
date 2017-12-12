<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  
header('Access-Control-Allow-Headers: Content-Type'); 
function array_remove($data, $key){  
    if(!array_key_exists($key, $data)){  
        return $data;  
    }  
    $keys = array_keys($data);  
    $index = array_search($key, $keys);  
    if($index !== FALSE){  
        array_splice($data, $index, 1);  
    }  
    return $data;  
}  

header('Content-type: application/json');

if( array_key_exists("referurl",$_REQUEST)){	
$request=array_remove($_REQUEST,"referurl");
$url=$_REQUEST["referurl"] ;  
$dash= strpos($url,'?')?'&':'?'; 
$url=$url.$dash.http_build_query($request); 
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url); 
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);//这个是重点。
$res = curl_exec($curl);
curl_close($curl);
print_r($res);
}


else{
	echo "{\"error\":\"referurl parameter should not be empty! like http://localhost:8023/data.php?referurl=http://192.168.1.212:8080/api/daterange\"}";	
}
?>