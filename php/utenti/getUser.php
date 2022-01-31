<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per controllare se un utente esiste nel database.
    *    Return:         1, se esiste, altrimenti 0.
    */
    include("../common/common.php");

    $db = connect_database(); 
    try{
        $password = filter_var($_REQUEST["password"], FILTER_SANITIZE_STRING);
        $salt = "progettotweb";
        $encrypted_password = sha1($password.$salt);
        $user = $db->prepare("SELECT count(*) as count
                              FROM utenti
                              WHERE username=" . filter_var($db->quote($_REQUEST["username"], FILTER_SANITIZE_STRING)) . " " .
                              "AND password=" . $db->quote($encrypted_password));
        $user->execute();
        $count = $user->fetch()["count"];
        if ($count > 0){
            session_start();
            $_SESSION['user'] = $_REQUEST["username"];
            echo 1;
        } else {
            echo 0;
        }
    } catch(PDOException $ex){
        echo -1;
    }
?>