<?php 
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per rimuovere un biglietto (o tutti) dal carrello.
    *                    Se un utente ha effettuato il login, verrà utilizzato il database,
    *                    altrimenti una variabile array di sessione.
    *    Return:         Il numero dei biglietti all'interno del carrello.
    */
    session_start(); 
    
    //  Se non è definito il parametro all, allora si eliminerà solo un biglietto dal carrello    
    if (!isset($_REQUEST['all'])){
        if (!isset($_SESSION['user'])){
            foreach($_SESSION['cart'] as $i => $event){
                if ($event['idEvento'] == $_REQUEST['removeEvento']){
                    unset($_SESSION['cart'][$i]);
                    $_SESSION['cart'] = array_values($_SESSION['cart']);
                }
            }
            echo count($_SESSION['cart']);
        } else {
            include("../common/common.php");
            $db = connect_database();
            try {
                $delete = $db->prepare("DELETE FROM carrello WHERE idEvento=" . 
                                       $db->quote($_REQUEST['removeEvento']) . 
                                       " AND username=" . $db->quote($_SESSION['user']));
                $delete->execute();
                $count = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                $count->execute();
            } catch(PDOException $ex){
                die('Error in making query: ' . $ex->getMessage());
            }
            echo $count->fetch()["count"];
        }
    //  Altrimenti si elimineranno tutti i biglietti dal carrello (si svuota il carrello)   
    } else {
        if (!isset($_SESSION['user'])){
            unset($_SESSION['cart']);
            echo 0;
        } else {
            include("../common/common.php");
            $db = connect_database();
            try {
                $delete = $db->prepare("DELETE FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                $delete->execute();
            } catch(PDOException $ex){
                die('Error in making query: ' . $ex->getMessage());
            }
            echo 0;
        }
    }
?>