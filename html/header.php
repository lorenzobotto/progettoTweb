        <!--    Nome:           Lorenzo
                Cognome:        Botto
                Descrizione:    Codice PHP/HTML per "header.php" che verrà incluso in tutte le pagine del sito.
                                Contiene un'immagine per il logo, il menù con tutti i link e una sezione
                                per l'icona che serve ad aprire il menù laterale (schermata ridimensionata).
                                Ci sono anche le sezioni che mostreranno il menù a discesa del login, registrazione
                                e sezione privata che verranno visualizzati solo quando si clicca sul link apposito.
        -->
        <header>
            <a id="logo" href="../index.php"><img src="../img/logo.png" alt="Logo"></a>
            <?php
                session_start();
                
                // Se l'utente non ha effettuato login mostro il link per login e registrazione.
                if (!isset($_SESSION['user'])){
            ?>
                    <nav>
                        <ul id="nav">
                            <li><a href="../index.php">Home</a></li>
                            <li><a href="../html/eventi.php">Eventi</a></li>
                            <li><a href="../html/contatti.php">Contatti</a></li>
                            <li>
                                <div id='searchBox'>
                                    <input class="searchTxt" type="text" name="searchInput" placeholder="Ricerca eventi">
                                    <a class="searchBtn"><img src="../img/search-3-24.ico" alt="Icona di ricerca"></a>
                                </div>
                            </li>
                            <li>
                                <a id="headerCarrello" href="../html/carrello.php">
                                    <img id="cart" src="../img/cart-73-24.png" alt="">
                                    <?php
                                        if (isset($_SESSION['cart'])){
                                    ?>
                                            <span id="cartCount"><?= count($_SESSION['cart']) ?></span>
                                    <?php
                                        } else {
                                    ?>
                                            <span id="cartCount">0</span>
                                    <?php
                                        }
                                    ?>
                                </a>
                            </li>
                            <li><img id="user" src="../img/user-2-16.ico" alt="Icona registrazione"><a id="buttonRegistrati" href="#">Registrati</a></li>
                            <li id="space">|</li>
                            <li><img id="unlock" src="../img/unlock-16.ico" alt="Icona login"><a id="buttonLogin" href="#">Login</a></li>
                        </ul>
                        <div id="arrowUpRegistrazione"></div>
                        <div id="registrazioneForm">
                            <h4>Registrati</h4>
                            <div>
                                <div id ="emaildivreg">
                                    <input name="email" type="text" size="22" placeholder="Email">
                                    <div class="errorMsg"></div>
                                </div>
                                <div id ="usernamedivreg">            
                                    <input name="username" type="text" size="22" maxlength="30" placeholder="Username">
                                    <div class="errorMsg"></div>
                                </div>
                                <div id ="passworddivreg">
                                    <input name="password" type="password" size="22" placeholder="Password">
                                    <div class="errorMsg"></div>
                                </div>
                                <input id="buttonRegistratiForm" name="submit" type="submit" value="Registrati">
                                <div id="errorMsgReg"></div>
                            </div>
                        </div>
                        <div id="arrowUpLogin"></div>
                        <div id="loginForm">
                            <h4>Login</h4>
                            <div>
                                <div id="usernamedivlogin">
                                    <input name="username" type="text" size="12" maxlength="30" placeholder="Username">
                                    <div class="errorMsg"></div>
                                </div>
                                <div id="passworddivlogin">
                                    <input name="password" type="password" size="12" placeholder="Password">
                                    <div class="errorMsg"></div>
                                </div>
                                <input id="buttonLoginForm" name="submit" type="submit" value="Login">
                                <div id="errorMsgLogin"></div>
                            </div>
                        </div>
                    </nav>
                    <div id="iconMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            <?php
                // Altrimenti mostro la sezione privata dell'utente
                } else {
            ?>
                    <nav>
                        <ul id="nav">
                            <li><a href="../index.php">Home</a></li>
                            <li><a href="../html/eventi.php">Eventi</a></li>
                            <li><a href="../html/contatti.php">Contatti</a></li>
                            <li>
                                <div id='searchBox'>
                                    <input class="searchTxt" type="text" name="searchInput" placeholder="Ricerca eventi">
                                    <a class="searchBtn"><img src="../img/search-3-24.ico" alt="Icona di ricerca"></a>
                                </div>
                            </li>
                            <li>
                                <a id='headerCarrello' href="../html/carrello.php">
                                    <img id="cart" src="../img/cart-73-24.png" alt="Icona del carrello">
                                    <?php
                                        if (isset($_SESSION['index'])){
                                            include("./php/common/common.php");
                                            unset($_SESSION['index']);
                                        } else {
                                            include("../php/common/common.php");
                                        }
                                        
                                        $db = connect_database();
                                        $count = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                                        $count->execute();
                                    ?>
                                        <span id="cartCount"><?= $count->fetch()["count"] ?></span>
                                </a>
                            </li>
                            <li><a id="userLogged"><img id="user" src="../img/user-2-16.ico" alt="Icona dell'utente"> <?= $_SESSION['user'] ?></a></li>
                            <li id="bigliettiInNav"><a href="../html/biglietti.php">Biglietti acquistati</a></li>
                            <li id="logoutInNav"><a href="../php/utenti/logout.php">Logout</a></li>
                        </ul>
                        <div id="arrowUpLogged"></div>
                        <div id="logoutForm">
                            <div id="bigliettiAcquistati">
                                <a href="../html/biglietti.php"><p>Biglietti acquistati</p></a>
                            </div>
                            <hr>
                            <button id="buttonLogoutForm">Logout</button>
                        </div>
                    </nav>
                    <div id="iconMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            <?php
                }
            ?>
        </header>