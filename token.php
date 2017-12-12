<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  



 
$url="http://www.x.com/login.cshtml";
$curl = curl_init();

curl_setopt($curl, CURLOPT_URL,$url ); 

curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl,CURLOPT_POSTFIELDS,'username=x&password=y');
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl,CURLOPT_HTTPHEADER, array(
        'Cookie:ASP.NET_SessionId=ovmoihtgt4xuuzwtnitwwdn0',
      ));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);//这个是重点。
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
$res = curl_exec($curl);
curl_close($curl);
 print_r($res);

?>