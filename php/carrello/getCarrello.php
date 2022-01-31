<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per recuperare tutti i biglietti all'interno del carrello.
    *                    Se un utente ha effettuato il login, verrà utilizzato il database,
    *                    altrimenti una variabile array di sessione.
    *    Return:         Oggetto JSON.
    */
    session_start();
    header("Content-type: application/json");

    if (!isset($_SESSION['user'])){
        if (isset($_SESSION['cart'])){
            include("../common/common.php");
            $db = connect_database();
            $ids = "";
            foreach ($_SESSION['cart'] as $row){
                $ids = $ids . $db->quote($row['idEvento']) . ",";
            }
            $queryString = "SELECT * FROM eventi WHERE id IN ('" . substr($ids, 0, -1) . "') ORDER BY FIELD(id, '" . substr($ids, 0, -1) . "')";
            try {
                $cart = $db->prepare($queryString);
                $cart->execute();
            } catch(PDOException $ex){
                die('Error in making query: ' . $ex->getMessage());
            }
            print_results($cart);
        } else {
            print "{\n  \"carrello\": [\n";
            print "  ]\n}\n";
            return;
        }
    } else {
        include("../common/common.php");
        $db = connect_database();
        try {
            $idsDb = $db->prepare("SELECT idEvento FROM carrello WHERE username=" . $db->quote($_SESSION['user']). " ORDER BY data");
            $idsDb->execute();
            $ids = "";
            while($row = $idsDb->fetch()){
                $ids = $ids . $db->quote($row['idEvento']) . ",";
            }
            $cart = $db->prepare("SELECT * FROM eventi WHERE id IN ('" . substr($ids, 0, -1) . "') ORDER BY FIELD(id, '" . substr($ids, 0, -1) . "')");
            $cart->execute();
        } catch(PDOException $ex){
            die('Error in making query: ' . $ex->getMessage());
        }
        print_results($cart);
    }

    /* 
    *  Descrizione: Scorre il risultato della query e restituisce i dati con tipo JSON.
    *  Return:      void (JSON)
    */
    function print_results($cart){
        $matches = 0;
        $dataarray = null;
        while($row = $cart->fetch()){
            $dataarray[] = $row;
            $matches++;
        }

        if ($matches == 0){
            print "{\n  \"carrello\": [\n";
            print "  ]\n}\n";
            return;
        }

        print "{\n  \"carrello\": [\n";
            $matches_found = 0;
            foreach($dataarray as $row){
                $id = trim($row["id"]);
                $titolo = trim($row["titolo"]);
                $descrizione = trim($row["descrizione"]);
                $data = trim($row["data"]);
                $prezzo = trim($row["prezzo"]);
                $citta = trim($row["citta"]);
                $luogo = trim($row["luogo"]);
                $ora = trim($row["ora"]);
                $url = trim($row["url"]);
                print "    {\"id\": \"$id\", \"titolo\": \"$titolo\", \"descrizione\": \"$descrizione\", \"data\": \"$data\", 
                            \"prezzo\": \"$prezzo\", \"citta\": \"$citta\", \"luogo\": \"$luogo\", \"ora\": \"$ora\", \"url\": \"$url\"}";
                if ($matches_found < $matches - 1) {
                    print ",";
                }
                $matches_found++;
                print "\n";
            }
        print "  ]\n}\n";
    }
?>