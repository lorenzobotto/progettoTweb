/*    Nome:                  Lorenzo
 *    Cognome:               Botto
 *    Descrizione:           Codice JS comune per alcune pagine PHP.
 */

// Definisco delle variabili globali per i menù dell'header.
var statusLogin = false;
var statusRegistrati = false;
var statusLogged = false;

/*
 *   Descrizione:  Al caricarsi della pagina, si configurano molti eventi descritti qui sotto. 
 */
$(function() {
    var arrowReg = $("#arrowUpRegistrazione");
    var registrazioneform = $("#registrazioneForm");
    var arrowLog = $("#arrowUpLogin");
    var loginform = $("#loginForm");
    var buttonLogin = $("#buttonLogin");
    var arrowLogged = $("#arrowUpLogged");
    var logoutForm = $("#logoutForm");
    var buttonLogout = $("#userLogged");
    var buttonRegistrati = $("#buttonRegistrati");
    var footerLogin = $("#footerLogin");
    var footerRegistrazione = $("#footerRegistrazione");
    var buttonConcludi = $("#concludi");

    /* Si definiscono i click dei link login, registrati e sezione privata dell'utente, 
     *  presenti nell'header, che mostreranno un menù a discesa.
     */
    $("#buttonRegistrati").click(function(event) {
        if ($("#nav").css("display") == "block") {
            window.location = "register.php";
        } else {
            event.preventDefault();
            if (statusRegistrati == false) {
                if (statusLogin == true) {
                    arrowLog.fadeOut();
                    loginform.fadeOut();
                    statusLogin = false;
                    arrowReg.fadeIn();
                    registrazioneform.fadeIn();
                    statusRegistrati = true;
                } else {
                    arrowReg.fadeIn();
                    registrazioneform.fadeIn();
                    statusRegistrati = true;
                }
            } else {
                arrowReg.fadeOut();
                registrazioneform.fadeOut();
                statusRegistrati = false;
            }
        }
    })
    $("#buttonLogin").click(function(event) {
        if ($("#nav").css("display") == "block") {
            window.location = "login.php";
        } else {
            event.preventDefault();
            if (statusLogin == false) {
                if (statusRegistrati == true) {
                    arrowReg.fadeOut();
                    registrazioneform.fadeOut();
                    statusRegistrati = false;
                    arrowLog.fadeIn();
                    loginform.fadeIn();
                    statusLogin = true;
                } else {
                    arrowLog.fadeIn();
                    loginform.fadeIn();
                    statusLogin = true;
                }
            } else {
                arrowLog.fadeOut();
                loginform.fadeOut();
                statusLogin = false;
            }
        }
    })

    $("#userLogged").click(function(event) {
        event.preventDefault();
        if (statusLogged == false) {
            arrowLogged.fadeIn();
            logoutForm.fadeIn();
            statusLogged = true;
        } else {
            arrowLogged.fadeOut();
            logoutForm.fadeOut();
            statusLogged = false;
        }
    })

    // Si definisce il click nel body, così da chiudere i menù aperti.
    $("body").click(function(event) {
        if (statusLogin == true) {
            if (!loginform.is(event.target) && loginform.has(event.target).length == 0 && !arrowLog.is(event.target) &&
                arrowLog.has(event.target).length == 0 && !buttonLogin.is(event.target) && buttonLogin.has(event.target).length == 0 &&
                !footerLogin.is(event.target) && footerLogin.has(event.target).length == 0 && !buttonConcludi.is(event.target) &&
                buttonConcludi.has(event.target).length == 0) {
                arrowLog.fadeOut();
                loginform.fadeOut();
                statusLogin = false;
            }
        }
        if (statusRegistrati == true) {
            if (!registrazioneform.is(event.target) && registrazioneform.has(event.target).length == 0 && !arrowReg.is(event.target) &&
                arrowReg.has(event.target).length == 0 && !buttonRegistrati.is(event.target) && buttonRegistrati.has(event.target).length == 0 &&
                !footerRegistrazione.is(event.target) && footerRegistrazione.has(event.target).length == 0) {
                arrowReg.fadeOut();
                registrazioneform.fadeOut();
                statusRegistrati = false;
            }
        }
        if (statusLogged == true) {
            if (!logoutForm.is(event.target) && logoutForm.has(event.target).length == 0 && !arrowLogged.is(event.target) &&
                arrowLogged.has(event.target).length == 0 && !buttonLogout.is(event.target) && buttonLogout.has(event.target).length == 0) {
                arrowLogged.fadeOut();
                logoutForm.fadeOut();
                statusLogged = false;
            }
        }
        if (!$("header").is(event.target) && $("header").has(event.target).length == 0) {
            if ($("#nav").css("display") == "block"){
                $("#nav").fadeOut();
                $("body").css("overflow-y", "scroll");
            }
        }
    })

    // Si definiscono i click dei pulsanti di login, registrazione e logout all'interno dei menù nell'header.
    $("#buttonLoginForm").click(login);
    $("#buttonRegistratiForm").click(registrazione);
    $("#buttonLogoutForm").click(endSession);

    // Quando cambia l'input dell'username per il login, non vengono visualizzati gli errori e si modifica lo stile.
    $("#loginForm input[name='username']").on('input', function() {
        if ($("#usernamedivlogin div").is(":visible")) {
            $("#loginForm input[name='username']").css("border", "1px solid gray");
            $("#usernamedivlogin div").hide();
        }
        if ($("#errorMsgLogin").is(":visible")) {
            $("#errorMsgLogin").hide();
        }
    })
    // Quando cambia l'input della password per il login, non vengono visualizzati gli errori e si modifica lo stile.
    $("#loginForm input[name='password']").on('input', function() {
        if ($("#passworddivlogin div").is(":visible")) {
            $("#loginForm input[name='password']").css("border", "1px solid gray");
            $("#passworddivlogin div").hide();
        }
        if ($("#errorMsgLogin").is(":visible")) {
            $("#errorMsgLogin").hide();
        }
    })
    // Quando cambia l'input dell'email, non vengono visualizzati gli errori e si modifica lo stile.
    $("#registrazioneForm input[name='email']").on('input', function() {
        if ($("#emaildivreg div").is(":visible")) {
            $("#registrazioneForm input[name='email']").css("border", "1px solid gray");
            $("#emaildivreg div").hide();
        }
    })
    // Quando cambia l'input dell'username per la registrazione, non vengono visualizzati gli errori e si modifica lo stile.
    $("#registrazioneForm input[name='username']").on('input', function() {
        if ($("#usernamedivreg div").is(":visible")) {
            $("#registrazioneForm input[name='username']").css("border", "1px solid gray");
            $("#usernamedivreg div").hide();
        }
    })
    // Quando cambia l'input della password per la registrazione, non vengono visualizzati gli errori e si modifica lo stile.
    $("#registrazioneForm input[name='password']").on('input', function() {
        if ($("#passworddivreg div").is(":visible")) {
            $("#registrazioneForm input[name='password']").css("border", "1px solid gray");
            $("#passworddivreg div").hide();
        }
    })

    /*  Si definiscono i click ai link delle categorie nel footer, effettuando una chiamata ajax a
     *   "selectedOption.php" passando come parametro l'HTML del menù a tendina. In caso di successo,
     *   l'utente viene reindirizzato nella pagina degli eventi.
     */
    $("#footerLogin").click(function(event) {
        if ($("#nav").css("display") == "none" || $("#nav").css("display") == "block") {
            window.location = "login.php";
        } else {
            event.preventDefault();
            if (statusLogin == false) {
                if (statusRegistrati == true) {
                    arrowReg.fadeOut();
                    registrazioneform.fadeOut();
                    statusRegistrati = false;
                    arrowLog.fadeIn();
                    loginform.fadeIn();
                    statusLogin = true;
                } else {
                    arrowLog.fadeIn();
                    loginform.fadeIn();
                    statusLogin = true;
                }
            } else {
                arrowLog.fadeOut();
                loginform.fadeOut();
                statusLogin = false;
            }
            var offset = $("body").offset().top - $(window).scrollTop();
            $('html,body').animate({
                scrollTop: offset
            }, 1000);
        }
    })
    $("#footerRegistrazione").click(function(event) {
        if ($("#nav").css("display") == "none" || $("#nav").css("display") == "block") {
            window.location = "register.php";
        } else {
            event.preventDefault();
            if (statusRegistrati == false) {
                if (statusLogin == true) {
                    arrowLog.fadeOut();
                    loginform.fadeOut();
                    statusLogin = false;
                    arrowReg.fadeIn();
                    registrazioneform.fadeIn();
                    statusRegistrati = true;
                } else {
                    arrowReg.fadeIn();
                    registrazioneform.fadeIn();
                    statusRegistrati = true;
                }
            } else {
                arrowReg.fadeOut();
                registrazioneform.fadeOut();
                statusRegistrati = false;
            }
            var offset = $("body").offset().top - $(window).scrollTop();
            $('html,body').animate({
                scrollTop: offset
            }, 1000);
        }
    })
    $("#footerConcerti").click(function() {
        $.ajax({
            url: "../php/eventi/selectedOption.php",
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti' selected>Concerti</option>" +
                "<option value='Sport'>Sport</option><option value='MostreEMusei'>Mostre e Musei</option>" +
                "<option value='Teatro'>Teatro</option></select>",
            success: function() {
                window.location = "eventi.php";
            },
            error: ajaxFailed,
        });
    })
    $("#footerSport").click(function() {
        $.ajax({
            url: "../php/eventi/selectedOption.php",
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti'>Concerti</option>" +
                "<option value='Sport' selected>Sport</option><option value='MostreEMusei'>Mostre e Musei</option>" +
                "<option value='Teatro'>Teatro</option></select>",
            success: function() {
                window.location = "eventi.php";
            },
            error: ajaxFailed,
        });
    })
    $("#footerMostre").click(function() {
        $.ajax({
            url: "../php/eventi/selectedOption.php",
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti'>Concerti</option>" +
                "<option value='Sport'>Sport</option><option value='MostreEMusei' selected>Mostre e Musei</option>" +
                "<option value='Teatro'>Teatro</option></select>",
            success: function() {
                window.location = "eventi.php";
            },
            error: ajaxFailed,
        });
    })
    $("#footerTeatro").click(function() {
        $.ajax({
            url: "../php/eventi/selectedOption.php",
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti'>Concerti</option>" +
                "<option value='Sport'>Sport</option><option value='MostreEMusei'>Mostre e Musei</option>" +
                "<option value='Teatro' selected>Teatro</option></select>",
            success: function() {
                window.location = "eventi.php";
            },
            error: ajaxFailed,
        });
    })

    // Si definisce l'hover della barra di ricerca nell'header
    $("#searchBox").hover(function() {
        $(".searchTxt").css("width", "150px");
        $(".searchTxt").css("padding", "0 6px");
    });

    // Si definisce la chiusura della barra di ricerca nell'header quando si esce dall'header
    $("header").mouseleave(function() {
        $(".searchTxt").css("width", "0");
        $(".searchTxt").css("padding", "0 0");
    });

    // Si definisce il click dell'icona di ricerca nella barra di ricerca dell'header
    $(".searchBtn").click(searchEvent);

    // Si definisce il click per aprire il menù laterale quando la finestra è ridimensionata.
    $("#iconMenu").click(function() {
        if ($("#nav").css("display") == "none") {
            $("#nav").fadeIn();
            $("body").css("overflow-y", "hidden");
        } else {
            $("#nav").fadeOut();
            $("body").css("overflow-y", "scroll");
        }
    })

    // Si definisce lo stile dell'header, nel caso la finestra si ridimensioni.
    $(window).on('resize', function() {
        var win = $("body");
        if (win.width() >= 1134) {
            $("#nav").css("display", "flex");
            $("body").css("overflow-y", "scroll");
        } else {
            if (!$("#nav").css("display") == "none") {
                $("#nav").css("display", "none");
                $("body").css("overflow-y", "scroll");
            } else if ($("#nav").css("display") == "flex") {
                if (statusRegistrati == true) {
                    arrowReg.hide();
                    registrazioneform.hide();
                    statusRegistrati = false;
                }
                if (statusLogin == true) {
                    arrowLog.hide();
                    loginform.hide();
                    statusLogin = false;
                }
                if (statusLogged == true) {
                    arrowLogged.hide();
                    logoutForm.hide();
                    statusLogged = false;
                }
                $("#nav").css("display", "none");
                $("body").css("overflow-y", "scroll");
            }
        }
    });
})

