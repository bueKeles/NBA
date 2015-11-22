function checkPlayer(){
    if (allowAlphabet(document.getElementById("vorname")) &&
        allowAlphabet(document.getElementById("name")) &&
        allowAlphabet(document.getElementById("verein")) &&
        allowAlphabet(document.getElementById("hcoach")) &&
        allowAlphabet(document.getElementById("acoach")) &&
        allowNumber(document.getElementById("number")) &&
        allowYear(document.getElementById("jahr")))
        {
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