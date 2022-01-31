<?php
    /*   Nome:           Lorenzo
    *    Cognome:        Botto
    *    Descrizione:    Codice PHP per recuperare tutti gli eventi cercati da un utente.
    *    Return:         Oggetto JSON.
    */
    include("../common/common.php");

    header("Content-type: application/json");

    $db = connect_database();

    $queryString = "";

    session_start();
    
    //Se è definita la variabile di sessione 'searchEvento' sarà una ricerca dell'evento per nome.
    if (isset($_SESSION['searchEvento'])){
        $queryString = "SELECT * FROM eventi WHERE titolo like " . $db->quote($_SESSION['searchEvento'] . "%");
        unset($_SESSION['searchEvento']);
    //Altrimenti tramite la barra di ricerca delle categorie e delle date.
    } else {
        if ((preg_match('/^[A-Z][a-zA-Z\s]*$/', $_REQUEST['categoria']))){
            $queryString = "SELECT * FROM eventi WHERE categoria=" . $db->quote($_REQUEST['categoria']) . " ";
        } else {
            print "{\n  \"eventi\": [\n";
            print "  ]\n}\n";
            return;
        }

        //Se è definito il parametro 'sottocategoria', allora si ricerca anche per sottocategoria.
        if (isset($_REQUEST['sottocategoria'])){
            if ((preg_match('/^[A-Z][a-zA-Z\s\'À-ú]*$/', $_REQUEST['sottocategoria']))){
                $queryString = $queryString . "AND sottocategoria=" . $db->quote($_REQUEST['sottocategoria']) . " ";
            } else {
                print "{\n  \"eventi\": [\n";
                print "  ]\n}\n";
                return;
            }
        }
        
        /*  Se sono definiti entrambi i parametri delle date, si ricercheranno gli eventi all'interno
        *   di queste date.
        */    
        if ((isset($_REQUEST['dataDa']) && isset($_REQUEST['dataA']))){
            if ((preg_match('/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\z/', $_REQUEST['dataDa'])) && 
                (preg_match('/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\z/', $_REQUEST['dataA']))){
                $queryString = $queryString . "AND data BETWEEN " . $db->quote($_REQUEST['dataDa']) . " AND " . $db->quote($_REQUEST['dataA']);
            } else {
                print "{\n  \"eventi\": [\n";
                print "  ]\n}\n";
                return;
            }
        /*  Altrimenti se è solo definita la data di partenza, si ricercheranno gli eventi da questa
        *   data in futuro.
        */ 
        } else if ((isset($_REQUEST['dataDa']) && !isset($_REQUEST['dataA']))){
            if (preg_match('/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\z/', $_REQUEST['dataDa'])){
                $queryString = $queryString . "AND data > " . $db->quote($_REQUEST['dataDa']) . " ";
            } else {
                print "{\n  \"eventi\": [\n";
                print "  ]\n}\n";
                return;
            }
        /*  Altrimenti se è solo definita la data di arrivo, si ricercheranno gli eventi da questa
        *   data in passato.
        */
        } else if ((isset($_REQUEST['dataA']) && !isset($_REQUEST['dataDa']))){
            if (preg_match('/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\z/', $_REQUEST['dataA'])){
                $queryString = $queryString . "AND data < " . $db->quote($_REQUEST['dataA']) . " ";
            } else {
                print "{\n  \"eventi\": [\n";
                print "  ]\n}\n";
                return;
            }
        }
    }
    try {
        $events = $db->prepare($queryString);
        $events->execute();
    } catch(PDOException $ex){
        die('Error in making query: ' . $ex->getMessage());
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
            $descrizione = trim($row["descrizione"]);
            $data = trim($row["data"]);
            $prezzo = trim($row["prezzo"]);
            $citta = trim($row["citta"]);
            $luogo = trim($row["luogo"]);
            $ora = trim($row["ora"]);
            $url = trim($row["url"]);
            print "    {\"id\": \"$id\", \"titolo\": \"$titolo\",\"descrizione\": \"$descrizione\", \"data\": \"$data\", 
                        \"prezzo\": \"$prezzo\", \"citta\": \"$citta\", \"luogo\": \"$luogo\", \"ora\": \"$ora\", 
                        \"url\": \"$url\"}";
            if ($matches_found < $matches - 1) {
                print ",";
            }
            $matches_found++;
            print "\n";
        }
    print "  ]\n}\n";
?>