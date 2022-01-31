<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per recuperare la quantità di un biglietto del carrello.
    *                    Se un utente ha effettuato il login, verrà utilizzato il database,
    *                    altrimenti una variabile array di sessione.
    *    Return:         Il numero della quantità del biglietto.
    */
    session_start(); 
    if (!isset($_SESSION['user'])){
        foreach($_SESSION['cart'] as $i => $event){
            if ($event['idEvento'] == $_REQUEST['idEvento']){
                echo $event['quantita'];
            }
        }
    } else {
        include("../common/common.php");
        $db = connect_database();
        try {
            $quantity = $db->prepare("SELECT quantita FROM carrello WHERE idEvento=" . 
                                     $db->quote($_REQUEST['idEvento']) . " AND username=" . 
                                     $db->quote($_SESSION['user']));
            $quantity->execute();
            echo $quantity->fetch()["quantita"];
        } catch(PDOException $ex){
            die('Error in making query: ' . $ex->getMessage());
        }
    }
?>