/*    Nome:          Lorenzo
 *    Cognome:       Botto
 *    Descrizione:   Codice JS per per la pagina "login.php", dove si può effettuare il login.
 *                   Si verrà indirizzati in questa pagina solo se la finestra è ridimensionata
 *                   ed è presente il menù laterale.
 */

/*
 *   Descrizione:  Al caricarsi della pagina, configuro il click del pulsante per il login e
 *                 l'eliminazione di messaggi di errore. 
 */
$(function() {
    // Quando cambia l'input dell'username, non vengono visualizzati gli errori e si modifica lo stile.
    $("#login input[name='username']").on('input', function() {
        if ($("#usernamedivloginHtml div").is(":visible")) {
            $("#login input[name='username']").css("border", "1px solid gray");
            $("#usernamedivloginHtml div").hide();
        }
        if ($("#errorMsgLoginHtml").is(":visible")) {
            $("#errorMsgLoginHtml").hide();
        }
    })

    // Quando cambia l'input della password, non vengono visualizzati gli errori e si modifica lo stile.
    $("#login input[name='password']").on('input', function() {
        if ($("#passworddivloginHtml div").is(":visible")) {
            $("#login input[name='password']").css("border", "1px solid gray");
            $("#passworddivloginHtml div").hide();
        }
        if ($("#errorMsgLoginHtml").is(":visible")) {
            $("#errorMsgLoginHtml").hide();
        }
    })

    // Si definisce il click del pulsante del login.
    $("#loginButtonHtml").click(loginForm);
});

/*
 *   Descrizione:  Funzione che effettua il login dell'utente tramite una chiamata ajax a "getUser.php".
 *                 Vengono controllati i dati in input che non siano vuoti, altrimenti restituisce un feedback.
 *                 Vengono passati come parametri l'username e la password. In caso di successo viene
 *                 richiamata la funzione loggedSiteForm.
 */
function loginForm() {
    var username = $("#login input[name='username']").val().trim();
    var password = $("#login input[name='password']").val().trim();
    if (username != "" && password != "") {
        $.ajax({
            url: "../php/utenti/getUser.php",
            type: "POST",
            data: "username=" + username + "&password=" + password,
            success: loggedSiteForm,
            error: ajaxFailed,
        });
    }
    if (username == "") {
        $("#login input[name='username']").css("border", "1px solid red");
        $("#usernamedivloginHtml div").text("Username richiesto!");
        $("#usernamedivloginHtml div").show();
    }
    if (password == "") {
        $("#login input[name='password']").css("border", "1px solid red");
        $("#passworddivloginHtml div").text("Password richiesta!");
        $("#passworddivloginHtml div").show();
    }
}

/*
 *   Descrizione:  Funzione che aggiunge il carrello all'utente che ha appena effettuato il login,
 *                 tramite una chiamata ajax a "addCartNoLogin.php" (se response è 1). In caso di successo,
 *                 l'utente è rendirizzato alla homepage. Altrimenti se response non è 1, l'utente non esiste
 *                 e viene rilasciato il feedback.
 *   Parametri:    response - 1 se l'utente esiste, altrimenti 0.
 */
function loggedSiteForm(response) {
    if (response == 1) {
        $.ajax({
            url: "../php/carrello/addCartNoLogin.php",
            success: function() {
                window.location = "../index.php";
            },
            error: ajaxFailed,
        });
    } else {
        $("#login div #errorMsgLoginHtml").text("Invalid username and password!");
        $("#login div #errorMsgLoginHtml").show();
    }
}