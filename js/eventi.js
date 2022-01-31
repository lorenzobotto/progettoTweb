/*    Nome:                  Lorenzo
 *    Cognome:               Botto
 *    Descrizione:           Codice JS comune per per la pagina "eventi.php", dove si potranno
 *                           visualizzare gli eventi ricercati.
 *    Sezioni più difficili: La funzione 'listaEventi' è la sezione più difficile in quanto deve
 *                           creare l'HTML corretto per visualizzare tutti gli eventi, creare 
 *                           l'intestazione a seconda dei filtri e definire drag and drop.
 */

// Definisco la variabile globale per l'evento ricercato tramite barra di ricerca nell'header.
var searchEvento = "";

/*
 *   Descrizione:  Al caricarsi della pagina, si configurano click ed eventi. 
 */
$(function() {
    /*  Si controlla con questa chiamata ajax a "controlSearchEvento.php", se è definita
     *   la variabile di sessione per la ricerca dell'evento tramite nome. In caso di successo
     *   si modifica la variabile globale e si chiama la funzione 'cerca'.
     */
    $.ajax({
        url: "../php/eventi/controlSearchEvento.php",
        success: function(response) {
            if (response != 0) {
                searchEvento = response;
                $(".searchTxt").val(response);
                cerca();
            }
        },
        error: ajaxFailed,
    });

    // Si definisce l'evento se viene modificata la selezione della categoria.
    $("#listCat").on('change', showSotCat);

    // Si definisce il click del pulsante per cercare gli eventi.
    $("#cerca").click(cerca);

    /*  Se la select non ha 5 opzioni, significa che è stata cliccata una categoria
     *   dal footer, quindi 'triggero' due eventi.
     */
    if ($("#listCat option").length < 5) {
        $("#listCat").trigger("change");
        $("#cerca").trigger("click");
    }

    /*  Se viene selezionata una data di partenza, si definisce l'attributo 'min'
     *   per la data di arrivo.
     */
    $("#dateFrom").change(function() {
        $("#dateTo")[0].setAttribute('min', $("#dateFrom").val());
    })

    /*  Se viene selezionata una data di arrivo, si definisce l'attributo 'min'
     *   per la data di partenza.
     */
    $("#dateTo").change(function() {
        $("#dateFrom")[0].setAttribute('max', $("#dateTo").val());
    })
})

/*
 *   Descrizione:  Funzione che quando viene modificata la categoria selezionata, mostra
 *                 il menù delle sottocategorie inserendo quelle giuste per la categoria selezionata, 
 *                 successivamente mostra anche i selettori delle date.
 */
function showSotCat() {
    if ($("#listSotCat").is(":hidden")) {
        $("#listSotCat").show();
        $("#customArrowSotCat").show();
        $("input[type='date']").show();
        $("#cerca").show();
    }
    $("#listSotCat").empty();
    if ($("#listCat option:selected").text() === 'Concerti') {
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='PopRock'> Pop e Rock </option>");
        $("#listSotCat").append("<option value='Jazz'> Jazz </option>");
        $("#listSotCat").append("<option value='Metal'> Metal </option>");
        $("#listSotCat").append("<option value='Festival'> Festival </option>");
    } else if ($("#listCat option:selected").text() === 'Sport') {
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='Calcio'> Calcio </option>");
        $("#listSotCat").append("<option value='Tennis'> Tennis </option>");
        $("#listSotCat").append("<option value='Basket'> Basket </option>");
        $("#listSotCat").append("<option value='Rugby'> Rugby </option>");
    } else if ($("#listCat option:selected").text() === 'Mostre e Musei') {
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='MostreStoria'> Mostre d'arte e storia </option>");
        $("#listSotCat").append("<option value='MuseiSiti'> Musei e siti archeologici </option>");
    } else if ($("#listCat option:selected").text() === 'Teatro') {
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='Musical'> Musical e varietà </option>");
        $("#listSotCat").append("<option value='Prosa'> Prosa </option>");
        $("#listSotCat").append("<option value='TeatroLirico'> Teatro lirico </option>");
        $("#listSotCat").append("<option value='BallettoCeM'> Balletto classico e moderno </option>");
    } else {
        $("#listSotCat").hide();
        $("#customArrowSotCat").hide();
        $("input[type='date']").hide();
        $("#cerca").hide();
    }
}

/*
 *   Descrizione:  Funzione per quando vengono ricercati gli eventi. Vengono creati dinamicamente
 *                 i dati da passare alla chiamata ajax "getList.php", perchè la sottocategoria e
 *                 le date potrebbero anche essere non selezionate. Vengono passati questi dati come
 *                 parametro (categoria, sottocategoria (se selezionata), date (se selezionate)) e in 
 *                 caso di successo chiama la funzione 'listaEventi'.
 */
