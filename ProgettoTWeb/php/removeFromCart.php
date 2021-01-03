<?php 
    session_start(); 
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
            include("common.php");
            $db = connect_database();
            try {
                $delete = $db->prepare("DELETE FROM carrello WHERE idEvento=" . $_REQUEST['removeEvento'] . " AND username=" . $db->quote($_SESSION['user']));
                $delete->execute();
                $count = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                $count->execute();
            } catch(PDOException $ex){
                die('Could not connect: ' . $ex->getMessage());
            }
            echo $count->fetch()["count"];
        }
    } else {
        if (!isset($_SESSION['user'])){
            unset($_SESSION['cart']);
            echo 0;
        } else {
            include("common.php");
            $db = connect_database();
            try {
                $delete = $db->prepare("DELETE FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                $delete->execute();
            } catch(PDOException $ex){
                die('Could not connect: ' . $ex->getMessage());
            }
            echo 0;
        }
    }
?>