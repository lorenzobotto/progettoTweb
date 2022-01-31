<?php
    session_start();
    foreach($_SESSION['cart'] as $i => $event){
        if ($event['idEvento'] == $_REQUEST['changeEvento']){
            $_SESSION['cart'][$i]['quantita'] = $_REQUEST['quantita'];
        }
    }
    echo count($_SESSION['cart']);
?>