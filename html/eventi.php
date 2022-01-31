        <?php include("top.html");?>
        <script src="../js/eventi.js"></script>
    </head>
    <body>
        <?php 
            session_start();
            include("header.php"); 
        ?>
        <div id="heroEventi">
            <div id="heroEventi__content">
                <h1>Eventi</h1>
                <div id="searchBar">
                    <h2> Ricerca degli eventi </h2>
                    <div id="customSelectCat">
                        <?php
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
                        <span id="customArrowCat"></span>
                    </div>
                    <div id="customSelectSotCat">
                        <select id="listSotCat">
                        </select>
                        <span id="customArrowSotCat"></span>
                    </div>
                    <input type="date" id="dateFrom" name="dateFrom" onkeydown="return false">
                    <input type="date" id="dateTo" name="dateTo" onkeydown="return false">
                    <button id="cerca">Cerca</button>
                </div>
            </div>
        </div>
        <div id="sectionResults">
            <div id="emptyResults">
                <p>Non sono stati trovati risultati!</p>
            </div>
            <div id="results">
            </div>
        </div>
        <?php include("footer.php");?>