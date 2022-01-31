        <?php 
            /*   Nome:           Lorenzo
            *    Cognome:        Botto
            *    Descrizione:    Codice PHP/HTML per la pagina "eventi.php", che include top, header e footer.
            *                    Contiene una sezione dove è presente il titolo e la barra di ricerca per
            *                    categorie e date. Inoltre è presente uan sezione dei risultati con una sezione
            *                    che si visualizzerà solo se non sono stati trovati eventi con i filtri selezionati,
            *                    e una sezione per i risultati.
            */
            include("top.html"); 
        ?>
        <script src="../js/eventi.js"></script>
        <script src="../js/common.js"></script>
    </head>
    <body>
        <?php include("header.php"); ?>
        <div id="eventi">
            <div class="sectionContent">
                <h1>Eventi</h1>
                <div id="searchSection">
                    <h2> Ricerca degli eventi </h2>
                    <div id="searchBar">
                        <div class="customSelectCat">
                            <?php
                                // Se è definita la variabile 'option', allora si stampa la select presente nella variabile.
                                if(isset($_SESSION['option'])){
                                    echo $_SESSION['option'];
                                    unset($_SESSION['option']);
                                } else {
                            ?>
                                    <select id="listCat">
                                        <option value="" disabled selected hidden>Seleziona la categoria</option>
                                        <option value="Concerti">Concerti</option>
                                        <option value="Sport">Sport</option>
                                        <option value="MostreEMusei">Mostre e Musei</option>
                                        <option value="Teatro">Teatro</option>
                                    </select>
                            <?php
                                }
                            ?>
                            <span class="customArrowCat"></span>
                        </div>
                        <div id="customSelectSotCat">
                            <select id="listSotCat"></select>
                            <span id="customArrowSotCat"></span>
                        </div>
                        <input type="date" id="dateFrom" name="dateFrom" onkeydown="return false">
                        <input type="date" id="dateTo" name="dateTo" onkeydown="return false">
                        <button id="cerca">Cerca</button><br>
                    </div>
                </div>
            </div>
        </div>
        <div class="sectionResults">
            <div id="emptyResults">
                <p>Non sono stati trovati risultati!</p>
            </div>
            <div id="results"></div>
        </div>
        <?php include("footer.php"); ?>