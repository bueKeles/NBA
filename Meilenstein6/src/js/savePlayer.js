
var URL_SAVE_PLAYER = "http://127.0.0.1:8888/Player";

/**
 *  Diese Methode validiert zunächst die Eingaben zu einem zu speichernden Spielerdatensatzes.
 *  Ist der Datensatz valide, so wird der Datensatz an den Server gesendet und dort gespeichert.
 *  Ist der Datensatz invalide, so wird ein Fehler ausgegebene.
 */
function savePlayer(){

    // Daten nur bei validen Eingaben an den Server senden
    if (checkPlayer()) {

        // Daten aus dem Formular extrahieren und in ein JSON Object überführen
        var player = {};
        player["vorname"] = document.getElementById("vorname");
        player["name"] = document.getElementById("name");
        player["verein"] = document.getElementById("verein");
        player["hcoach"] = document.getElementById("hcoach");
        player["acoach"] = document.getElementById("acoach");
        player["number"] = document.getElementById("number");
        player["jahr"] = document.getElementById("jahr");

        console.log(player);
        // Datensatz per PUT Methode senden lassen
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", "http://127.0.0.1:8888/Player", true);
        // Im Header bekannt machen, dass JSON Daten versendet werden
        //xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT");
        // JSON Objekt zu einem String konvertieren und im HTTP Body versenden
        xmlhttp.send(JSON.stringify(player));
    }
}


function checkPlayer(){
    if (allowAlphabet(document.getElementById("vorname")) &&
        allowAlphabet(document.getElementById("name")) &&
        allowAlphabet(document.getElementById("verein")) &&
        allowAlphabet(document.getElementById("hcoach")) &&
        allowAlphabet(document.getElementById("acoach")) &&
        allowNumber(document.getElementById("number")) &&
        allowLegalYears(document.getElementById("jahr"))) {

        return true;

    }else {
        alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben");
        return false;
    }
}


// vorname,nachname,verein,headcoach,assistantcoach
function allowAlphabet(elem) {
    var regex = /^([a-zA-ZäöüÄÖÜß]+[\s]+)*[a-zA-ZäöüÄÖÜß]+$/;

    //check if its not emty
    if (isEmpty(elem)) {
        markWrongInput(elem);
        return false;
    }

    //check for wrong signs
    if (elem.value.match(regex)) {
        return true;
    } else {
        markWrongInput(elem);
        return false;
    }
};

//rückennummer
function allowNumber(elem){
    var regex = /[4-9]|[1][0-5]/g;

    //check if its not empty
    if (isEmpty(elem)) {
        markWrongInput(elem);
        return false;
    }

    //check for wrong signs
    if (elem.value.match(regex)) {
        return true;
    } else {
        markWrongInput(elem);
        return false;
    }
}

// Geburtsjahrsjahr
function allowLegalYears(elem){
    var regex = /^\d{4}$/;
    var aktuellesJahr=new Date().getFullYear();

    //chek if its not emty
    if (isEmpty(elem)) {
        markWrongInput(elem);
        return false;
    }

    //check the length and year <= thisyear
    if (elem.value.match(regex) && elem.value<=aktuellesJahr) {
        return true;
    } else {
        markWrongInput(elem);
        return false;
    }

};

function markWrongInput(elem) {
    elem.setAttribute("class","wrongInput");
    elem.focus();
}


function isEmpty(elem) {
    if (elem.value=="") {
        return true;
    } else {
        return false;
    }
};