function cerca() {
    var data = "categoria=";
    data += $("#listCat option:selected").text().trim() + "&";
    if (!$("#listSotCat option:selected").text().trim().startsWith("Seleziona")) {
        data += "sottocategoria=" + $("#listSotCat option:selected").text().trim() + "&";
    }
    if (!($("#dateFrom").val() == "")) {
        var date = new Date($("#dateFrom").val());
        data += "dataDa=" + date.getFullYear() + "/" + ('0' + (date.getMonth() + 1)).slice(-2) + "/" + ('0' + date.getDate()).slice(-2) + "&";
    }

    if (!($("#dateTo").val() == "")) {
        var date = new Date($("#dateTo").val());
        data += "dataA=" + date.getFullYear() + "/" + ('0' + (date.getMonth() + 1)).slice(-2) + "/" + ('0' + date.getDate()).slice(-2) + "&";
    }
    $.ajax({
        url: "../php/eventi/getList.php",
        type: "POST",
        data: data.slice(0, -1),
        datatype: "json",
        success: listaEventi,
        error: ajaxFailed,
    });
}

/*
 *   Descrizione:  Funzione che quando si inizia un drag, cioè si inizia a trascinare un evento,
 *                 salva il dato relativo all'ID dell'elemento.
 */
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}


/*
 *   Descrizione:  Funzione che scorre l'oggetto JSON contenente tutti gli eventi ricercati e
 *                 crea l'HTML per visualizzarli in modo corretto, con informazioni sull'evento
 *                 e possibilità di aggiungerlo al carrello. Viene anche creata un'intestazione
 *                 della sezione con i filtri che sono stati utilizzati e vengono definiti
 *                 gli eventi di drag and drop per l'aggiunta degli eventi nel carrello tramite
 *                 trascinamento.
 */
