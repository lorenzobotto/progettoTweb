var searchEvento = "";

$(function(){

    var statusLogin = false;
    var statusRegistrati = false;
    var statusLogged = false;
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

    $.ajax({
        url: "../php/controlSearchEvento.php", 
        type: "POST",
        success: function(response){
            if (response != 0){
                searchEvento = response;
                $(".searchTxt").val(response);
                cerca();
            }
        },
        error: ajaxFailed,
        }
    );

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

    $("#listCat").on('change', showSotCat);
    $("#cerca").click(cerca);
    if ($("#listCat option").length < 5) {
        $("#listCat").trigger("change");
        $("#cerca").trigger("click");
    }
    $("#buttonLoginForm").click(login);
    $("#buttonRegistratiForm").click(registrazione);
    $("#buttonLogoutForm").click(endSession);
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
    $("#dateFrom").change(function(){
        $("#dateTo")[0].setAttribute('min', $("#dateFrom").val());
    })
    $("#dateTo").change(function(){
        $("#dateFrom")[0].setAttribute('max', $("#dateTo").val());
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
                searchEvento = $(".searchTxt").val().trim();
                cerca();
            },
            error: ajaxFailed,
            }
        );
    }
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function showSotCat(){
    if ($("#listSotCat").is(":hidden")){
        $("#listSotCat").show();
        $("#customArrowSotCat").show();
        $("input[type='date']").show();
        $("#cerca").show();
    }
    $("#listSotCat").empty();
    if ($("#listCat option:selected").text() === 'Concerti'){
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='PopRock'> Pop e Rock </option>");
        $("#listSotCat").append("<option value='Jazz'> Jazz </option>");
        $("#listSotCat").append("<option value='Metal'> Metal </option>");
        $("#listSotCat").append("<option value='Festival'> Festival </option>");
    } else if ($("#listCat option:selected").text() === 'Sport'){
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='Calcio'> Calcio </option>");
        $("#listSotCat").append("<option value='Tennis'> Tennis </option>");
        $("#listSotCat").append("<option value='Basket'> Basket </option>");
        $("#listSotCat").append("<option value='Rugby'> Rugby </option>");
        $("#listSotCat").append("<option value='Formula1'> Formula 1 </option>");
        $("#listSotCat").append("<option value='MotoGP'> Moto GP </option>");
    } else if ($("#listCat option:selected").text() === 'Mostre e Musei'){
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='MostreStoria'> Mostre d'arte e storia </option>");
        $("#listSotCat").append("<option value='MuseiSiti'> Musei e siti archeologici </option>");
    } else if ($("#listCat option:selected").text() === 'Teatro'){
        $("#listSotCat").append("<option value='' disabled selected hidden>Seleziona la sotto-categoria</option>");
        $("#listSotCat").append("<option value='Musical'> Musical e varietà </option>");
        $("#listSotCat").append("<option value='Prosa'> Prosa </option>");
        $("#listSotCat").append("<option value='TeatroLirico'> Teatro lirico </option>");
        $("#listSotCat").append("<option value='BallettoCeM'> Balletto classico e moderno </option>");
        $("#listSotCat").append("<option value='ConcertiClassica'> Concerti musica classica </option>");
    }
}

function cerca(){
    var data = "categoria=";
    data += $("#listCat option:selected").text().trim() + "&";
    if (!$("#listSotCat option:selected").text().trim().startsWith("Seleziona")){
        data += "sottocategoria=" + $("#listSotCat option:selected").text().trim() + "&";
    }
    if (!($("#dateFrom").val() == "")){
        var date = new Date($("#dateFrom").val());
        data += "dataDa=" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "&";
    }

    if (!($("#dateTo").val() == "")){
        var date = new Date($("#dateTo").val());
        data += "dataA=" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "&";
    }
    $.ajax({
        url: "../php/getList.php", 
        type: "POST",
        data: data.slice(0, -1),
        datatype: "json",
        success: listaEventi,
        error: ajaxFailed,
        }
    );
}

