
var express = require('express');
var fs = require("fs");
var path = require("path");
// Spielerdatei auslesen und in Variable lokal verfügbar machen
var players = require("/Users/nurcan_oez/PhpstormProjects/NBA/Meilenstein5/src/json/data.json");


// Definition der IP und des Port und weiterer Konstanten
// JS Statement "const" wurde aufgrund fehlendem Windows IE Support nicht verwendet
var IP = "127.0.0.1";
var PORT = 8888;
var SERVER_START_MSG = "Der Server wurde gestartet und ist per http://"+IP+":"+PORT+"/ erreichbar";
var SUCC_SAVE_MSG = "Folgender Spieler wurde gespeichert: ";
var ERR_SAVE_MSG = "Der Spieler konnte nicht gespeichert werden!";
var REQ_ALL_MSG = "/AllPlayers: Es wurde allen Spielerdatensätzen angefordert";
var REQ_FAV_MSG = "/Favorites: Es wurde alle als Favorit gekennz. Spielerdatensätzen angefordert";
var REQ_SAVE_MSG = "/Player: Speichern eines Spielerdatensatzes angefordert";
var PLAYER_FILE_PATH = "/Users/nurcan_oez/PhpstormProjects/NBA/Meilenstein5/form.txt";


// HTTP-Server konfigurieren
var server = express();
server.use(express.static(__dirname));

// Server unter dem definirten Port starten
server.listen(PORT);

// Ausgabe auf der Konsole tätigen
console.log(SERVER_START_MSG);


/**
 *  Diese Methode speichert einen vom Anwender gesendeten Spieler
 *  in eine entsprechende Textdatei mit Spielerdaten.
 */
server.put('/Player', function(request, response){

  console.log(REQ_SAVE_MSG);

    // Ergebnisstruktur für die Spielerdatei nach folgendem Format aufbereiten:
    // Vorname Name, Jahrgang, Headcoach, Assistantcoach, Position, Trikotnummer
    var dataset = [
        parameters["name"] + " " + parameters["vorname"],
        parameters["jahr"], parameters["verein"],
        parameters["hcoach"],
        parameters["acoach"],
        parameters["position"],
        parameters["number"], parameters["nein"]
    ].join(", ");

  // Ergebnisstruktur in die Spielerdatei schreiben
  fs.appendFile(PLAYER_FILE_PATH, dataset + "\n", function (err) {

    response.header("Access-Control-Allow-Origin", "*");

    if (err) {
      console.log(ERR_SAVE_MSG);
      response.writeHead(400, {"Content-Type": "text/plain"});
      response.end(ERR_SAVE_MSG);
    } else {
      // Ergebnisstruktur in der Konsole ausgeben
      console.log(SUCC_SAVE_MSG);
      console.log(dataset);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end(SUCC_SAVE_MSG + dataset);
    }
  });
});


/**
 *  Diese Methode liefert alle Spielerdatensätze und sendet sie als Antwort per JSON zurück.
 */
server.get('/AllPlayers', function(request, response){
    console.log(REQ_ALL_MSG);
    // Ohne den folgenden HTTP Header Eintrag wurde ein Fehler in einigen Browsern beobachtet:
    // Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource auf http://127.0.0.1:8888/AllPlayers.
    // (Grund: CORS-Kopfzeile 'Access-Control-Allow-Origin' fehlt).
    response.header("Access-Control-Allow-Origin", "*");
    response.json(getPlayers(favorites=false));
});


/**
 *  Diese Methode liefert alle Spielerdatensätze, die als Favorit gekennzeichnet sind,
 *  und sendet sie als Antwort per JSON zurück.
 */
server.get('/Favorites', function(request, response){
    console.log(REQ_FAV_MSG);
    // Ohne den folgenden HTTP Header Eintrag wurde ein Fehler in einigen Browsern beobachtet:
    // Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource auf http://127.0.0.1:8888/AllPlayers.
    // (Grund: CORS-Kopfzeile 'Access-Control-Allow-Origin' fehlt).
    response.header("Access-Control-Allow-Origin", "*");
    response.json(getPlayers(favorites=true));
});


/**
 *  Diese Methode liefert Spielerdatensätze als JSON Objekt zurück.
 *
 *  Parameter:
 *      favorites: Gibt nur als Favorit gekennzeichnete Datensätze zurück, falls true.
 */
function getPlayers(favorites){

    if (favorites){
        var favPlayers = [];
        var player = {};
        // Nach als Favorit gekennzeichneten Datensätzen filtern und
        // diese in die Ergebnismenge aufnehmen
        for (i = 0; i < players.length; i++) {
            player = players[i];
            if (player.isFavorite) {
                favPlayers.push(player);
            }
        }
        return favPlayers;

    } else {
        // Alle Spielerdatensätze rückgeben
        return players;
    }
}


