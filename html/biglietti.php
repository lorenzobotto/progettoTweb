        <?php 
            /*   Nome:           Lorenzo
            *    Cognome:        Botto
            *    Descrizione:    Codice PHP/HTML per la pagina "biglietti.php", che include top, header e footer.
            *                    Contiene una sezione dei biglietti con un titolo, e una sezione che si visualizza
            *                    solo se non ci sono ordini e una sezione dove verranno aggiunti tutti gli ordini.
            */

            include("top.html"); 
        ?>
        <script src="../js/biglietti.js"></script>
    </head>
    <body>
        <?php include("header.php"); ?>
        <div id="biglietti">
            <h1>Biglietti acquistati</h1>
            <div id="bigliettiEmpty">
                <p>Non è stato mai acquistato un biglietto!</p>
                <p>Se si vogliono acquistare dei biglietti, consultare la sezione Eventi!</p>
                <button id="eventiButton">Visualizza Eventi</button>
            </div>
            <div class="sectionResults"></div>
        </div>
        <?php include("footer.php"); ?>