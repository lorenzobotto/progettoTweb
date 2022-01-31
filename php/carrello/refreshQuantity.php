<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per aggiornare il prezzo totale e il numero totale dei
    *                    biglietti, quando si modifica la quantità nel carrello.
    *                    Se un utente ha effettuato il login, verrà utilizzato il database,
    *                    altrimenti una variabile array di sessione.
    *    Return:         Oggetto JSON.
    */
    session_start();
    include("../common/common.php");
    header("Content-type: application/json");
    $db = connect_database();
    if (!isset($_SESSION['user'])){
        $totalprice = 0;
        $quantita = 0;
        $quantitaArray = array();
        $i = 0;
        $ids = "";
        foreach ($_SESSION['cart'] as $row){
            $ids = $ids . $db->quote($row['idEvento']) . ",";
            array_push($quantitaArray, $row['quantita']);
            $quantita += intval($row['quantita']);
            $i++;
        }
        $i = 0;
        try {
            $price = $db->prepare("SELECT prezzo FROM eventi WHERE id IN(" . substr($ids, 0, -1) . 
                                  ") ORDER BY FIELD(id, " . substr($ids, 0, -1) . ")");
            $price->execute();
        } catch(PDOException $ex){
            die('Error in making query: ' . $ex->getMessage());
        }
        while ($row = $price->fetch()){
            $totalprice += $quantitaArray[$i] * floatval(str_replace(",", ".", $row['prezzo']));
            $i++;
        }
        $stringTotalPrice = str_replace(".", ",", strval(number_format($totalprice, 2)));
        print "{\n  \"totale\": [\n";
        print "    {\"prezzo\": \"$stringTotalPrice\", \"quantita\": \"$quantita\", \"quantitaSelect\": \"";
        $i = 0;
        foreach($quantitaArray as $row){
            if ((count($quantitaArray) - 1) == $i){
                print $row;
            } else {
                print $row . ",";
            }
            $i++;
        }
        print "\"}";
        print "  ]\n}\n";
    } else {
        try {
            $events = $db->prepare("SELECT quantita, prezzo FROM eventi AS e, carrello AS c WHERE e.id = c.idEvento and username=" . 
                                   $db->quote($_SESSION['user']) . " group by idEvento ORDER BY c.data");
            $events->execute();       
        } catch(PDOException $ex){
            die('Error in making query: ' . $ex->getMessage());
        }
        $quantita = 0;
        $totalprice = 0;
        $quantitaArray = array();
        while($row = $events->fetch()){
            $quantita += intval($row['quantita']);
            array_push($quantitaArray, $row['quantita']);
            $totalprice += intval($row['quantita']) * floatval(str_replace(",", ".", $row['prezzo']));
        }
        $stringTotalPrice = str_replace(".", ",", strval(number_format($totalprice, 2)));
        print "{\n  \"totale\": [\n";
        print "    {\"prezzo\": \"$stringTotalPrice\", \"quantita\": \"$quantita\", \"quantitaSelect\": \"";
        $i = 0;
        foreach($quantitaArray as $row){
            if ((count($quantitaArray) - 1) == $i){
                print $row;
            } else {
                print $row . ",";
            }
            $i++;
        }
        print "\"}";
        print "  ]\n}\n";
    }    
?>