/*
 *   Descrizione:  Funzione che tramite una chiamata AJAX, definisce una variabile di sessione
 *                 per l'evento ricercato dalla barra di ricerca nell'header passando come parametro
 *                 ciò che ha digitato l'utente, se l'input non è vuoto. In caso di successo della
 *                 chiamata AJAX, l'utente viene reindirizzato alla pagina degli eventi.
 */
function searchEvent() {
    if ($(".searchTxt").val().trim() != "") {
        $.ajax({
            url: "../php/eventi/searchEvento.php",
            type: "POST",
            data: "evento=" + $(".searchTxt").val().trim(),
            success: function() {
                window.location = "../html/eventi.php";
            },
            error: ajaxFailed,
        });
    } else {
        $(".searchTxt").focus();
    }
}

/*
 *   Descrizione:  Funzione che effettua il logout.
 */
function endSession() {
    window.location = "../php/utenti/logout.php";
}

/*
 *   Descrizione:  Funzione che effettua il login dell'utente tramite una chiamata ajax a "getUser.php".
 *                 Vengono controllati i dati in input che non siano vuoti, altrimenti restituisce un feedback.
 *                 Vengono passati come parametri l'username e la password. In caso di successo viene
 *                 richiamata la funzione loggedSite.
 */
function login() {
    var username = $("#loginForm input[name='username']").val().trim();
    var password = $("#loginForm input[name='password']").val().trim();
    if (username != "" && password != "") {
        $.ajax({
            url: "../php/utenti/getUser.php",
            type: "POST",
            data: "username=" + username + "&password=" + password,
            success: loggedSite,
            error: ajaxFailed,
        });
    }
    if (username == "") {
        $("#loginForm input[name='username']").css("border", "1px solid red");
        $("#usernamedivlogin div").text("Username richiesto!");
        $("#usernamedivlogin div").show();
    }
    if (password == "") {
        $("#loginForm input[name='password']").css("border", "1px solid red");
        $("#passworddivlogin div").text("Password richiesta!");
        $("#passworddivlogin div").show();
    }
}

