# im3 Projekt
von Janna Stutz und Lisa Joy Zimmermann

Die Website: https://im3hs25.jannastutz.ch/

## Kurzbeschreibung des Projekts

Die App «AARE YOU SURE» liefert personalisierte Empfehlungen fürs Aareschwimmen. Nutzer:innen wählen Ort und Gfrörli-Stufe (je nach Kälteempfinden) und erhalten die aktuelle Wassertemperatur samt individuellem Spruch mit einer passenden Empfehlung oder Warnung, ob sich ein Sprung in die Aare lohnt. 

Zusätzlich werden die Durchschnittstemperaturen der letzten vier Tage angezeigt. Auf einer weiteren Seite kann dann Ort und Datum gewählt werden, um den stündlichen Temperaturverlauf in einem Chart (mit Chart.js) dargestellt zu bekommen. Die Daten stammen aus der Aareguru-API, werden stündlich abgefragt, in einer eigenen Datenbank gespeichert und per PHP an die Website ausgeliefert.

Das App-Design soll simpel sein, damit Jung & Alt einfach zur personalisierten Empfehlung navigieren können - die Datenseite mit dem Chart ist für diejenigen, die sich noch einen eigenen, grösseren Überblick verschaffen wollen.

*API's*

•⁠  ⁠Orte & aktuelle Wassertemperatur: Aare.gur API (https://www.freepublicapis.com/aareguru-api)

•⁠  ⁠Wassertemperatur der vergangenen Tage in eigener Datenbank gespeichert und daraus wieder abgerufen

---

## Learnings und Schwierigkeiten Janna 
In diesem Projekt war mein grösstes Learning das Erstellen einer eigenen Datenbank, nicht nur auf der technischen Ebene sondern auch konzeptionell und strukturell verstehe ich nun den Aufbau einer solchen App mehr. Zudem festigte und vertiefte ich mein Wissen in Javascript-Funktionen, womit ich anfangs noch sehr Schwierigkeiten und ein ziemliches Chaos im Kopf hatte. Auch das Laden und Abrufen der API-Daten war mir zu Beginn noch zu komplex, durch das selbstständige Schreiben des Codes finde ich es aber jetzt sehr verständlich.

## Learnings und Schwierigkeiten Joy
Das grösste Learning in diesem Projekt war für mich die Strukturierung des Codes. So langsam weiss man, wie man Dinge stylt mit CSS, diese jedoch dann in eine logische und saubere Form zu bringen fand ich gar nicht so einfach. Ich habe mein Verständnis für den Code sehr verbessert durch das selbst erarbeiten und auch durch die spätere Fehlerbehebung.

---
## Benutzte Ressourcen und Prompts 
GitHub Copilot: Hat sehr geholfen, um einfache Strukturaufgaben zu übernehmen und so Zeit zu sparen. Auch passierten so weniger Syntaxerror.
Chatfunktion von Copilot in Visual Studio Code: Vor allem für Vereinfachen unserer Code-Struktur benutzt. 

ChatGPT: Hat uns immer wieder geholfen, um komplexe Programmierlogik zu verstehen (vor allem für PHP-Teil) und so Codefehler im Projekt schnell zu beheben. Ansonsten war die Unterstützung von ChatGPT besonders hilfreich beim Strukturieren der JavaScript-Funktionen und dem Zusammenspiel zwischen API, Datenbank und Frontend. Auch bei der Fehlerbehebung unseres Dropdown-menüs waren die Erklärungen von ChatGPT einfach nachvollziehbar und wir konnten den Code so selbstständig anpassen.
