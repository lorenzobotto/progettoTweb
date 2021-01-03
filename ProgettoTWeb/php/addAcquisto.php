<?php 

    include("common.php");

    session_start(); 

    $db = connect_database();

    try {
        $maxid = $db->prepare("SELECT MAX(id) as id FROM ordini");
        $maxid->execute();
        $id = $maxid->fetch()["id"];
    } catch(PDOException $ex){
        die('Could not connect: ' . $ex->getMessage());
    }
    if ($id == "NULL"){
        $id = 1;
    } else {
        $id = intval($id) + 1;
    }
    if (!isset($_SESSION['user'])){
        foreach($_SESSION['cart'] as $i => $event){
            try {
                $eventadd = $db->prepare("INSERT INTO ordini VALUES(" . $id . "," . $_SESSION['cart'][$i]['idEvento'] . "," . $_SESSION['cart'][$i]['quantita'] . "," . $db->quote($_SESSION['user']) . "," . $db->quote(date("Y/m/d")) .")");
                $eventadd->execute();
            } catch(PDOException $ex){
                die('Could not connect: ' . $ex->getMessage());
            }
        }
    } else {
        try {
            $cart = $db->prepare("SELECT * FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
            $cart->execute();
            while($row = $cart->fetch()){
                $order = $db->prepare("INSERT INTO ordini VALUES(" . $id . "," . $row['idEvento'] . "," . $row['quantita'] . "," . $db->quote($row['username']) . "," . $db->quote(date("Y/m/d")) .")");
                echo "INSERT INTO ordini VALUES(" . $id . "," . $row['idEvento'] . "," . $row['quantita'] . "," . $db->quote($row['username']) . "," . $db->quote(date("Y/m/d")) .")";
                $order->execute();
            }
        } catch(PDOException $ex){
            die('Could not connect: ' . $ex->getMessage());
        }
    }    
?>