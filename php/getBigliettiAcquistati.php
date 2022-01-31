<?php
    include("common.php");

    header("Content-type: application/json");

    $db = connect_database(); 

    session_start();

    try {
        $tickets = $db->prepare("SELECT o.id, o.data as dataOrdine, quantita, titolo, descrizione, e.data as data, prezzo, citta, luogo, ora, url FROM ordini as o, eventi as e WHERE o.idEvento = e.id AND username=" . $db->quote($_SESSION['user']) . " ORDER BY o.id");
        $tickets->execute();
    } catch(PDOException $ex){
        die('Could not connect: ' . $ex->getMessage());
    }

    $matches = 0;
    $dataarray = null;
    while($row = $tickets->fetch()){
        $dataarray[] = $row;
        $matches++;
    }

    if ($matches == 0){
        print "{\n  \"ordini\": [\n";
        print "  ]\n}\n";
        return;
    }

        $printString = "{\n  \"ordini\": [\n";
        $matches_found = 0;
        $previous_id = $dataarray[0]["id"];
        $i = 0;
        $printString .= "   {\n       \"ordine\": [\n";
        foreach($dataarray as $row){
            $id = trim($row["id"]);
            if ($previous_id != $id){
                $printString = substr($printString, 0, -2);
                $printString .= "\n       ]\n   },\n";
                $i++;
                $printString .= "   {\n       \"ordine\": [\n";
            }                
            $quantita = trim($row["quantita"]);
            $dataOrdine = trim($row["dataOrdine"]);
            $titolo = trim($row["titolo"]);
            $descrizione = trim($row["descrizione"]);
            $data = trim($row["data"]);
            $prezzo = trim($row["prezzo"]);
            $citta = trim($row["citta"]);
            $luogo = trim($row["luogo"]);
            $ora = trim($row["ora"]);
            $url = trim($row["url"]);
            $printString .= "           {\"id\": \"$id\", \"quantita\": \"$quantita\", \"dataOrdine\": \"$dataOrdine\", \"titolo\": \"$titolo\", \"descrizione\": \"$descrizione\", \"data\": \"$data\", \"prezzo\": \"$prezzo\", \"citta\": \"$citta\", \"luogo\": \"$luogo\", \"ora\": \"$ora\", \"url\": \"$url\"}";
            if ($matches_found < $matches - 1) {
                $printString .= ",";
            }
            $matches_found++;
            $previous_id = trim($row["id"]);
            $printString .= "\n";
        }
        $printString .= "       ]\n     }\n";
    $printString .= "  ]\n}\n";
    echo $printString;
?>