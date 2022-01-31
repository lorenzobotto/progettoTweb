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
        $connectstr = "mysql:dbname=heroku_ee44f4558f1cfea;host=eu-cdbr-west-02.cleardb.net";
        try {
            $db = new PDO($connectstr, "b0523d51feff63", "3e6a2459");
        } catch(PDOException $ex){
            die('Could not connect: ' . $ex->getMessage());
        }
        return $db;
    }
?>