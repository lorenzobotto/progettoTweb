<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per definire la variabile di sessione 'option',
    *                    utile per selezionare in automatico la categoria e visualizzare
    *                    subito i risultati nella pagina degli eventi.
    */
    session_start();
    $_SESSION['option'] = $_REQUEST['optionSelected'];
?>