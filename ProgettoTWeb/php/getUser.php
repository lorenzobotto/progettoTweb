<?php
    include("common.php");

    $db = connect_database(); 

    try{
        $password = $_REQUEST["password"];
        $salt = "progettotweb";
        $encrypted_password = sha1($password.$salt);
        $user = $db->prepare("SELECT count(*) as count
                              FROM utenti
                              WHERE username='" . $_REQUEST["username"] . "' " .
                              "AND password='" . $encrypted_password . "'");
        $user->execute();
        $count = $user->fetch()["count"];
        if ($count > 0){
            session_start();
            session_unset();
            session_destroy();
            session_start();
            session_regenerate_id();
            $_SESSION['user'] = $_REQUEST["username"];
            echo 1;
        } else {
            echo 0;
        }
    } catch(PDOException $ex){
        echo -1;
    }
?>