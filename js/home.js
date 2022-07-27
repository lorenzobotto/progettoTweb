/*    Nome:          Lorenzo
 *    Cognome:       Botto
 *    Descrizione:   Codice JS per per la pagina "home.php", la homepage del sito.
 */

/*
 *   Descrizione:  Al caricarsi della pagina, configuro il click dei pulsanti per l'acquisto di biglietti. 
 */
$(function() {
    // Si definisce il click per i pulsanti di acquisto biglietti.
    $(".acquistaHome").click(function() {
        window.location = "eventi.php";
    })
});