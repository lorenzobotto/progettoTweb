<header>
    <img id="logo" src="../img/logo.png" alt="">
    <?php
        if (!isset($_SESSION['user'])){
    ?>
            <nav>
                <ul id="nav">
                    <li><a href="../index.php">Home</a></li>
                    <li><a href="../html/eventi.php">Eventi</a></li>
                    <li><a href="../html/contatti.php">Contatti</a></li>
                    <li>
                        <div id='searchBox'>
                            <input class="searchTxt" type="text" name="" placeholder="Ricerca eventi">
                            <a class="searchBtn"><img src="../img/search-3-24.ico"></a>
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
                    <li><img id="user" src="../img/user-2-16.ico" alt=""><a id="buttonRegistrati" href="#">Registrati</a></li>
                    <li>|</li>
                    <li><img id="unlock" src="../img/unlock-16.ico" alt=""><a id="buttonLogin" href="#">Login</a></li>
                </ul>
                <div id="arrowUpRegistrazione"></div>
                <div id="registrazioneForm">
                    <h4>Registrati</h4>
                    <div>
                        <div id ="emaildivreg">
                            <input name="email" type="text" size="22" placeholder="Email">
                            <div id="errorMsg">Email richiesta!</div>
                        </div>
                        <div id ="usernamedivreg">            
                            <input name="username" type="text" size="22" maxlength="30" placeholder="Username">
                            <div id="errorMsg">Username richiesto!</div>
                        </div>
                        <div id ="passworddivreg">
                            <input name="password" type="password" size="22" placeholder="Password">
                            <div id="errorMsg">Password richiesta!</div>
                        </div>
                        <input id="buttonRegistratiForm" name="submit" type="submit" value="Registrati">
                    </div>
                </div>
                <div id="arrowUpLogin"></div>
                <div id="loginForm">
                    <h4>Login</h4>
                    <div>
                        <div id="usernamedivlogin">
                            <input name="username" type="text" size="12" maxlength="30" placeholder="Username">
                            <div id="errorMsg">Username richiesto!</div>
                        </div>
                        <div id="passworddivlogin">
                            <input name="password" type="password" size="12" placeholder="Password">
                            <div id="errorMsg">Password richiesta!</div>
                        </div>
                        <input id="buttonLoginForm" name="submit" type="submit" value="Login">
                    </div>
                </div>
            </nav>
    <?php
        } else {
    ?>
            <nav>
                <ul id="nav">
                    <li><a href="../index.php">Home</a></li>
                    <li><a href="../html/eventi.php">Eventi</a></li>
                    <li><a href="../html/contatti.php">Contatti</a></li>
                    <li>
                        <div id='searchBox'>
                            <input class="searchTxt" type="text" name="" placeholder="Ricerca eventi">
                            <a class="searchBtn"><img src="../img/search-3-24.ico"></a>
                        </div>
                    </li>
                    <li>
                        <a id='headerCarrello' href="../html/carrello.php">
                            <img id="cart" src="../img/cart-73-24.png" alt="">
                            <?php
                                include("../php/common.php");
                                $db = connect_database();
                                $count = $db->prepare("SELECT count(*) as count FROM carrello WHERE username=" . $db->quote($_SESSION['user']));
                                $count->execute();
                            ?>
                                <span id="cartCount"><?= $count->fetch()["count"] ?></span>
                        </a>
                    </li>
                    <li><a id="userLogged"><img id="user" src="../img/user-2-16.ico" alt=""> <?= $_SESSION['user'] ?></a></li>
                </ul>
                <div id="arrowUpLogged"></div>
                <div id="logoutForm">
                    <div id="bigliettiAcquistati">
                        <a href="../html/biglietti.php"><p>Visualizza biglietti acquistati</p></a>
                    </div>
                    <hr>
                    <button id="buttonLogoutForm">Logout</button>
                </div>
            </nav>
    <?php
        }
    ?>
</header>