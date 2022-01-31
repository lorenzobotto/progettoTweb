<?php 
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per inserire tutto il carrello nel database, quando un
    *                    utente effettua il login.
    */
    session_start();
    include("../common/common.php");
    $db = connect_database(); 
    if (isset($_SESSION['cart'])){
        foreach($_SESSION['cart'] as $i => $event){
            try {
                $exists = $db->prepare("SELECT count(*) as count, quantita FROM carrello WHERE username=" . 
                                       $db->quote($_SESSION['user']) . " AND idEvento=" . $db->quote($event['idEvento']));
                $exists->execute();
                $exists2 = $exists->fetch();
                $quantita = $exists2['quantita'] + $event['quantita'];
                if ($exists2['count'] != 0 && $quantita <= 5){
                    $eventadd = $db->prepare("UPDATE carrello SET quantita=" . 
                                             $db->quote($quantita) . " WHERE idEvento=" . $db->quote($event['idEvento']) . 
                                             " AND username=" . $db->quote($_SESSION['user']));
                    $eventadd->execute();
                } else if ($exists2['count'] == 0) {
                    $eventadd = $db->prepare("INSERT INTO carrello (idEvento, quantita, username) VALUES(" . 
                                             $db->quote($event['idEvento']) . "," . $db->quote($event['quantita']) .
                                             "," . $db->quote($_SESSION['user']) . ")");
                    $eventadd->execute();
                } else {
                    if ($exists2['quantita'] != 5){
                        $eventadd = $db->prepare("UPDATE carrello SET quantita=5 WHERE idEvento=" . 
                                                 $db->quote($event['idEvento']) . " AND username=" . 
                                                 $db->quote($_SESSION['user']));
                        $eventadd->execute();
                    }
                }           
            } catch(PDOException $ex){
                die('Error in making query: ' . $ex->getMessage());
            }
        }
        unset($_SESSION['cart']);
    }
?>