function listaEventi(json) {
    if (json.eventi.length == 0) {
        $(".sectionResults").show();
        $("#results").hide();
        $("#emptyResults").show();
        if (searchEvento != 0) {
            $("#emptyResults p").text("Non sono stati trovati risultati per '" + searchEvento + "'");
            searchEvento = 0;
        } else {
            var stringText = "";
            stringText = "Non sono stati trovati risultati per " + $("#listCat option:selected").text().trim().toLowerCase();
            if (!$("#listSotCat option:selected").text().trim().startsWith("Seleziona")) {
                stringText += " con sotto-categoria " + $("#listSotCat option:selected").text().trim().toLowerCase();
            }
            if (!($("#dateFrom").val() == "")) {
                var date = new Date($("#dateFrom").val());
                stringText += " dal " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
            }
            if (!($("#dateTo").val() == "")) {
                var date = new Date($("#dateTo").val());
                stringText += " al " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
            }
            $("#emptyResults p").text(stringText + "!");
        }
    } else {
        $(".sectionResults").show();
        $("#results").show();
        $("#emptyResults").hide();
        $("#results").empty();
        var i = 0;
        json.eventi.forEach(function(item) {
            var div = $("<div id='container" + i + "' class='container' draggable='true' ondragstart='drag(event)'></div>");
            var image = $("<div class='imgBox'><img src='" + item.url + "' alt='Immagine " + item.titolo + "' draggable='false'></div>");
            var contentString = "<div class='content'><h2>" + item.titolo + "</h2>";
            if (!item.descrizione == "") {
                contentString += "<p>" + item.descrizione + "</p>";
            }
            contentString += "<p class='luogo'>" + item.citta + " - " + item.luogo + "</p>";
            var data = item.data.substring(8, 10) + "/" + item.data.substring(5, 7) + "/" + item.data.substring(0, 4);
            contentString += "<p>" + data + " | " + item.ora + "</p>";
            var content = $(contentString);
            var buy = $("<div class='buy'><div class='buy-specs'><p>Prezzo: " + item.prezzo +
                "</p><div class='quantityDiv'><p>Quantità: </p><div class='customSelectCat'><select id='quantity" +
                i + "'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option>" +
                "<option value='4'>4</option><option value='5'>5</option></select><span class='customArrowCat'></span></div></div>" +
                "<button id='button" + i + "'>Aggiungi al carrello</button></div><span id='messageAdd" +
                i + "' style='opacity:0;margin:0 auto'>Limite raggiunto!</span>");
            div.append(image);
            div.append(content);
            div.append(buy);
            $("#results").append(div);
            $("#button" + i).click({
                param1: item.id,
                param2: i
            }, listenerAddButton);
            i++;
        });
        var intestazione = "";
        if (searchEvento != 0) {
            if (i == 1) {
                intestazione = "<p id='headerResults'>" + i + " risultato trovato per '" + searchEvento + "' ";
            } else {
                intestazione = "<p id='headerResults'>" + i + " risultati trovati per '" + searchEvento + "' ";
            }
            searchEvento = 0;
        } else {
            if (i == 1) {
                intestazione = "<p id='headerResults'>" + i + " risultato trovato per " + $("#listCat option:selected").text().trim().toLowerCase() + " ";
                if (!$("#listSotCat option:selected").text().trim().startsWith("Seleziona")) {
                    intestazione += "con sotto-categoria " + $("#listSotCat option:selected").text().trim().toLowerCase() + " ";
                }
                if (!($("#dateFrom").val() == "")) {
                    var date = new Date($("#dateFrom").val());
                    intestazione += "dal " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
                if (!($("#dateTo").val() == "")) {
                    var date = new Date($("#dateTo").val());
                    intestazione += "al " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
            } else {
                intestazione = "<p id='headerResults'>" + i + " risultati trovati per " + $("#listCat option:selected").text().trim().toLowerCase() + " ";
                if (!$("#listSotCat option:selected").text().trim().startsWith("Seleziona")) {
                    intestazione += "con sotto-categoria " + $("#listSotCat option:selected").text().trim().toLowerCase() + " ";
                }
                if (!($("#dateFrom").val() == "")) {
                    var date = new Date($("#dateFrom").val());
                    intestazione += "dal " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
                if (!($("#dateTo").val() == "")) {
                    var date = new Date($("#dateTo").val());
                    intestazione += "al " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
            }
        }
        $("#results").prepend(intestazione.slice(0, -1) + "</p>");

        $("#headerCarrello").on("dragover", function(event) {
            event.preventDefault();
        });
        /*
         *   Descrizione:  Evento di drop sull'icona del carrello nell'header.
         *                 Quando un biglietto e rilasciato dal mouse su questa icona,
         *                 viene effettuata una chiamata ajax ad "addToCart.php" che aggiunge
         *                 il biglietto al carrello. Vengono passati come parametri l'ID dell'evento
         *                 e la quantità. In caso di successo, mostrerà un feedback all'utente sia 
         *                 di errore che di successo.
         */
        $("#headerCarrello").on("drop", function(event) {
            event.preventDefault();
            $(this).removeClass('hoverDrag');
            var data = event.originalEvent.dataTransfer.getData("text");
            data = parseInt(data.substr(data.length - 1));
            $.ajax({
                url: "../php/carrello/addToCart.php",
                type: "POST",
                data: "addEvento=" + json.eventi[data].id + "&quantita=" + $("#quantity" + data + " option:selected").text().trim(),
                success: function(response) {
                    if (response == 0) {
                        $("#messageAdd" + data).fadeTo(500, 1);
                        $("#messageAdd" + data).text("Limite raggiunto! (5)");
                        var offsetElement = $("#messageAdd" + data).offset().top - $(window).scrollTop();
                        var offset = $("#container" + data).offset().top - $(window).scrollTop();
                        if (offsetElement > window.innerHeight) {
                            $('html,body').animate({
                                scrollTop: offset
                            }, 1000);
                        }
                        $("#messageAdd" + data).css("color", "red");
                        setTimeout(function() {
                            $("#messageAdd" + data).fadeTo(500, 0);
                        }, 3000);
                    } else if (response.startsWith("Quantità non")) {
                        $("#messageAdd" + data).fadeTo(500, 1);
                        $("#messageAdd" + data).text("Quantità non valida!");
                        $("#messageAdd" + data).css("color", "red");
                        setTimeout(function() {
                            $("#messageAdd" + data).fadeTo(500, 0);
                        }, 3000);
                    } else if (response.startsWith("Biglietti aggiunti e limite")) {
                        $("#messageAdd" + data).fadeTo(500, 1);
                        $("#messageAdd" + data).text("Biglietti aggiunti!");
                        var offsetElement = $("#messageAdd" + data).offset().top - $(window).scrollTop();
                        var offset = $("#container" + data).offset().top - $(window).scrollTop();
                        if (offsetElement > window.innerHeight) {
                            $('html,body').animate({
                                scrollTop: offset
                            }, 1000);
                        }
                        $("#messageAdd" + data).css("color", "green");
                        setTimeout(function() {
                            $("#messageAdd" + data).fadeTo(500, 0);
                        }, 2000);
                        setTimeout(function() {
                            $("#messageAdd" + data).fadeTo(500, 1);
                            $("#messageAdd" + data).text("Limite raggiunto! (5)");
                            $("#messageAdd" + data).css("color", "red");
                            setTimeout(function() {
                                $("#messageAdd" + data).fadeTo(500, 0);
                            }, 2000);
                        }, 2500)
                    } else {
                        if ($("#quantity" + data + " option:selected").text().trim() == 1) {
                            $("#cartCount").text(response);
                            $("#messageAdd" + data).fadeTo(500, 1);
                            $("#messageAdd" + data).text("Biglietto aggiunto!");
                            var offsetElement = $("#messageAdd" + data).offset().top - $(window).scrollTop();
                            var offset = $("#container" + data).offset().top - $(window).scrollTop();
                            if (offsetElement > window.innerHeight) {
                                $('html,body').animate({
                                    scrollTop: offset
                                }, 1000);
                            }
                            $("#messageAdd" + data).css("color", "green");
                            setTimeout(function() {
                                $("#messageAdd" + data).fadeTo(500, 0);
                            }, 3000);
                        } else {
                            $("#cartCount").text(response);
                            $("#messageAdd" + data).fadeTo(500, 1);
                            $("#messageAdd" + data).text("Biglietti aggiunti!");
                            var offsetElement = $("#messageAdd" + data).offset().top - $(window).scrollTop();
                            var offset = $("#container" + data).offset().top - $(window).scrollTop();
                            if (offsetElement > window.innerHeight) {
                                $('html,body').animate({
                                    scrollTop: offset
                                }, 1000);
                            }
                            $("#messageAdd" + data).css("color", "green");
                            setTimeout(function() {
                                $("#messageAdd" + data).fadeTo(500, 0);
                            }, 3000);
                        }
                    }
                },
                error: ajaxFailed,
            });
            event.stopPropagation();
            return false;
        });
    }
}

/*
 *   Descrizione:  Funzione che aggiunge un biglietto al carrello effettuando
 *                 una chiamata ajax ad "addToCart.php" che aggiunge
 *                 il biglietto al carrello. Vengono passati come parametri l'ID dell'evento
 *                 e la quantità. In caso di successo, mostrerà un feedback all'utente sia 
 *                 di errore che di successo.
 */
function listenerAddButton(e) {
    $.ajax({
        url: "../php/carrello/addToCart.php",
        type: "POST",
        data: "addEvento=" + e.data.param1 + "&quantita=" + $("#quantity" + e.data.param2 + " option:selected").text().trim(),
        success: function(response) {
            if (response == 0) {
                $("#messageAdd" + e.data.param2).fadeTo(500, 1);
                $("#messageAdd" + e.data.param2).text("Limite raggiunto! (5)");
                $("#messageAdd" + e.data.param2).css("color", "red");
                setTimeout(function() {
                    $("#messageAdd" + e.data.param2).fadeTo(500, 0);
                }, 3000);
            } else if (response.startsWith("Quantità")) {
                $("#messageAdd" + e.data.param2).fadeTo(500, 1);
                $("#messageAdd" + e.data.param2).text("Quantità non valida!");
                $("#messageAdd" + e.data.param2).css("color", "red");
                setTimeout(function() {
                    $("#messageAdd" + e.data.param2).fadeTo(500, 0);
                }, 3000);
            } else if (response.startsWith("Biglietti aggiunti e limite")) {
                $("#messageAdd" + e.data.param2).fadeTo(500, 1);
                $("#messageAdd" + e.data.param2).text("Biglietti aggiunti!");
                $("#messageAdd" + e.data.param2).css("color", "green");
                setTimeout(function() {
                    $("#messageAdd" + e.data.param2).fadeTo(500, 0);
                }, 2000);
                setTimeout(function() {
                    $("#messageAdd" + e.data.param2).fadeTo(500, 1);
                    $("#messageAdd" + e.data.param2).text("Limite raggiunto! (5)");
                    $("#messageAdd" + e.data.param2).css("color", "red");
                    setTimeout(function() {
                        $("#messageAdd" + e.data.param2).fadeTo(500, 0);
                    }, 2000);
                }, 2500)
            } else {
                if ($("#quantity" + e.data.param2 + " option:selected").text().trim() == 1) {
                    $("#cartCount").text(response);
                    $("#messageAdd" + e.data.param2).fadeTo(500, 1);
                    $("#messageAdd" + e.data.param2).text("Biglietto aggiunto!");
                    $("#messageAdd" + e.data.param2).css("color", "green");
                    setTimeout(function() {
                        $("#messageAdd" + e.data.param2).fadeTo(500, 0);
                    }, 3000);
                } else {
                    $("#cartCount").text(response);
                    $("#messageAdd" + e.data.param2).fadeTo(500, 1);
                    $("#messageAdd" + e.data.param2).text("Biglietti aggiunti!");
                    $("#messageAdd" + e.data.param2).css("color", "green");
                    setTimeout(function() {
                        $("#messageAdd" + e.data.param2).fadeTo(500, 0);
                    }, 3000);
                }
            }
        },
        error: ajaxFailed,
    });
}