function listaEventi(json){
    if (json.eventi.length == 0){
        $("#sectionResults").show();
        $("#results").hide();
        $("#emptyResults").show();
    } else {
        $("#sectionResults").show();
        $("#results").show();
        $("#emptyResults").hide();
        $("#results").empty();
        var i = 0;
        json.eventi.forEach(function(item){
            var div = $("<div id='container" + i + "' class='container' draggable='true' ondragstart='drag(event)'></div>");
            var image = $("<div id='imgBox'><img src='" + item.url + "' alt='' draggable='false'></div>");
            var contentString = "<div id='content'><h2>" + item.titolo + "</h2>";
            if (!item.descrizione == ""){
                contentString += "<p>" + item.descrizione + "</p>";
            }
            contentString += "<p id='luogo'>" + item.citta + " - " + item.luogo + "</p>";
            var data = item.data.substring(8, 10) + "/" + item.data.substring(5, 7) + "/" + item.data.substring(0, 4);
            contentString += "<p>" + data + " | " + item.ora + "</p>";
            var content = $(contentString);
            var buy = $("<div id='buy'><p>Prezzo: " + item.prezzo + "</p><div id='quantityDiv'><p>Quantità: </p><div id='customSelectCat'><select id='quantity" + i + "'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select><span id='customArrowCat'></span></div></div><button id='button" + i + "'>Aggiungi al carrello</button></p><span id='messageAdd" + i + "'></span>");
            div.append(image);
            div.append(content);
            div.append(buy);
            $("#results").append(div);
            $("#button" + i).click({param1: item.id, param2: i}, listenerAddButton);
            i++;
        });

        var intestazione = "";
        if (searchEvento != 0){
            if (i == 1){
                intestazione = "<p id='headerTable'>" + i + " risultato trovato per '" + searchEvento + "'";
            } else {
                intestazione = "<p id='headerTable'>" + i + " risultati trovati per '" + searchEvento + "'";
            }
            searchEvento = 0;
        } else {
            if (i == 1){
                intestazione = "<p id='headerTable'>" + i + " risultato trovato per " + $("#listCat option:selected").text().trim().toLowerCase() + " ";
                if (!$("#listSotCat option:selected").text().trim().startsWith("Seleziona")){
                    intestazione += "con sotto-categoria " + $("#listSotCat option:selected").text().trim().toLowerCase() + " ";
                }
                if (!($("#dateFrom").val() == "")){
                    var date = new Date($("#dateFrom").val());
                    intestazione += "dal " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
                if (!($("#dateTo").val() == "")){
                    var date = new Date($("#dateTo").val());
                    intestazione += "al " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
            } else {
                intestazione = "<p id='headerTable'>" + i + " risultati trovati per " + $("#listCat option:selected").text().trim().toLowerCase() + " ";
                if (!$("#listSotCat option:selected").text().trim().startsWith("Seleziona")){
                    intestazione += "con sotto-categoria " + $("#listSotCat option:selected").text().trim().toLowerCase() + " ";
                }
                if (!($("#dateFrom").val() == "")){
                    var date = new Date($("#dateFrom").val());
                    intestazione += "dal " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
                if (!($("#dateTo").val() == "")){
                    var date = new Date($("#dateTo").val());
                    intestazione += "al " + ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " ";
                }
            }
        }
        $("#results").prepend(intestazione + "</p>");
        
        $("#headerCarrello").on("dragover", function(event){
            event.preventDefault();
        });
        $("#headerCarrello").on("drop", function(event){
            event.preventDefault();
            $(this).removeClass('hoverDrag');
            var data = event.originalEvent.dataTransfer.getData("text");
            data = parseInt(data.substr(data.length - 1));
            $.ajax({
                url: "../php/addToCart.php", 
                type: "POST",
                data: "addEvento=" + json.eventi[data].id + "&quantita=" + $("#quantity" + data + " option:selected").text().trim(),
                success: function(response){
                    if (response == 0){
                        $("#messageAdd" + data).fadeIn();
                        $("#messageAdd" + data).text("Biglietto già presente nel carrello!");
                        var offsetElement = $("#messageAdd" + data).offset().top - $(window).scrollTop();
                        var offset = $("#container" + data).offset().top - $(window).scrollTop();
                        if(offsetElement > window.innerHeight){
                            $('html,body').animate({scrollTop: offset}, 1000);
                        }
                        $("#messageAdd" + data).css("color", "red");
                        setTimeout(function(){
                            $("#messageAdd" + data).fadeOut();
                        }, 3000);
                    } else {
                        $("#cartCount").text(response);
                        $("#messageAdd" + data).fadeIn();
                        $("#messageAdd" + data).text("Biglietto aggiunto nel carrello!");
                        $("#messageAdd" + data).css("color", "green");
                        setTimeout(function(){
                            $("#messageAdd" + data).fadeOut();
                        }, 3000);
                    }
                },
                error: ajaxFailed,
                }
            );
            event.stopPropagation();
            return false;
        });
    }
}

function listenerAddButton(e){
    $.ajax({
        url: "../php/addToCart.php", 
        type: "POST",
        data: "addEvento=" + e.data.param1 + "&quantita=" + $("#quantity" + e.data.param2 + " option:selected").text().trim(),
        success: function(response){
            if (response == 0){
                $("#messageAdd" + e.data.param2).fadeIn();
                $("#messageAdd" + e.data.param2).text("Biglietto già presente nel carrello!");
                $("#messageAdd" + e.data.param2).css("color", "red");
                setTimeout(function(){
                    $("#messageAdd" + e.data.param2).fadeOut();
                }, 3000);
            } else {
                $("#cartCount").text(response);
                $("#messageAdd" + e.data.param2).fadeIn();
                $("#messageAdd" + e.data.param2).text("Biglietto aggiunto nel carrello!");
                $("#messageAdd" + e.data.param2).css("color", "green");
                setTimeout(function(){
                    $("#messageAdd" + e.data.param2).fadeOut();
                }, 3000);
            }
        },
        error: ajaxFailed,
        }
    );
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
        window.location = "../html/home.php";
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

function ajaxFailed(e) {
	var errorMessage = "Error making Ajax request:\n\n";
	errorMessage += "Server status:\n" + e.status + " " + e.statusText + 
		                "\n\nServer response text:\n" + e.responseText;
    alert(errorMessage);
}