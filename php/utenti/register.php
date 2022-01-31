<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per effettuare la registrazione di un nuovo utente.
    *    Return:         Stringa di errore, in caso di errore, altrimenti 1.
    */
    include("../common/common.php");

    $db = connect_database(); 
    //  Si controlla che il formato della email sia valido
    if (filter_var($_REQUEST["email"], FILTER_VALIDATE_EMAIL)){
        $password = filter_var($_REQUEST["password"], FILTER_SANITIZE_STRING);
        /*  Se la password sanificata è diversa dalla password arrivata come parametro,
        *   allora si restituisce un errore.
        */
        if ($password != $_REQUEST["password"]){
            echo "Password con caratteri non validi";
            return;
        }
        /*  Se l'username sanificato è diverso dall'username arrivato come parametro,
        *   allora si restituisce un errore.
        */
        if (filter_var($_REQUEST["username"], FILTER_SANITIZE_STRING) != $_REQUEST["username"]){
            echo "Username con caratteri non validi!";
            return;
        }
        $salt = "progettotweb";
        $encrypted_password = sha1($password.$salt);
        //  Si controlla se l'email è già utilizzata
        try{
            $emailControl = $db->prepare("SELECT COUNT(*) as count FROM utenti WHERE email=" . $db->quote($_REQUEST["email"]));
            $emailControl->execute();
            if ($emailControl->fetch()["count"] != 0 ) {
                echo "Email già utilizzata!";
                return;
            }
        } catch(PDOException $ex){
            die('Error in making query: ' . $ex->getMessage());
        }
        //  Si controlla se l'username è già utilizzato
        try{
            $usernameControl = $db->prepare("SELECT COUNT(*) as count FROM utenti WHERE username=" . $db->quote($_REQUEST["username"]));
            $usernameControl->execute();
            if ($usernameControl->fetch()["count"] != 0 ) {
                echo "Username già utilizzato!";
                return;
            }
        } catch(PDOException $ex){
            die('Error in making query: ' . $ex->getMessage());
        }
        try{
            $user = $db->prepare("INSERT INTO utenti VALUES (" . $db->quote($_REQUEST["email"]) . "," . 
                                 $db->quote(filter_var($_REQUEST["username"], FILTER_SANITIZE_STRING)) . 
                                 "," . $db->quote($encrypted_password) . ")");
            $user->execute();
            echo 1;
        } catch(PDOException $ex){
            die('Error in making query: ' . $ex->getMessage());
        }
    } else {
        echo "Email non valida";
    } 
?>