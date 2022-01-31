/*    Nome:                  Lorenzo
 *    Cognome:               Botto
 *    Descrizione:           Codice JS per per la pagina "carrello.php", che visualizza tutti i biglietti
 *                           inseriti nel carrello dall'utente, con il numero ed il prezzo totale.
 *    Sezioni più difficili: La funzione 'listaCarrello' è la sezione più difficile in quanto deve
 *                           creare l'HTML corretto per visualizzare tutti i biglietti del carrello e
 *                           deve visualizzare il numero totale dei biglietti ed il prezzo totale.
 */

/*
 *   Descrizione:  Al caricarsi della pagina, configuro i click dei pulsanti e dei link, ed effettuo
 *                 una chiamata ajax a "getCarrello.php" per recuperare tutti i biglietti nel carrello. 
 */
$(function() {
    //Si definisce il click del button quando il carrello è vuoto per reindirizzare agli eventi.
    $("#eventiButton").click(function() {
        window.location = "eventi.php";
    });

    //Si definisce il click del button per svuotare il carrello.
    $("#svuota").click(svuota);

    //Si definisce il click del button per concludere un acquisto.
    $("#concludi").click(concludi);

    /*  Si definisce il click del button per quando è stato concluso un acquisto e si vuole visualizzare
     *   tutti gli ordini.
     */
    $("#buttonAcquista").click(function() {
        window.location = "biglietti.php";
    });

    /*  Si effettua una chiamata ajax per recupare tutti i biglietti nel carrello. In caso di successo
     *   viene richiamata la funzione 'listaCarrello'.
     */
    $.ajax({
        url: "../php/carrello/getCarrello.php",
        datatype: "json",
        success: listaCarrello,
        error: ajaxFailed,
    });
})

/*
 *   Descrizione:  Funzione che conclude un acquisto. Si controllano che le quantità abbiano valori validi, altrimenti
 *                 si restituisce un errore. Altrimenti, se l'utente ha effettuato il login, si effettua una chiamata
 *                 ajax ad "addAcquisto.php" per inserire l'ordine nel database. In caso di successo mostra un feedback.
 *                 Successivamente viene effettuata un'altra chiamata ajax a "removeFromCart.php" per svuotare il carrello.
 *                 In caso di successo, viene solo modificato il numero degli eventi nell'header. 
 *                 Se l'utente non ha effettuato il login, verrà rilasciato un feedback.
 */
function concludi() {
    var i = 0;
    var regex = /^[1-5]$/;
    var prosegui = true;
    $("#ticketsCarrello").children("div").each(function() {
        if (!regex.test($("#quantity" + i + " option:selected").text().trim())) {
            $("#errorAcquisto").fadeIn();
            $("#errorAcquisto").text("Non è possibile completare l'acquisto. Sono presenti dati non validi!");
            $("#concludi").prop("disabled", true);
            prosegui = false;
        }
        i++;
    })
    if (prosegui == true) {
        if ($("#userLogged").length != 0) {
            $.ajax({
                url: "../php/ordini/addAcquisto.php",
                success: function() {
                    $("#resultsCarrello").hide();
                    $("#acquisto").show();
                    $.ajax({
                        url: "../php/carrello/removeFromCart.php",
                        type: "POST",
                        data: "all=true",
                        success: function(response) {
                            $("#cartCount").text(response);
                        },
                        error: ajaxFailed,
                    });
                },
                error: ajaxFailed,
            });
        } else {
            $("#errorAcquisto").text("Devi effettuare il login per completare l'acquisto!");
            $("#errorAcquisto").fadeIn();
            setTimeout(function() {
                $("#errorAcquisto").fadeOut();
            }, 3000);
            var arrowReg = $("#arrowUpRegistrazione");
            var registrazioneform = $("#registrazioneForm");
            var arrowLog = $("#arrowUpLogin");
            var loginform = $("#loginForm");
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
            }
        }
    }
}

/*
 *   Descrizione:  Funzione che scorre l'oggetto JSON contenente tutti i biglietti del carrello, e crea l'HTML
 *                 per visualizzarli sulla pagina, con il numero dei biglietti e il prezzo totale dell'ordine.
 *                 Inoltre vengono mostrati anche le informazioni sull'evento e la possibilità di rimuoverlo
 *                 dal carrello.
 *   Parametri:    json - Oggetto JSON contenente tutti gli ordini di un utente.
 */
