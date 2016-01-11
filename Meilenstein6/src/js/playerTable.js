
var URL_ALL_PLAYERS = "http://127.0.0.1:8888/AllPlayers";
var URL_FAV_PLAYERS = "http://127.0.0.1:8888/Favorites";

var xmlhttp = new XMLHttpRequest();
var favorites = false;

function createPlayerTable(){
    var url = "";
    if(favorites){
        url = URL_FAV_PLAYERS;
    }else{
        url = URL_ALL_PLAYERS;
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
        if (     (xmlhttp.readyState == 4)
             &&  (xmlhttp.status == 200)
             &&  (xmlhttp.responseText != null)) {

            showPlayerDetails(xmlhttp.responseText);
        }
    }
    xmlhttp.send();
}


function showPlayerDetails(myResponse) {

    var myJson = JSON.parse(myResponse);
    var i;
    var tableAlign = "<table align='center' >";

    //set headline
    if(favorites){
        tableAlign += "<tr><th colspan='3' onclick='changeToAll()' id='all'>Alle Spieler</th>" +
            "<th bgcolor='#4682B4' colspan='5'onclick='changeToFavorites()'>Meine Favoriten</th>";
    }else{
        tableAlign += "<tr><th colspan='3' onclick='changeToAll()' bgcolor='#4682B4'>Alle Spieler</th>" +
            "<th colspan='5'onclick='changeToFavorites()'>Meine Favoriten</th>";
    }

    //set points to the headline
    tableAlign += "<tr><td>Spieler</td><td>Verein</td><td>Headcoach</td><td>Assistant</td>" +
        "<td>Position</td><td>Aktiv</td><td>Nummer</td><td>Jahr</td></tr>";

    tableAlign += "<div class='favoritesTableContent'>"

    for(i = 0; i < myJson.length; i++) {
        tableAlign +=   "<tr><td>" +
                        myJson[i].firstname +  " " +
                        myJson[i].surname +
                        "</td><td>" +
                        myJson[i].team +
                        "</td><td>" +
                        myJson[i].headcoach +
                        "</td><td>" +
                        myJson[i].asisstantcoach +
                        "</td><td>" +
                        myJson[i].position +
                        "</td><td>" +
                        parseYesOrNo(myJson, i) +
                        "</td><td>" +
                        myJson[i].number +
                        "</td><td>" +
                        myJson[i].year +
                        "</td></tr>";
    }
    //end table
    tableAlign += "</table>";
    //end div
    tableAlign += "</div>"
    //insert output to document
    document.getElementById("playerTable").innerHTML = tableAlign;
}

function parseYesOrNo(array, position){
    if(array[position].isActive == true){
        return "Ja";
    } else {
        return "Nein";
    }
}

function changeToAll(){
    favorites = false;
    createPlayerTable();
}

function changeToFavorites(){
    favorites = true;
    createPlayerTable();
}