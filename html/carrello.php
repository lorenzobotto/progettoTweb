        <?php include("top.html");?>
        <script src="../js/carrello.js"></script>
    </head>
    <body>
        <?php 
            session_start();
            include("header.php"); 
        ?>
        <div id="carrello">
            <h1>Carrello</h1>
            <div id="carrelloEmpty">
                <p>Il carrello è vuoto!</p>
                <p>Se si vogliono acquistare dei biglietti, consultare la sezione Eventi!</p>
                <button id="eventiButton">Visualizza Eventi</button>
            </div>
            <div id="resultsCarrello">
                <div id="tickets"></div>
                <div id="price">
                    <p> Dettagli sui prezzi </p>
                    <hr>
                    <div id="listTickets"></div>
                    <div id="delivery">
                        <p>Costi di spedizione</p>
                        <p>GRATIS</p> 
                    </div>
                    <hr>
                    <div id="finalPrice">
                        <p>Totale da pagare</p>
                        <p id="finalPriceP"></p>
                    </div>
                    <div id="buttons">
                        <button id="svuota">Svuota carrello</button>
                        <button id="concludi">Acquista</button>
                    </div>
                    <span id="errorAcquisto">Devi effettuare il login per completare l'acquisto!</span>
                </div>
            </div>
            <div id="acquisto">
                <p>L'acquisto è stato completato!</p>
                <p>Se si vuole rivedere l'ordine, consultare la sezione dei biglietti acquistati!</p>
                <button id="buttonAcquista">Visualizza biglietti acquistati</button>
            </div>
        </div>
        <?php include("footer.php");?>