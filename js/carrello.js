var statusLogin = false;
var statusRegistrati = false;
var statusLogged = false;

$(function(){
    $.ajax({
        url: "../php/getCarrello.php", 
        type: "POST",
        datatype: "json",
        success: listaCarrello,
        error: ajaxFailed,
        }
    );

    var arrowReg =  $("#arrowUpRegistrazione");
    var registrazioneform =  $("#registrazioneForm");
    var arrowLog =  $("#arrowUpLogin");
    var loginform =  $("#loginForm");
    var buttonLogin = $("#buttonLogin");
    var arrowLogged = $("#arrowUpLogged");
    var logoutForm = $("#logoutForm");
    var buttonLogout = $("#userLogged");
    var buttonRegistrati = $("#buttonRegistrati");
    var footerLogin = $("#footerLogin");
    var footerRegistrazione = $("#footerRegistrazione");
    $("#buttonRegistrati").click(function(event){
        event.preventDefault();
        if (statusRegistrati == false){
            if (statusLogin == true){
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
    })
    $("#buttonLogin").click(function(event){
        event.preventDefault();
        if (statusLogin == false){
            if (statusRegistrati == true){
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
    })

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
        if (statusLogin == true){
            if (!loginform.is(event.target) && loginform.has(event.target).length == 0 && !arrowLog.is(event.target) && arrowLog.has(event.target).length == 0 && !buttonLogin.is(event.target) && buttonLogin.has(event.target).length == 0 && !footerLogin.is(event.target) && footerLogin.has(event.target).length == 0){
                arrowLog.fadeOut();
                loginform.fadeOut();
                statusLogin = false;
            } 
        }
        if (statusRegistrati == true){
            if (!registrazioneform.is(event.target) && registrazioneform.has(event.target).length == 0 && !arrowReg.is(event.target) && arrowReg.has(event.target).length == 0 && !buttonRegistrati.is(event.target) && buttonRegistrati.has(event.target).length == 0 && !footerRegistrazione.is(event.target) && footerRegistrazione.has(event.target).length == 0){
                arrowReg.fadeOut();
                registrazioneform.fadeOut();
                statusRegistrati = false;
            }
        } 
        if (statusLogged == true){
            if (!logoutForm.is(event.target) && logoutForm.has(event.target).length == 0 && !arrowLogged.is(event.target) && arrowLogged.has(event.target).length == 0 && !buttonLogout.is(event.target) && buttonLogout.has(event.target).length == 0){
                arrowLogged.fadeOut();
                logoutForm.fadeOut();
                statusLogged = false;
            }
        }
    })

    $("#loginForm input[name='username']").on('input', function(){
        if ($("#usernamedivlogin div").is(":visible")){
            $("#loginForm input[name='username']").css("border", "1px solid gray");
            $("#usernamedivlogin div").hide();
        }
    })
    $("#loginForm input[name='password']").on('input', function(){
        if ($("#passworddivlogin div").is(":visible")){
            $("#loginForm input[name='password']").css("border", "1px solid gray");
            $("#passworddivlogin div").hide();
        }
    })
    $("#registrazioneForm input[name='email']").on('input', function(){
        if ($("#emaildivreg div").is(":visible")){
            $("#registrazioneForm input[name='email']").css("border", "1px solid gray");
            $("#emaildivreg div").hide();
        }
    })
    $("#registrazioneForm input[name='username']").on('input', function(){
        if ($("#usernamedivreg div").is(":visible")){
            $("#registrazioneForm input[name='username']").css("border", "1px solid gray");
            $("#usernamedivreg div").hide();
        }
        if ($("#loginForm input[name='username']").val().trim() == ""){
            $("#registrazioneForm input[name='username']").css("border", "1px solid gray");
        }
    })
    $("#registrazioneForm input[name='password']").on('input', function(){
        if ($("#passworddivreg div").is(":visible")){
            $("#registrazioneForm input[name='password']").css("border", "1px solid gray");
            $("#passworddivreg div").hide();
        }
        if ($("#loginForm input[name='password']").val().trim() == ""){
            $("#registrazioneForm input[name='password']").css("border", "1px solid gray");
        }
    })

    $("#buttonLoginForm").click(login);
    $("#buttonRegistratiForm").click(registrazione);
    $("#buttonLogoutForm").click(endSession);
    $("#eventiButton").click(function(){
        window.location = "eventi.php";
    });
    $("#svuota").click(svuota);
    $("#concludi").click(concludi);
    $("#buttonAcquista").click(function(){
        window.location = "biglietti.php";
    });
    $("#footerConcerti").click(function(){
        $.ajax({
            url: "../php/selectedOption.php", 
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti' selected>Concerti</option><option value='Sport'>Sport</option><option value='MostreEMusei'>Mostre e Musei</option><option value='Teatro'>Teatro</option></select>",
            success: function(){
                window.location = "eventi.php";
            },
            error: ajaxFailed,
            }
        );
    })
    $("#footerSport").click(function(){
        $.ajax({
            url: "../php/selectedOption.php", 
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti'>Concerti</option><option value='Sport' selected>Sport</option><option value='MostreEMusei'>Mostre e Musei</option><option value='Teatro'>Teatro</option></select>",
            success: function(){
                window.location = "eventi.php";
            },
            error: ajaxFailed,
            }
        );
    })
    $("#footerMostre").click(function(){
        $.ajax({
            url: "../php/selectedOption.php", 
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti'>Concerti</option><option value='Sport'>Sport</option><option value='MostreEMusei' selected>Mostre e Musei</option><option value='Teatro'>Teatro</option></select>",
            success: function(){
                window.location = "eventi.php";
            },
            error: ajaxFailed,
            }
        );
    })
    $("#footerTeatro").click(function(){
        $.ajax({
            url: "../php/selectedOption.php", 
            type: "POST",
            data: "optionSelected=<select id='listCat'><option value='Concerti'>Concerti</option><option value='Sport'>Sport</option><option value='MostreEMusei'>Mostre e Musei</option><option value='Teatro' selected>Teatro</option></select>",
            success: function(){
                window.location = "eventi.php";
            },
            error: ajaxFailed,
            }
        );
    })
    $("#footerLogin").click(function(event){
        event.preventDefault();
        if (statusLogin == false){
            if (statusRegistrati == true){
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
        $('html,body').animate({scrollTop: offset}, 1000);
    })
    $("#footerRegistrazione").click(function(event){
        event.preventDefault();
        if (statusRegistrati == false){
            if (statusLogin == true){
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
        $('html,body').animate({scrollTop: offset}, 1000);
    })
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

function concludi(){
    if ($("#userLogged").length != 0){
        $.ajax({
            url: "../php/addAcquisto.php", 
            type: "POST",
            error: ajaxFailed,
            }
        );
        $("#resultsCarrello").hide();
        $("#acquisto").show();
        $.ajax({
            url: "../php/removeFromCart.php", 
            type: "POST",
            data: "all=true",
            success: function(response){
                $("#cartCount").text(response);
            },
            error: ajaxFailed,
            }
        );
    } else {
        $("#errorAcquisto").fadeIn();
        setTimeout(function(){
            $("#errorAcquisto").fadeOut();
        }, 3000);
        var arrowReg =  $("#arrowUpRegistrazione");
        var registrazioneform =  $("#registrazioneForm");
        var arrowLog =  $("#arrowUpLogin");
        var loginform =  $("#loginForm");
        if (statusLogin == false){
            if (statusRegistrati == true){
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

function endSession(){
    window.location = "../php/logout.php";
}

function login(){
    var username = $("#loginForm input[name='username']").val().trim();
    var password = $("#loginForm input[name='password']").val().trim();
    if (username != "" && password != ""){
        $.ajax({
            url: "../php/getUser.php", 
            type: "POST",
            data: "username=" + username + "&password=" + password,
            success: loggedSite,
            error: ajaxFailed,
            }
        );
    }
    if (username == ""){
        $("#loginForm input[name='username']").css("border", "1px solid red");
        $("#usernamedivlogin div").show();
    }
    if (password == ""){
        $("#loginForm input[name='password']").css("border", "1px solid red");
        $("#passworddivlogin div").show();
    }
}

function loggedSite(response){
    if (response == 1){
        window.location = "../index.php";
    } else {
        alert("Invalid username and password!")
    }
}

function registrazione(){
    var email = $("#registrazioneForm input[name='email']").val().trim();
    var username = $("#registrazioneForm input[name='username']").val().trim();
    var password = $("#registrazioneForm input[name='password']").val().trim();
    if (email != "" && username != "" && password != ""){
        $.ajax({
            url: "../php/register.php", 
            type: "POST",
            data: "username=" + username + "&password=" + password + "&email=" + email,
            success: function(response){
                        if (response == 1){
                            $.ajax({
                                url: "../php/getUser.php", 
                                type: "POST",
                                data: "username=" + username + "&password=" + password,
                                success: loggedSite,
                                error: ajaxFailed,
                                }
                            );
                        }
                     },
            error: ajaxFailed,
            }
        );
    }
    if (email == ""){
        $("#registrazioneForm input[name='email']").css("border", "1px solid red");
        $("#emaildivreg div").show();
    }
    if (username == ""){
        $("#registrazioneForm input[name='username']").css("border", "1px solid red");
        $("#usernamedivreg div").show();
    }
    if (password == ""){
        $("#registrazioneForm input[name='password']").css("border", "1px solid red");
        $("#passworddivreg div").show();
    }
}

function listaCarrello(json) {
    if (json.carrello.length == 0){
        $("#tickets").hide();
        $("#price").hide();
        $("#resultsCarrello").hide();
        $("#acquisto").hide();
        $("#carrelloEmpty").show();
    } else {
        $("#carrelloEmpty").hide();
        $("#acquisto").hide();
        $("#carrello").show();
        $("#tickets").show();
        $("#price").css("display", "flex");
        $("#tickets").empty();
        var i = 0;
        var totalPrice = 0;
        var quantity = 0;
        json.carrello.forEach(function(item){
            var div = $("<div id='container'></div>");
            var image = $("<div id='imgBox'><img src='" + item.url + "' alt=''></div>");
            var contentString = "<div id='content'><h2>" + item.titolo + "</h2>";
            if (!item.descrizione == ""){
                contentString += "<p>" + item.descrizione + "</p>";
            }
            contentString += "<p id='luogo'>" + item.citta + " - " + item.luogo + "</p>";
            var data = item.data.substring(8, 10) + "/" + item.data.substring(5, 7) + "/" + item.data.substring(0, 4);
            contentString += "<p>" + data + " | " + item.ora + "</p>";
            var content = $(contentString);
            var buy = $("<div id='buy'><p>Prezzo: <span id='prezzoSpan" + i + "' style='display: inline-block'>" + item.prezzo + "</span></p><div id='quantityDiv'><p><label>Quantità: </label></p><div id='customSelectCat'><select id='quantity" + i + "'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select><span id='customArrowCat'></span></div></div><button id='button" + i + "'>Rimuovi dal carrello</button></p><span id='messageAdd" + i + "'></span>");
            div.append(image);
            div.append(content);
            div.append(buy);
            $("#tickets").append(div);
            if (i < json.carrello.length -1){
                $("#tickets").append("<hr>");
            }
            $("#button" + i).click({param1: item.id, param2: i}, listenerRemoveButton);
            getQuantity(i, item.id);
            var price = parseFloat(item.prezzo.replace(",", "."));
            var singleQuantity = parseInt($("#quantity" + i + " option:selected").text().trim());
            totalPrice += price * singleQuantity;
            quantity += parseInt($("#quantity" + i + " option:selected").text().trim());
            $("#quantity" + i).change({param1: price, param2: item.id, param3: i}, quantityChanged);
            i++;
        });
        var totalPriceString = totalPrice.toFixed(2).toString().replace(".", ",");
        $("#listTickets").empty();
        if (quantity == 1){
            $("#listTickets").append("<p>Prezzo (<span id='spanQuantity'>" + quantity + " biglietto</span>)</p><p id='finalPriceP1'>" + totalPriceString + " €</p>");
        } else {
            $("#listTickets").append("<p>Prezzo (<span id='spanQuantity'>" + quantity + " biglietti</span>)</p><p id='finalPriceP1'>" + totalPriceString + " €</p>");
        }        
        $("#finalPriceP").text(totalPriceString + " €");
    }
}

function quantityChanged(e){
    $.ajax({
        url: "../php/changeQuantity.php", 
        type: "POST",
        data: "changeEvento=" + e.data.param2 + "&quantita=" + $("#quantity" + e.data.param3 + " option:selected").text().trim(),
        success: refreshQuantity,
        error: ajaxFailed,
        }
    );
}

function refreshQuantity(){
     var countTickets = $("#tickets > div").length;
     var i;
     var quantity = 0;
     var totalPrice = 0;
     for (i=0; i<countTickets;i++){
        quantity += parseInt($("#quantity" + i + " option:selected").text().trim());
        var singlePrice = parseFloat($("#prezzoSpan" + i).text().trim().replace(",", "."));
        totalPrice += singlePrice * parseInt($("#quantity" + i + " option:selected").text().trim());
     }
     $("#finalPriceP").text(totalPrice.toFixed(2).toString().replace(".", ",") + " €");
     $("#finalPriceP1").text(totalPrice.toFixed(2).toString().replace(".", ",") + " €");
     if (quantity == 1){
        $("#spanQuantity").text(quantity + " biglietto");
     } else {
        $("#spanQuantity").text(quantity + " biglietti");
     }
     
}

function getQuantity(i, id){
    $.ajax({
        url: "../php/getQuantity.php", 
        type: "POST",
        async: false,
        data: "idEvento=" + id,
        success: function(response){
            $("#quantity" + i + " option[value='" + response + "']").attr('selected', 'selected');
        },
        error: ajaxFailed,
        }
    );
}

function listenerRemoveButton(e){
    $.ajax({
        url: "../php/removeFromCart.php", 
        type: "POST",
        data: "removeEvento=" + e.data.param1,
        success: refreshCart,
        error: ajaxFailed,
        }
    );
}

function svuota(){
    $.ajax({
        url: "../php/removeFromCart.php", 
        type: "POST",
        data: "all=true",
        success: refreshCart,
        error: ajaxFailed,
        }
    );
}

function refreshCart(response) {
    $.ajax({
        url: "../php/getCarrello.php", 
        type: "POST",
        datatype: "json",
        success: listaCarrello,
        error: ajaxFailed,
        }
    );
    $("#cartCount").text(response);
}

function ajaxFailed(e) {
	var errorMessage = "Error making Ajax request:\n\n";
	errorMessage += "Server status:\n" + e.status + " " + e.statusText + 
		                "\n\nServer response text:\n" + e.responseText;
    alert(errorMessage);
}