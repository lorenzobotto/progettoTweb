        <?php
            /*   Nome:           Lorenzo
            *    Cognome:        Botto
            *    Descrizione:    Codice PHP/HTML per la pagina "register.php", che include top, header e footer.
            *                    Contiene una sezione dove è presente il titolo e una sezione per la registrazione.
            */
            include("top.html"); 
        ?>
        <script src="../js/common.js"></script>
        <script src="../js/register.js"></script>
    </head>
    <body>
        <?php include("header.php"); ?>
        <div id="registerPage">
            <div class="sectionContent">
                <h1>Registrazione</h1>
                <div id="registrazione">
                    <div>
                        <div id ="emaildivregHtml">
                            <input name="email" type="text" size="22" placeholder="Email">
                            <div class="errorMsgHtml"></div>
                        </div>
                        <div id ="usernamedivregHtml">            
                            <input name="username" type="text" size="22" maxlength="30" placeholder="Username">
                            <div class="errorMsgHtml"></div>
                        </div>
                        <div id ="passworddivregHtml">
                            <input name="password" type="password" size="22" placeholder="Password">
                            <div class="errorMsgHtml"></div>
                        </div>
                        <button id="registerButtonHtml">Registrati</button>
                        <div id="errorMsgRegHtml"></div>
                    </div>
                </div>
            </div>
        </div>
        <?php include("footer.php"); ?>