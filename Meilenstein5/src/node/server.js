//group nba

// Für das Erstellen eines HTTP-Servers nötig
var http = require('http');
// Ermöglicht das Arbeiten mit dem Dateisystem
var fs = require("fs");

// Definition der IP und des Port und weiterer Konstanten
// JS Statement "const" wurde aufgrund fehlendem Windows IE Support nicht verwendet
var IP = "127.0.0.1";
var PORT = 8080;
var SERVER_START_MSG = "Der Server wurde gestartet und ist per http://" + IP + ":" + PORT + "/ erreichbar";
var CONNECTION_MSG = "<User connected to Server>";
var WELCOME_MSG = "Sie haben sich erfolgreich auf dem WebServer mit der Url " + IP + ":" + PORT + " verbunden";
var NOT_FOUND_MSG = "[404] Aufruf der nicht unterstützten URL: ";
var NOT_FOUND_HTML = "<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>";
var SUCC_SAVE_MSG = "Folgender Spieler wurde gespeichert: ";
var ERR_SAVE_MSG = "Der Spieler konnte nicht gespeichert werden!";
var PLAYER_FILE_PATH = "/Users/nurcan_oez/PhpstormProjects/NBA/Meilenstein5/form.txt";


// HTTP-Server konfigurieren
var server = http.createServer(function (request, response) {
    switch (request.url) {
        case "/":
            welcome(request, response);
        default:
            if (request.url.startsWith("/Player")) {
                savePlayer(request, response);
            } else {
                notFound(request, response);
            }
    }
    ;
});

// Server unter dem definirten Port starten
server.listen(PORT);

// Ausgabe auf der Konsole tätigen
console.log(SERVER_START_MSG);


/**
 *  Diese Methode informiert auf der Konsole über einen neu verbundenen Nutzer
 *  und sendet eine Willkommens-Nachricht.
 */
function welcome(request, response) {
    // Verbindungsaufbau ausgeben
    console.log(CONNECTION_MSG);
    // Willkommens-Nachricht senden
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(WELCOME_MSG);
}


/**
 *  Diese Methode beantwortet eine Anfrage an den Server mit einem
 *  404 (Not found) Fehler und gibt eine Meldung auf der Konsole aus.
 */
function notFound(request, response) {
    // Fehlerhafter Aufruf ausgeben
    console.log(NOT_FOUND_MSG + request.url);
    // 404 (Not found) Fehler und HTML Benutzerhinweis als Antwort senden
    response.writeHead(404, "Not found", {'Content-Type': 'text/html'});
    response.end(NOT_FOUND_HTML);
}

/**
 *  Diese Methode speichert einen vom Anwender gesendeten Spieler
 *  in eine entsprechende Textdatei mit Spielerdaten.
 */
function savePlayer(request, response) {

    var parameters = parseParameters(request.url);
    response.writeHead(200, {"Content-Type": "text/plain"});

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
        if (err) {
            console.log(ERR_SAVE_MSG);
            response.end(ERR_SAVE_MSG);
        } else {
            // Ergebnisstruktur in der Konsole ausgeben
            console.log(SUCC_SAVE_MSG);
            console.log(dataset);
            response.end(SUCC_SAVE_MSG + dataset);

        }
    });
}


/**
 *  Diese Methode liest die Parameter aus einer URL aus.
 *  Die Parameter werden als Objekt in folgender Form rückgegeben:
 *  {<Parameter>: "<Wert>", ... }
 *  Bsp: /hello?a=1&b=2&c=3  =>  {a: 1, b: 2, c:3}
 */
function parseParameters(url) {
    var parameters = {};
    var keyValuePairs = [];
    var keyValuePair = [];
    var key = "";
    var value = "";

    // Parameterpaare zunächst aus der URL extrahieren und per &-Zeichen unterteilen
    // Bsp: /hello?a=1&b=2&c=3  =>  ["hello?a=1", "b=2", "c=3"]
    keyValuePairs = url.split('?')[1].split("&");

    // Über alle Name-Wert-Paare iterieren
    for (var i = 0; i < keyValuePairs.length; i++) {

        // Aktuelles Name-Wert-Paar nach =-Zeichen unterteilen
        keyValuePair = keyValuePairs[i].split("=");

        // Name und Wert mit Hilfe von decodeURIComponenten extrahieren
        // decodeURIComponenten löst bspw. alle Sonderzeichen wieder auf
        key = decodeURIComponent(keyValuePair[0]);
        value = decodeURIComponent(keyValuePair[1]) || "";

        // Name-Wert-Paar der Rückgabestruktur hinzufügen
        parameters[key] = value;
    }
    return parameters;
}


