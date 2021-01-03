<?php
    include("common.php");

    $db = connect_database(); 

    try{
        $password = $_REQUEST["password"];
        $salt = "progettotweb";
        $encrypted_password = sha1($password.$salt);
        $user = $db->prepare("INSERT INTO utenti VALUES ('" . $_REQUEST["email"] . "','" . $_REQUEST["username"] . "','" . $encrypted_password . "')");
        $user->execute();
        echo 1;
    } catch(PDOException $ex){
        echo 0;
    }
?>