<?php
    function connect_database(){
        $connectstr = "mysql:dbname=dailyticket;host=eu-cdbr-west-02.cleardb.net";
        try {
            $db = new PDO($connectstr, "b0523d51feff63", "3e6a2459");
        } catch(PDOException $ex){
            die('Could not connect: ' . $ex->getMessage());
        }
        return $db;
    }
?>