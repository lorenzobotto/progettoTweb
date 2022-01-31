<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per controllare se è definita la variabile di sessione
    *                    'searchEvento', per la ricerca tramite barra di ricerca nell'intestazione.
    *    Return:         Il nome dell'evento cercato, se definita, altrimenti 0.
    */
    session_start();
    if (isset($_SESSION['searchEvento'])){
        echo $_SESSION['searchEvento'];
    } else {
        echo 0;
    }
?>