function listaCarrello(json) {
    if (json.carrello.length == 0) {
        $("#ticketsCarrello").hide();
        $("#totalPrice").hide();
        $("#resultsCarrello").hide();
        $("#acquisto").hide();
        $("#carrelloEmpty").show();
    } else {
        $("#carrelloEmpty").hide();
        $("#acquisto").hide();
        $("#carrello").show();
        $("#resultsCarrello").css("display", "flex");
        $("#ticketsCarrello").show();        
        $("#totalPrice").css("display", "flex");
        $("#ticketsCarrello").empty();
        var i = 0;
        var totalPrice = 0;
        var quantity = 0;
        json.carrello.forEach(function(item) {
            var div = $("<div class='container'></div>");
            var image = $("<div class='imgBox'><img src='" + item.url + "' alt='Immagine " + item.titolo + "'></div>");
            var contentString = "<div class='content'><h2>" + item.titolo + "</h2>";
            if (!item.descrizione == "") {
                contentString += "<p>" + item.descrizione + "</p>";
            }
            contentString += "<p class='luogo'>" + item.citta + " - " + item.luogo + "</p>";
            var data = item.data.substring(8, 10) + "/" + item.data.substring(5, 7) + "/" + item.data.substring(0, 4);
            contentString += "<p>" + data + " | " + item.ora + "</p>";
            var content = $(contentString);
            var buy = $("<div class='buy'><p>Prezzo: <span id='prezzoSpan" + i + "' style='display: inline-block'>" +
                item.prezzo + "</span></p><div class='quantityDiv'><p>Quantità: </p><div class='customSelectCat'><select id='quantity" +
                i + "'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option>" +
                "<option value='5'>5</option></select><span class='customArrowCat'></span></div></div><button id='button" +
                i + "'>Rimuovi dal carrello</button>");
            div.append(image);
            div.append(content);
            div.append(buy);
            $("#ticketsCarrello").append(div);
            if (i < json.carrello.length - 1) {
                $("#ticketsCarrello").append("<hr>");
            }
            $("#button" + i).click({
                param1: item.id,
                param2: i
            }, listenerRemoveButton);
            var price = parseFloat(item.prezzo.replace(",", "."));
            $("#quantity" + i).change({
                param1: price,
                param2: item.id,
                param3: i
            }, quantityChanged);
            i++;
        });
        $("#numberTickets").empty();
        $("#numberTickets").append("<p>Prezzo (<span id='spanQuantity'>" + 
            "biglietto</span>)</p><p id='finalPriceP1'></p>");
        refreshQuantityAndPrice();
    }
}

/*
 *   Descrizione:  Funzione che effettua una chiamata ajax a "changeQuantity.php" per modificare la quantità
 *                 passando come parametri l'id dell'evento e la quantità. In caso di successo, richiamata la
 *                 funzione 'refreshQuantityAndPrice'.
 *   Parametri:    parameters - parametro che contiene l'id dell'evento e la quantità.
 */
function quantityChanged(parameters) {
    $.ajax({
        url: "../php/carrello/changeQuantity.php",
        type: "POST",
        data: "changeEvento=" + parameters.data.param2 + "&quantita=" + $("#quantity" + parameters.data.param3 + " option:selected").text().trim(),
        success: function(response) {
            if (response.startsWith("Errore")) {
                $("#errorAcquisto").fadeIn();
                $("#errorAcquisto").text("Non è possibile completare l'acquisto. Sono presenti dati non validi!");
                $("#concludi").prop("disabled", true);
            } else {
                $("#errorAcquisto").hide();
                $("#concludi").prop("disabled", false);
                refreshQuantityAndPrice();
            }
        },
        error: ajaxFailed,
    });
}

/*
 *   Descrizione:  Funzione che effettua una chiamata ajax a "refreshQuantity.php" per recuperare
 *                 numero, prezzo totale e quantità dei biglietti nel carrello. In caso di successo, richiama
 *                 la funzione 'refresh'.
 */
function refreshQuantityAndPrice() {
    $.ajax({
        url: "../php/carrello/refreshQuantity.php",
        datatype: "json",
        success: refresh,
        error: ajaxFailed,
    });
}

/*
 *   Descrizione:  Funzione che scorre l'oggetto JSON e modifica il prezzo, quantità ed il numero 
 *                 totale dei biglietti.
 *   Parametri:    json - Oggetto JSON che contiene il prezzo ed il numero totale dei biglietti nel carrello.
 */
function refresh(json) {
    $("#finalPriceP").text(json.totale[0].prezzo + " €");
    $("#finalPriceP1").text(json.totale[0].prezzo + " €");
    if (json.totale[0].quantita == 1) {
        $("#spanQuantity").text(json.totale[0].quantita + " biglietto");
    } else {
        $("#spanQuantity").text(json.totale[0].quantita + " biglietti");
    }
    var quantitySelect = json.totale[0].quantitaSelect.split(",");
    var i = 0;
    quantitySelect.forEach(function(item){
        $("#quantity" + i + " option[value ='" + item + "']").attr('selected', 'selected');
        i++;
    });
}

/*
 *   Descrizione:  Funzione che effettua una chiamata ajax a "removeFromCart.php", per rimuovere
 *                 un biglietto dal carrello. Viene passato come parametro l'id dell'evento. In caso
 *                 di successo viene chiamta la funzione 'refreshCart'.
 *   Parametri:    parameter - parametro che contiene l'ID dell'evento da rimuovere.
 */
function listenerRemoveButton(parameter) {
    $.ajax({
        url: "../php/carrello/removeFromCart.php",
        type: "POST",
        data: "removeEvento=" + parameter.data.param1,
        success: refreshCart,
        error: ajaxFailed,
    });
}

/*
 *   Descrizione:  Funzione che effettua una chiamata ajax a "removeFromCart.php", per svuotare
 *                 il carrello. Viene passato come parametro "all=true". In caso di successo viene
 *                 chiamata la funzione 'refreshCart'.
 */
function svuota() {
    $.ajax({
        url: "../php/carrello/removeFromCart.php",
        type: "POST",
        data: "all=true",
        success: refreshCart,
        error: ajaxFailed,
    });
}

/*
 *   Descrizione:  Funzione che effettua una chiamata ajax a "getCarrello.php", per recuperare
 *                 tutti i biglietti presenti nel carrello. In caso di successo, viene
 *                 chiamata la funzione 'listaCarrello'.
 *   Parametri:    response - numero degli eventi presenti nel carrello.
 */
function refreshCart(response) {
    $.ajax({
        url: "../php/carrello/getCarrello.php",
        datatype: "json",
        success: listaCarrello,
        error: ajaxFailed,
    });
    $("#cartCount").text(response);
}