<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per gestire il logout, in modo da distruggere la sessione
    *                    e rigenerare un ID di sessione nuovo.
    */
    session_start();
    session_unset();
    session_destroy();
    session_regenerate_id();
    header('Location: ../../html/index.php');
?>