        <?php include("top.html");?>
        <script src="../js/biglietti.js"></script>
    </head>
    <body>
        <?php 
            session_start();
            include("header.php"); 
        ?>
        <div id="biglietti">
            <h1>Biglietti acquistati</h1>
            <div id="bigliettiEmpty">
                <p>Non è stato mai acquistato un biglietto!</p>
                <p>Se si vogliono acquistare dei biglietti, consultare la sezione Eventi!</p>
                <button id="eventiButton">Visualizza Eventi</button>
            </div>
            <div id="sectionResults">
            </div>
        </div>
        <?php include("footer.php");?>