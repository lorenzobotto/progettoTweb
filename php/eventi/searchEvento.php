<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per definire la variabile di sessione 'searchEvento',
    *                    utile per la ricerca tramite barra di ricerca nell'intestazione.
    */
    session_start();
    $_SESSION['searchEvento'] = filter_var($_REQUEST['evento'], FILTER_SANITIZE_STRING);
?>