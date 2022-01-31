<?php
    session_start();
    header("Content-type: application/json");

    if (isset($_SESSION['cart'])){
        include("common.php");
        $db = connect_database();
        $queryString = "SELECT * FROM eventi WHERE id=";
        foreach ($_SESSION['cart'] as $row){
            $queryString = $queryString . $row['idEvento'] . " OR id=";
        }
        try {
            $cart = $db->prepare($queryString.substr(0, -7));
            $cart->execute();
        } catch(PDOException $ex){
            die('Could not connect: ' . $ex->getMessage());
        }
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
                $artista = trim($row["artista"]);
                $descrizione = trim($row["descrizione"]);
                $data = trim($row["data"]);
                $prezzo = trim($row["prezzo"]);
                $citta = trim($row["citta"]);
                $luogo = trim($row["luogo"]);
                $ora = trim($row["ora"]);
                $url = trim($row["url"]);
                print "    {\"id\": \"$id\", \"titolo\": \"$titolo\", \"artista\": \"$artista\", \"descrizione\": \"$descrizione\", \"data\": \"$data\", \"prezzo\": \"$prezzo\", \"citta\": \"$citta\", \"luogo\": \"$luogo\", \"ora\": \"$ora\", \"url\": \"$url\"}";
                if ($matches_found < $matches - 1) {
                    print ",";
                }
                $matches_found++;
                print "\n";
            }
        print "  ]\n}\n";
    } else if (isset($_SESSION['user'])) {
        include("common.php");
        $db = connect_database();
        try {
            $cart = $db->prepare("SELECT * FROM eventi WHERE id IN (SELECT idEvento FROM carrello WHERE username=" . $db->quote($_SESSION['user']) . ")");
            $cart->execute();
        } catch(PDOException $ex){
            die('Could not connect: ' . $ex->getMessage());
        }
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
                $artista = trim($row["artista"]);
                $descrizione = trim($row["descrizione"]);
                $data = trim($row["data"]);
                $prezzo = trim($row["prezzo"]);
                $citta = trim($row["citta"]);
                $luogo = trim($row["luogo"]);
                $ora = trim($row["ora"]);
                $url = trim($row["url"]);
                print "    {\"id\": \"$id\", \"titolo\": \"$titolo\", \"artista\": \"$artista\", \"descrizione\": \"$descrizione\", \"data\": \"$data\", \"prezzo\": \"$prezzo\", \"citta\": \"$citta\", \"luogo\": \"$luogo\", \"ora\": \"$ora\", \"url\": \"$url\"}";
                if ($matches_found < $matches - 1) {
                    print ",";
                }
                $matches_found++;
                print "\n";
            }
        print "  ]\n}\n";
    } else {
        print "{\n  \"carrello\": [\n";
        print "  ]\n}\n";
        return;
    } 
?>