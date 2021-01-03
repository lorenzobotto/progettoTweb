$(function(){
    var statusLogged = false;
    var arrowLogged = $("#arrowUpLogged");
    var logoutForm = $("#logoutForm");
    var buttonLogout = $("#userLogged");

    $("#userLogged").click(function(event){
        event.preventDefault();
        if (statusLogged == false){
            arrowLogged.fadeIn();
            logoutForm.fadeIn();
            statusLogged = true;
        } else {
            arrowLogged.fadeOut();
            logoutForm.fadeOut();
            statusLogged = false;
        }
    })

    $("body").click(function(event){
        if (statusLogged == true){
            if (!logoutForm.is(event.target) && logoutForm.has(event.target).length == 0 && !arrowLogged.is(event.target) && arrowLogged.has(event.target).length == 0 && !buttonLogout.is(event.target) && buttonLogout.has(event.target).length == 0){
                arrowLogged.fadeOut();
                logoutForm.fadeOut();
                statusLogged = false;
            }
        }
    })
    $("#buttonLogoutForm").click(endSession);
    $.ajax({
        url: "../php/getBigliettiAcquistati.php", 
        type: "POST",
        datatype: "json",
        success: listaBiglietti,
        error: ajaxFailed,
        }
    );
    $("#searchBox").hover(function() {
            $(".searchTxt").css("width", "240px");
            $(".searchTxt").css("padding", "0 6px");
        }
    );
    $("header").mouseleave(function() {
            $(".searchTxt").css("width", "0");
            $(".searchTxt").css("padding", "0 0");
        }
    );
    $(".searchBtn").click(searchEvent);
})

function searchEvent() {
    if ($(".searchTxt").val().trim() != ""){
        $.ajax({
            url: "../php/searchEvento.php", 
            type: "POST",
            data: "evento=" + $(".searchTxt").val().trim(),
            success: function(){
                window.location = "../html/eventi.php";
            },
            error: ajaxFailed,
            }
        );
    }
}

function listaBiglietti(json){
    if (json.ordini.length == 0){
        $("#bigliettiEmpty").show();
        $("#sectionResults").hide();
    } else {
        $("#sectionResults").show();
        $("#bigliettiEmpty").hide();
        var j = 0;
        json.ordini.forEach(function(item){
            var divOrdine = $("<div id='tickets' class='classTickets'></div>");
            var div1 = $("<div id='containerBig" + j + "' class='containerBig'></div>");
            divOrdine.append(div1);
            var i = 0;
            var totalPrice = 0;
            item.ordine.forEach(function(item2){
                if (i == 0){
                    $data = item2.dataOrdine.substring(8, 10) + "/" + item2.dataOrdine.substring(5, 7) + "/" + item2.dataOrdine.substring(0, 4);
                    div1.append("<div id='descOrdine'><p>Ordine " + item2.id + " - Effettuato il: " + $data + "</p><p>Prezzo totale: <span id='prezzoOrdine" + j + "'></span></p></div><hr style='width: 100%;'>");
                }
                var div = $("<div id='container'></div>");
                var image = $("<div id='imgBox'><img src='" + item2.url + "' alt=''></div>");
                var contentString = "<div id='content'><h2>" + item2.titolo + "</h2>";
                if (!item2.descrizione == ""){
                    contentString += "<p>" + item2.descrizione + "</p>";
                }
                contentString += "<p id='luogo'>" + item2.citta + " - " + item2.luogo + "</p>";
                var data = item2.data.substring(8, 10) + "/" + item2.data.substring(5, 7) + "/" + item2.data.substring(0, 4);
                contentString += "<p>" + data + " | " + item2.ora + "</p>";
                var content = $(contentString);
                var buy = $("<div id='buy'><p>Prezzo: " + item2.prezzo + "</p><p>Quantità: " + item2.quantita + "</p>");
                div.append(image);
                div.append(content);
                div.append(buy);
                div1.append(div);
                $("#sectionResults").append(divOrdine);
                if (i < item.ordine.length -1){
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
        $(".classTickets").show();
    }
}

function endSession(){
    window.location = "../php/logout.php";
}

function ajaxFailed(e) {
	var errorMessage = "Error making Ajax request:\n\n";
	errorMessage += "Server status:\n" + e.status + " " + e.statusText + 
		                "\n\nServer response text:\n" + e.responseText;
    alert(errorMessage);
}