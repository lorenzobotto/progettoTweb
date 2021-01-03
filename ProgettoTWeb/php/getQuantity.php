<?php
    session_start(); 
    if (!isset($_SESSION['user'])){
        foreach($_SESSION['cart'] as $i => $event){
            if ($event['idEvento'] == $_REQUEST['idEvento']){
                echo $event['quantita'];
            }
        }
    } else {
        include("common.php");
        $db = connect_database();
        try {
            $quantity = $db->prepare("SELECT quantita FROM carrello WHERE idEvento=" . $_REQUEST['idEvento'] . " AND username=" . $db->quote($_SESSION['user']));
            $quantity->execute();
            echo $quantity->fetch()["quantita"];
        } catch(PDOException $ex){
            die('Could not connect: ' . $ex->getMessage());
        }
    }
?>