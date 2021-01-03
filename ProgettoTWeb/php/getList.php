<?php
    include("common.php");

    header("Content-type: application/json");

    $db = connect_database();

    $queryString = "";

    session_start();
    
    if (isset($_SESSION['searchEvento'])){
        $queryString = "SELECT * FROM eventi WHERE titolo like " . $db->quote($_SESSION['searchEvento'] . "%");
        unset($_SESSION['searchEvento']);
    } else {
        $queryString = "SELECT * FROM eventi WHERE categoria=" . $db->quote($_REQUEST['categoria']) . " ";
        if (isset($_REQUEST['sottocategoria'])){
            $queryString = $queryString . "AND sottocategoria=" . $db->quote($_REQUEST['sottocategoria']) . " ";
        }
        if ((isset($_REQUEST['dataDa']) && isset($_REQUEST['dataA']))){
            $queryString = $queryString . "AND data BETWEEN " . $db->quote($_REQUEST['dataDa']) . " AND " . $db->quote($_REQUEST['dataA']);
        } else if ((isset($_REQUEST['dataDa']) && !isset($_REQUEST['dataA']))){
            $queryString = $queryString . "AND data > " . $db->quote($_REQUEST['dataDa']) . " ";
        } else if ((isset($_REQUEST['dataA']) && !isset($_REQUEST['dataDa']))){
            $queryString = $queryString . "AND data < " . $db->quote($_REQUEST['dataA']) . " ";
        }
    }
    try {
        $events = $db->prepare($queryString);
        $events->execute();
    } catch(PDOException $ex){
        die('Could not connect: ' . $ex->getMessage());
    }

    $matches = 0;
    $dataarray = null;
    while($row = $events->fetch()){
        $dataarray[] = $row;
        $matches++;
    }

    if ($matches == 0){
        print "{\n  \"eventi\": [\n";
        print "  ]\n}\n";
        return;
    }

    print "{\n  \"eventi\": [\n";
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
?>