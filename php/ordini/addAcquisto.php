<?php 
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per inserire tutti i biglietti del carrello, nel database,
    *                    quindi per completare un acquisto (ordine).
    */
    include("../common/common.php");

    session_start(); 

    $db = connect_database();

    try {
        $maxid = $db->prepare("SELECT MAX(id) as id FROM ordini");
        $maxid->execute();
        $id = $maxid->fetch()["id"];
    } catch(PDOException $ex){
        die('Error in making query: ' . $ex->getMessage());
    }
    if ($id == "NULL"){
        $id = 1;
    } else {
        $id = intval($id) + 1;
    }
    try {
        $cart = $db->prepare("SELECT * FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
        $cart->execute();
        while($row = $cart->fetch()){
            $order = $db->prepare("INSERT INTO ordini VALUES(" . $db->quote($id) . "," . 
                                  $db->quote($row['idEvento']) . "," . $db->quote($row['quantita']) . 
                                  "," . $db->quote($row['username']) . "," . 
                                  $db->quote(date("Y/m/d")) .")");
            $order->execute();
        }
    } catch(PDOException $ex){
        die('Error in making query: ' . $ex->getMessage());
    }  
?>