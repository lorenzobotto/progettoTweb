        <?php 
            /*   Nome:           Lorenzo
            *    Cognome:        Botto
            *    Descrizione:    Codice PHP/HTML per la pagina "index.php", che include top, header e footer.
            *                    Viene iniziata la sessione.
            *                    Contiene una sezione dove è presente il titolo e una sezione per il contenuto.
            */
            session_start();
            session_write_close();
            include("top.html");
        ?>
        <script src="./js/home.js"></script>
        <script src="./js/common.js"></script>
    </head>
    <body>
        <?php include("./html/header.php"); ?>
        <div id="home">
            <div class="sectionContent">
                <p id="testointro">Daily Ticket</p>
                <h1>Acquista biglietti per eventi e manifestazioni</h1>
                <button class="acquistaHome">Acquista biglietti</button>
            </div>
        </div>
        <div id="categorie">
            <div id="categorieImg"></div>
            <div id="categorieContent">
                <h3>Le categorie</h3>
                <pre>
                Concerti:
                    Questa è la nostra più grande categoria dove si possono trovare i biglietti per i concerti di tanti generi, tra cui il Pop & Rock, Jazz, Metal e anche i biglietti per i festival.

                Sport:
                    Questa è la categoria per gli amanti dello sport, in cui si possono acquistare i biglietti per seguire la propria squadra del cuore in svariati sport: Calcio, Tennis, Basket, Rugby, Formula 1 e MotoGP.
                    
                Mostre e musei:
                    Questa è la categoria per gli amanti della cultura e a chi piace l'arte in ogni sua tipologia. Abbiamo i biglietti per le mostre d'arte e di storia, nonchè anche per i musei e siti archeologici.

                Teatro:
                    Questa è la categoria per chi vuole godersi uno spettacolo che potrà essere un Musical e varietà, Prosa, Teatro lirico, Cabaret, Balletto classico e moderno oppure concerti di musica classica.
                </pre>
                <button class="acquistaHome">Acquista biglietti</button>
            </div>
        </div>
        <div id="aboutUs">
            <div class="sectionTitle">
                <h3>Riguardo a noi</h3>
            </div>
            <div class="sectionText">
                <h4>Chi siamo</h4>
                <p>L'intero sito ed il servizio è stato progettato da Lorenzo Botto, frequentante l'Università di Informatica presso Torino, Corso A, con matricola 882837.</p>
                <h4>La nostra iniziativa</h4>
                <p>L'iniziativa è quella di garantire un servizio ed un portale di acquisto dei biglietti per tante tipologie di eventi e manifestazioni, in grado di diventare un punto di riferimento a livello nazionale.</p>
                <h4>Nel prossimo futuro</h4>
                <p>
                    Per il futuro, si crede che questo servizio possa crescere in modo molto rapido ed effettuare partnership con grandi promoter per la musica, squadre per lo sport, autodromi per la Formula 1 e MotoGP ed anche i più noti teatri per gli spettacoli.<br>
                    A livello economico, la società verrà quotata in borsa, per accrescere i propri capitali da investire.
                </p>
            </div>
        </div>
        <?php include("./html/footer.php"); ?>