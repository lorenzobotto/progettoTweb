<?php
    function connect_database(){
        $connectstr = "mysql:dbname=dailyticket;host=localhost:3306";
        try {
            $db = new PDO($connectstr, "root", "");
        } catch(PDOException $ex){
            die('Could not connect: ' . $ex->getMessage());
        }
        return $db;
    }
?>