        <?php 
            /*   Nome:           Lorenzo
            *    Cognome:        Botto
            *    Descrizione:    Codice PHP/HTML per la pagina "login.php", che include top, header e footer.
            *                    Contiene una sezione dove è presente il titolo e una sezione per il login.
            */
            include("top.html");
        ?>
        <script src="../js/common.js"></script>
        <script src="../js/login.js"></script>
    </head>
    <body>
        <?php include("header.php"); ?>
        <div id="loginPage">
            <div class="sectionContent">
                <h1>Login</h1>
                <div id="login">
                    <div>
                        <div id="usernamedivloginHtml">
                            <input name="username" type="text" size="12" maxlength="30" placeholder="Username">
                            <div class="errorMsgHtml"></div>
                        </div>
                        <div id="passworddivloginHtml">
                            <input name="password" type="password" size="12" placeholder="Password">
                            <div class="errorMsgHtml"></div>
                        </div>
                        <button id="loginButtonHtml">Login</button>
                        <div id="errorMsgLoginHtml"></div>
                    </div>
                </div>
            </div>
        </div>
        <?php include("footer.php"); ?>