<?php 
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per inserire un biglietto all'interno del carrello.
    *                    Se un utente ha effettuato il login, verrà utilizzato il database,
    *                    altrimenti una variabile array di sessione.
    *    Return:         Il numero dei biglietti nel carrello, se aggiunto.
    *                    0, se è stato raggiunto il limite di 5 biglietti.
    *                    Diverse stringhe di errore, nel caso di errori.
    */
    session_start(); 
    if (isset($_REQUEST['addEvento'])){
        if (!isset($_SESSION['user'])){
            if (isset($_SESSION['cart'])){
                if (preg_match('/^[1-5]$/', $_REQUEST['quantita'])) {
                    foreach($_SESSION['cart'] as $i => $event){
                        if ($event['idEvento'] == $_REQUEST['addEvento']){
                            $quantita = $event['quantita'] + $_REQUEST['quantita'];
                            if ($quantita <= 5){
                                $_SESSION['cart'][$i]['quantita'] = $quantita;
                                echo count($_SESSION['cart']);
                                return;
                            } else {
                                if ($_SESSION['cart'][$i]['quantita'] != 5){
                                    $_SESSION['cart'][$i]['quantita'] = 5;
                                }
                                if ($event['quantita'] != 5 && $quantita > 5){
                                    echo "Biglietti aggiunti e limite raggiunto!";
                                    return;
                                }
                                echo 0;
                                return;
                            }
                        }
                    }
                    $count = count($_SESSION['cart']);
                    $item_array = array(
                        'idEvento' => $_REQUEST['addEvento'],
                        'quantita' => $_REQUEST['quantita']
                    );
                    $_SESSION['cart'][$count] = $item_array;
                    $count++;
                    echo $count;
                } else {
                    die('Quantità non valida');
                }
            } else {
                $item_array = array(
                    'idEvento' => $_REQUEST['addEvento'],
                    'quantita' => $_REQUEST['quantita']
                );
                $_SESSION['cart'][0] = $item_array;
                echo 1;
            }
        } else {
            include("../common/common.php");
            $db = connect_database();
            if (preg_match('/^[1-5]$/', $_REQUEST['quantita'])) {
                try {
                    $exists = $db->prepare("SELECT count(*) as count, quantita FROM carrello WHERE username=" . 
                                           $db->quote($_SESSION['user']) . " AND idEvento=" . 
                                           $db->quote($_REQUEST['addEvento']));
                    $exists->execute();
                    $exists2 = $exists->fetch();
                    $quantita = $exists2['quantita'] + $_REQUEST['quantita'];
                    if ($exists2['count'] != 0 && $quantita <= 5){
                        $eventadd = $db->prepare("UPDATE carrello SET quantita=" . $db->quote($quantita) . 
                                                 " WHERE idEvento=" . $db->quote($_REQUEST['addEvento']) . 
                                                 " AND username=" . $db->quote($_SESSION['user']));
                        $eventadd->execute();
                        $count = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                        $count->execute();
                    } else if ($exists2['count'] == 0) {
                        $eventadd = $db->prepare("INSERT INTO carrello (idEvento, quantita, username) VALUES(" . 
                                                 $db->quote($_REQUEST['addEvento']) . "," . $db->quote($_REQUEST['quantita']) . 
                                                 "," . $db->quote($_SESSION['user']) . ")");
                        $eventadd->execute();
                        $count = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                        $count->execute();
                    } else {
                        if ($exists2['quantita'] != 5){
                            $eventadd = $db->prepare("UPDATE carrello SET quantita=5 WHERE idEvento=" . 
                                                     $db->quote($_REQUEST['addEvento']) . " AND username=" . 
                                                     $db->quote($_SESSION['user']));
                            $eventadd->execute();
                        }
                        echo 0;
                        return;
                    }            
                } catch(PDOException $ex){
                    die('Error in making query: ' . $ex->getMessage());
                }
                echo $count->fetch()["count"];
            } else {
                die('Quantità non valida');
            }
        }
    }
?>