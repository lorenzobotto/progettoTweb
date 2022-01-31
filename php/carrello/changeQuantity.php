<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per modificare la quantità quando un utente la modifica dal
    *                    carrello. Se un utente ha effettuato il login, verrà utilizzato il database,
    *                    altrimenti una variabile array di sessione.
    *    Return:         Stringa di errore, in caso di errore, altrimenti nulla.
    */
    session_start();
    if (!isset($_SESSION['user'])){
        if (preg_match('/^[1-5]$/', $_REQUEST['quantita'])) {
            foreach($_SESSION['cart'] as $i => $event){
                if ($event['idEvento'] == $_REQUEST['changeEvento']){
                    $_SESSION['cart'][$i]['quantita'] = $_REQUEST['quantita'];
                }
            }
        } else {
            echo "Errore quantità";
        }
    } else {
        include("../common/common.php");
        $db = connect_database();
        if (preg_match('/^[1-5]$/', $_REQUEST['quantita'])) {
            try {
                $eventchange = $db->prepare("UPDATE carrello SET quantita=" . $db->quote($_REQUEST['quantita']) . 
                                            " WHERE idEvento=" . $db->quote($_REQUEST['changeEvento']) . 
                                            " AND username=" . $db->quote($_SESSION['user']));
                $eventchange->execute();       
            } catch(PDOException $ex){
                die('Error in making query: ' . $ex->getMessage());
            }
        } else {
            echo "Errore quantità";
        }
    }    
?>