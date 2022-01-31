/*    Nome:                  Lorenzo
 *    Cognome:               Botto
 *    Descrizione:           Codice JS per per la pagina "biglietti.php", che visualizza tutti gli ordini
 *                           di un utente.
 *    Sezioni più difficili: La funzione 'listaBiglietti' è la sezione più difficile in quanto deve
 *                           creare l'HTML corretto per visualizzare tutti gli ordini con la data ed
 *                           il prezzo totale dell'ordine.
 */

/*
 *   Descrizione:  Al caricarsi della pagina, configuro i click dei pulsanti e dei link, ed effettuo
 *                 una chiamata ajax a "getBigliettiAcquistati.php" per recuperare gli ordini. 
 */
$(function() {
    var statusLogged = false;
    var arrowLogged = $("#arrowUpLogged");
    var logoutForm = $("#logoutForm");
    var buttonLogout = $("#userLogged");

    // Si definisce il click per il link di logout nel footer
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

    // Si definisce il click nel body, così da chiudere il menù dell'utente (sezione privata) se è aperto.
    $("body").click(function(event) {
        if (statusLogged == true) {
            if (!logoutForm.is(event.target) && logoutForm.has(event.target).length == 0 &&
                !arrowLogged.is(event.target) && arrowLogged.has(event.target).length == 0 &&
                !buttonLogout.is(event.target) && buttonLogout.has(event.target).length == 0) {
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

    // Si definisce il click del pulsante di logout all'interno del menù dell'utente (sezione privata).
    $("#buttonLogoutForm").click(endSession);

    /*  Si definiscono i click ai link delle categorie nel footer, effettuando una chiamata ajax a
     *   "selectedOption.php" passando come parametro l'HTML del menù a tendina. In caso di successo,
     *   l'utente viene reindirizzato nella pagina degli eventi.
     */
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

    // Si definisce il click sul pulsante che rimanda agli eventi, se non sono stati effettuati ordini.
    $("#eventiButton").click(function() {
        window.location = "eventi.php";
    })

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

    /*  Si effettua una chiamata ajax per recuperare tutti gli ordini di un utente.
     *   In caso di successo viene richiamata la funzione 'listaBiglietti'.
     */
    $.ajax({
        url: "../php/ordini/getBigliettiAcquistati.php",
        datatype: "json",
        success: listaBiglietti,
        error: ajaxFailed,
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
 *   Descrizione:  Funzione che scorre l'oggetto JSON contenente tutti gli ordini, e crea l'HTML
 *                 per visualizzarli sulla pagina, con la data e il
 *                 prezzo totale dell'ordine.
 *   Parametri:    json - Oggetto JSON contenente tutti gli ordini di un utente.
 */
function listaBiglietti(json) {
    if (json.ordini.length == 0) {
        $("#bigliettiEmpty").show();
        $(".sectionResults").hide();
    } else {
        $(".sectionResults").show();
        $("#bigliettiEmpty").hide();
        var j = 0;
        json.ordini.forEach(function(item) {
            var divOrdine = $("<div class='ticketsOrdini'></div>");
            var div1 = $("<div id='containerBig" + j + "' class='containerBig'></div>");
            divOrdine.append(div1);
            var i = 0;
            var totalPrice = 0;
            item.ordine.forEach(function(item2) {
                if (i == 0) {
                    $data = item2.dataOrdine.substring(8, 10) + "/" + item2.dataOrdine.substring(5, 7) + "/" + item2.dataOrdine.substring(0, 4);
                    div1.append("<div class='descOrdine'><p>Ordine " + item2.id + " - Effettuato il: " + $data +
                        "</p><p>Prezzo totale: <span id='prezzoOrdine" + j + "'></span></p></div><hr style='width: 100%;'>");
                }
                var div = $("<div class='container'></div>");
                var image = $("<div class='imgBox'><img src='" + item2.url + "' alt='Immagine " + item2.titolo + "'></div>");
                var contentString = "<div class='content'><h2>" + item2.titolo + "</h2>";
                if (!item2.descrizione == "") {
                    contentString += "<p>" + item2.descrizione + "</p>";
                }
                contentString += "<p class='luogo'>" + item2.citta + " - " + item2.luogo + "</p>";
                var data = item2.data.substring(8, 10) + "/" + item2.data.substring(5, 7) + "/" + item2.data.substring(0, 4);
                contentString += "<p>" + data + " | " + item2.ora + "</p>";
                var content = $(contentString);
                var buy = $("<div class='buy'><p>Prezzo: " + item2.prezzo + "</p><p>Quantità: " + item2.quantita + "</p>");
                div.append(image);
                div.append(content);
                div.append(buy);
                div1.append(div);
                $(".sectionResults").append(divOrdine);
                if (i < item.ordine.length - 1) {
                    $("#containerBig" + j).append("<hr>");
                }
                i++;
                var price = parseFloat(item2.prezzo.replace(",", "."));
                var quantity = parseInt(item2.quantita);
                totalPrice += price * quantity;
            });
            $("#prezzoOrdine" + j).text(totalPrice.toFixed(2).toString().replace(".", ",") + " €");
            j++;
        });
        $(".ticketsOrdini").show();
    }
}

/*
 *   Descrizione:  Funzione che effettua il logout.
 */
function endSession() {
    window.location = "../php/utenti/logout.php";
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