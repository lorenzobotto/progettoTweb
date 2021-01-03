<?php 
    session_start(); 
    if (isset($_REQUEST['addEvento'])){
        if (isset($_SESSION['cart'])){
            $item_array_id = array_column($_SESSION['cart'], "idEvento");
            if (in_array($_REQUEST['addEvento'], $item_array_id)){
                echo 0;
            } else {
                $count = count($_SESSION['cart']);
                $item_array = array(
                    'idEvento' => $_REQUEST['addEvento'],
                    'quantita' => $_REQUEST['quantita']
                );
                $_SESSION['cart'][$count] = $item_array;
                $count++;
                echo $count;
            }
        } else if (isset($_SESSION['user'])){
            include("common.php");
            $db = connect_database();
            try {
                $exists = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']) . " AND idEvento=" . $_REQUEST['addEvento']);
                $exists->execute();
                if ($exists->fetch()['count'] == 0){
                    $eventadd = $db->prepare("INSERT INTO carrello (idEvento, quantita, username) VALUES(" . $db->quote($_REQUEST['addEvento']) . "," . $_REQUEST['quantita'] . "," . $db->quote($_SESSION['user']) . ")");
                    $eventadd->execute();
                    $count = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                    $count->execute();
                } else {
                    echo 0;
                    return;
                }                
            } catch(PDOException $ex){
                die('Could not connect: ' . $ex->getMessage());
            }
            echo $count->fetch()["count"];
        } else {
            $item_array = array(
                'idEvento' => $_REQUEST['addEvento'],
                'quantita' => $_REQUEST['quantita']
            );
            $_SESSION['cart'][0] = $item_array;
            echo 1;
        }
    }
?>