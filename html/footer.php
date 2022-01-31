        <!--    Nome:           Lorenzo
                Cognome:        Botto
                Descrizione:    Codice PHP/HTML per "footer.php" che verrà incluso in tutte le pagine del sito.
                                Contiene varie sezioni, una per la parte sinistra del footer, una per la parte
                                destra del footer e una per la parte in basso.
        -->                
        <footer class="footer">
            <div class="leftFooter">
                <img src="../img/logo.png" alt="Logo">
                <p>
                    DailyTicket è il punto di riferimento per l’acquisto di biglietti di tutti i più grandi eventi
                    (musica, spettacolo, sport e cultura) che si svolgono in Italia. Con il nostro programma, avrai
                    a disposizione molti eventi ogni anno: un catalogo che spazia dagli spettacoli più importanti fino
                    a quelli di nicchia… Una varietà di offerta che si traduce in alta opportunità di conversione per i nostri affiliati.
                </p>
            </div>
            <ul class="rightFooter">
                <li>
                    <h2>Eventi</h2>
                    <ul class="box">
                        <li><a id="footerConcerti">Concerti</a></li>
                        <li><a id="footerSport">Sport</a></li>
                        <li><a id="footerMostre">Mostre e musei</a></li>
                        <li><a id="footerTeatro">Teatro</a></li>
                    </ul>
                </li>
                <li>
                    <h2>Link utili</h2>
                    <ul class="box">
                        <li><a href="../index.php">Home</a></li>
                        <li><a href="eventi.php">Eventi</a></li>
                        <li><a href="contatti.php">Contatti</a></li>
                        <?php
                            // Se l'utente ha effettuato login mostro il link per logout.
                            if (isset($_SESSION['user'])){
                        ?>
                                <li><a href="../php/utenti/logout.php">Logout</a></li>
                        <?php
                            // Altrimenti mostro mostro il link per login e registrazione.
                            } else {
                        ?>
                                <li><a id="footerRegistrazione">Registrazione</a></li>
                                <li><a id="footerLogin">Login</a></li>
                        <?php
                            }
                        ?>
                    </ul>
                </li>
                <li>
                    <h2>Indirizzo</h2>
                    <ul class="box">
                        <li>Sede legale: Via roma, 46 - 20124 Milano</li>
                        <li>Telefono: +3902112233</li>
                        <li>P. IVA: 01234567891</li>
                    </ul>
                    <br>
                    <h2>Validatori</h2>
                    <ul class="boxInline">
                        <li><a href="http://validator.w3.org/check/referer"> 
					            <img width="88" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/W3C_HTML5_certified.png" alt="Valid HTML5!">
				            </a>
                        </li>
                        <li><a href="http://jigsaw.w3.org/css-validator/check/referer">
                                <img src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS" >
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="bottomFooter">
                <p>© All rights reserved by Lorenzo Botto, 2020 </p>
            </div>
        </footer>
    </body>
</html>