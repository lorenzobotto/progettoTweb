        <?php
            /*   Nome:           Lorenzo
            *    Cognome:        Botto
            *    Descrizione:    Codice PHP/HTML per la pagina "carrello.php", che include top, header e footer.
            *                    Contiene una sezione del carrello dove è presente un'intestazione e una sezione visibile
            *                    solo se non ci sono biglietti nel carrello. E' presente una sezione dove verranno aggiunti
            *                    tutti i biglietti del carrello (ed il prezzo totale) e una sezione che sarà visibile solo
            *                    ad acquisto concluso.
            */
            include("top.html"); 
        ?>
        <script src="../js/common.js"></script>
        <script src="../js/carrello.js"></script>
    </head>
    <body>
        <?php include("header.php"); ?>
        <div id="carrello">
            <h1>Carrello</h1>
            <div id="carrelloEmpty">
                <p>Il carrello è vuoto!</p>
                <p>Se si vogliono acquistare dei biglietti, consultare la sezione Eventi!</p>
                <button id="eventiButton">Visualizza Eventi</button>
            </div>
            <div id="resultsCarrello">
                <div id="ticketsCarrello"></div>
                <div id="totalPrice">
                    <p> Dettagli sui prezzi </p>
                    <hr>
                    <div id="numberTickets"></div>
                    <div id="delivery">
                        <p>Costi di spedizione</p>
                        <p>GRATIS</p> 
                    </div>
                    <hr>
                    <div id="finalPrice">
                        <p>Totale da pagare</p>
                        <p id="finalPriceP"></p>
                    </div>
                    <div id="buttonsPrice">
                        <button id="svuota">Svuota carrello</button>
                        <button id="concludi">Acquista</button>
                    </div>
                    <span id="errorAcquisto"></span>
                </div>
            </div>
            <div id="acquisto">
                <p>L'acquisto è stato completato!</p>
                <p>Se si vuole rivedere l'ordine, consultare la sezione dei biglietti acquistati!</p>
                <button id="buttonAcquista">Visualizza biglietti acquistati</button>
            </div>
        </div>
        <?php include("footer.php"); ?>