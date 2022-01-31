<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per il sito che contiene le funzioni comuni a più file PHP.
    */

    /*
    * Descrizione:  Connessione al database tramite PDO.
    * Return:       PDO
    */
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