/*
 *   Descrizione:  Funzione che aggiunge il carrello all'utente che ha appena effettuato il login,
 *                 tramite una chiamata ajax a "addCartNoLogin.php" (se response è 1). In caso di successo,
 *                 l'utente è rendirizzato alla homepage. Altrimenti se response non è 1, l'utente non esiste
 *                 e viene rilasciato il feedback.
 *   Parametri:    response - 1 se l'utente esiste, altrimenti 0.
 */
function loggedSite(response) {
    if (response == 1) {
        $.ajax({
            url: "../php/carrello/addCartNoLogin.php",
            success: function() {
                window.location = "../html/home.php";
            },
            error: ajaxFailed,
        });
    } else {
        $("#loginForm div #errorMsgLogin").text("Username e/o password invalidi!");
        $("#loginForm div #errorMsgLogin").show();
    }
}

/*
 *   Descrizione:  Funzione che effettua la registrazione dell'utente tramite una chiamata ajax a "register.php".
 *                 Vengono controllati i dati in input che non siano vuoti, altrimenti restituisce un feedback.
 *                 Vengono passati come parametri l'email, l'username e la password. In caso di successo viene
 *                 effettuato il login automatico (chimando "getUser.php") o stampati messaggi di errore.
 */
function registrazione() {
    var email = $("#registrazioneForm input[name='email']").val().trim();
    var username = $("#registrazioneForm input[name='username']").val().trim();
    var password = $("#registrazioneForm input[name='password']").val().trim();
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email != "" && regex.test(email) && username != "" && password != "") {
        $.ajax({
            url: "../php/utenti/register.php",
            type: "POST",
            data: "username=" + username + "&password=" + password + "&email=" + email,
            success: function(response) {
                if (response == 1) {
                    $.ajax({
                        url: "../php/utenti/getUser.php",
                        type: "POST",
                        data: "username=" + username + "&password=" + password,
                        success: loggedSite,
                        error: ajaxFailed,
                    });
                } else if (response.startsWith("Password")) {
                    $("#registrazioneForm input[name='password']").css("border", "1px solid red");
                    $("#passworddivreg div").text("Password non valida!");
                    $("#passworddivreg div").show();
                } else if (response.startsWith("Username con")) {
                    $("#registrazioneForm input[name='username']").css("border", "1px solid red");
                    $("#usernamedivreg div").text("Username non valido!");
                    $("#usernamedivreg div").show();
                } else if (response.startsWith("Email con")) {
                    $("#registrazioneForm input[name='email']").css("border", "1px solid red");
                    $("#emaildivreg div").text("Email non valida!");
                    $("#emaildivreg div").show();
                } else if (response.startsWith("Email già")) {
                    $("#registrazioneForm input[name='email']").css("border", "1px solid red");
                    $("#emaildivreg div").text("Email già utilizzata!");
                    $("#emaildivreg div").show();
                } else if (response.startsWith("Username già")) {
                    $("#registrazioneForm input[name='username']").css("border", "1px solid red");
                    $("#usernamedivreg div").text("Username già utilizzato!");
                    $("#usernamedivreg div").show();
                }
            },
            error: ajaxFailed,
        });
    }
    if (email == "") {
        $("#registrazioneForm input[name='email']").css("border", "1px solid red");
        $("#emaildivreg div").text("Email richiesta!");
        $("#emaildivreg div").show();
    }
    if (email != "" && !regex.test(email)) {
        $("#registrazioneForm input[name='email']").css("border", "1px solid red");
        $("#emaildivreg div").text("Email non valida!");
        $("#emaildivreg div").show();
    }
    if (username == "") {
        $("#registrazioneForm input[name='username']").css("border", "1px solid red");
        $("#usernamedivreg div").text("Username richiesto!");
        $("#usernamedivreg div").show();
    }
    if (password == "") {
        $("#registrazioneForm input[name='password']").css("border", "1px solid red");
        $("#passworddivreg div").text("Password richiesta!");
        $("#passworddivreg div").show();
    }
}

/* 
 *   Descrizione: Funzione nel caso AJAX restituisca un errore e lo stampa tramite alert. 
 */
function ajaxFailed(e) {
    var errorMessage = "Error making Ajax request:\n\n";
    errorMessage += "Server status:\n" + e.status + " " + e.statusText +
        "\n\nServer response text:\n" + e.responseText;
    alert(errorMessage);
}