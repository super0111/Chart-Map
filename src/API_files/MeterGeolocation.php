<?
if($_SERVER['REQUEST_METHED']=='POST'){
    $incomingContentType = $_SERVER['CONTENT_TYPE'];
    if($incomingContentType !='application/json'){
        header($_SERVER['SERVER_PROTOCOL'].'500 internal server error');
        exit();
    }

    $content = trim(file_get_content("php://input"));
    $decode = json_decode($content,true);
    $data = array();

    $AppplicationKey= 'StartGRID2020';
	if($decode['key']==$AppplicationKey){
        define('DB_USERNAME', 'stargrid_Kamati');
        define('DB_PASSWORD', 'DfSXfz4GEdBd2tu');
        define('DB_HOST', 'localhost:3306');
        define('DB_NAME', 'stargrid_MeterData');
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        $query = $decode['SQLQuery'];
        if(mysqli_query($conn,$query)){
            $result = mysqli_query($conn,$query);
            $responce = array();
            while($row=mysqli_fetch_array($result)){
                array_push($responce,array('ID'=>$row[0],
                                        'meterNumber'=>$row[1],
                                        'UserName'=>$row[2],
                                        'Longitude'=>$row[3],
                                        'Lat'=>$row[4],
                                        'Type'=>$row[5],
                                        'Status'=>$row[6],
                                        'PowerSupply'=>$row[7],));

            }
            echo json_encode(array('Server_response' => $responce));
            mysqli_close($conn)

        }



    }else {
      header($_SERVER['SERVER_PROTOCOL'].'500 internal server error');
    exit();  
    }
}


?>