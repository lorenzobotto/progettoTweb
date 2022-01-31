/*    Nome:          Lorenzo
 *    Cognome:       Botto
 *    Descrizione:   Codice JS per per la pagina "register.php", dove si può effettuare la registrazione.
 *                   Si verrà indirizzati in questa pagina solo se la finestra è ridimensionata
 *                   ed è presente il menù laterale.
 */

/*
 *   Descrizione:  Al caricarsi della pagina, configuro il click del pulsante per la registrazione e
 *                 l'eliminazione di messaggi di errore. 
 */
$(function() {
    // Quando cambia l'input dell'email, non vengono visualizzati gli errori e si modifica lo stile.
    $("#registrazione input[name='email']").on('input', function() {
        if ($("#emaildivregHtml div").is(":visible")) {
            $("#registrazione input[name='email']").css("border", "1px solid gray");
            $("#emaildivregHtml div").hide();
        }
    })
    // Quando cambia l'input dell'username, non vengono visualizzati gli errori e si modifica lo stile.
    $("#registrazione input[name='username']").on('input', function() {
        if ($("#usernamedivregHtml div").is(":visible")) {
            $("#registrazione input[name='username']").css("border", "1px solid gray");
            $("#usernamedivregHtml div").hide();
        }
    })
    // Quando cambia l'input della password, non vengono visualizzati gli errori e si modifica lo stile.
    $("#registrazione input[name='password']").on('input', function() {
        if ($("#passworddivregHtml div").is(":visible")) {
            $("#registrazione input[name='password']").css("border", "1px solid gray");
            $("#passworddivregHtml div").hide();
        }
    })
    // Si definisce il click del pulsante della registrazione.
    $("#registerButtonHtml").click(registrazioneForm);
});

/*
 *   Descrizione:  Funzione che effettua la registrazione dell'utente tramite una chiamata ajax a "register.php".
 *                 Vengono controllati i dati in input che non siano vuoti, altrimenti restituisce un feedback.
 *                 Vengono passati come parametri l'email, l'username e la password. In caso di successo viene
 *                 effettuato il login automatico (chimando "getUser.php") o stampati messaggi di errore.
 */
function registrazioneForm() {
    var email = $("#registrazione input[name='email']").val().trim();
    var username = $("#registrazione input[name='username']").val().trim();
    var password = $("#registrazione input[name='password']").val().trim();
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
                    $("#registrazione input[name='password']").css("border", "1px solid red");
                    $("#passworddivregHtml div").text("Password non valida!");
                    $("#passworddivregHtml div").show();
                } else if (response.startsWith("Username con")) {
                    $("#registrazione input[name='username']").css("border", "1px solid red");
                    $("#usernamedivregHtml div").text("Username non valido!");
                    $("#usernamedivregHtml div").show();
                } else if (response.startsWith("Email con")) {
                    $("#registrazione input[name='email']").css("border", "1px solid red");
                    $("#emaildivregHtml div").text("Email non valida!");
                    $("#emaildivregHtml div").show();
                } else if (response.startsWith("Email già")) {
                    $("#registrazione input[name='email']").css("border", "1px solid red");
                    $("#emaildivregHtml div").text("Email già utilizzata!");
                    $("#emaildivregHtml div").show();
                } else if (response.startsWith("Username già")) {
                    $("#registrazione input[name='username']").css("border", "1px solid red");
                    $("#usernamedivregHtml div").text("Username già utilizzato!");
                    $("#usernamedivregHtml div").show();
                }
            },
            error: ajaxFailed,
        });
    }
    if (email == "") {
        $("#registrazione input[name='email']").css("border", "1px solid red");
        $("#emaildivregHtml div").text("Email richiesta!");
        $("#emaildivregHtml div").show();
    }
    if (email != "" && !regex.test(email)) {
        $("#registrazione input[name='email']").css("border", "1px solid red");
        $("#emaildivregHtml div").text("Email non valida!");
        $("#emaildivregHtml div").show();
    }
    if (username == "") {
        $("#registrazione input[name='username']").css("border", "1px solid red");
        $("#usernamedivregHtml div").text("Username richiesto!");
        $("#usernamedivregHtml div").show();
    }
    if (password == "") {
        $("#registrazione input[name='password']").css("border", "1px solid red");
        $("#passworddivregHtml div").text("Password richiesta!");
        $("#passworddivregHtml div").show();
    }
}