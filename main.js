/*

*** Sport Record Book ***

Il software deve generare casualmente le statistiche di gioco di 100 giocatori di basket per
una giornata di campionato.
In particolare vanno generate per ogni giocatore le seguenti informazioni, facendo
attenzione che il numero generato abbia senso:

- Codice Giocatore Univoco (formato da 3 lettere maiuscole casuali e 3 numeri)
- Numero di punti fatti
- Numero di rimbalzi
- Falli
- Percentuale di successo per tiri da 2 punti
- Percentuale di successo per da 3 punti

Una volta generato il “database”, il programma deve chiedere all’utente di inserire un Codice
Giocatore e il programma restituisce le statistiche.
BONUS: Dopo la generazione di dati casuali, il programma chiederà quale operazione vuole
fare l’utente che potrà scegliere tra le seguenti opzioni:

   ● L’utente inserisce 0: il programma termina
   ● L’utente inserisce 1: L’utente deve inserire il codice giocatore univoco per avere le
     informazioni su quel giocatore (“come prima”)
   ● L’utente inserisce 2: L’utente deve inserire il nome di una statistica (numero punti
     fatti, falli, etc) e il programma restituirà la media di quella statistica calcolata su tutti i
     giocatori.

*/

var db = new Array();
var dbImg = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg",
             "images/6.jpg", "images/7.jpg", "images/8.jpg", "images/9.jpg", "images/10.jpg",
             "images/11.jpg", "images/12.jpg", "images/13.jpg", "images/14.jpg", "images/15.jpg",
             "images/16.jpg", "images/17.jpg", "images/18.jpg", "images/19.jpg", "images/20.jpg",]

//Generazione delle statistiche di gioco per 100 giocatori
for (var i = 0; i < 20; i++) {
   var playerScore = genPlayerScore();
   var twoPoint = twoPointsScored(playerScore);
   var threePoint = threePointsScored(playerScore, twoPoint);
   var player = { "id" : genCode(), "number" : genNumber(), "photo" : getPhoto(dbImg), "punti_fatti" : genPlayerScore(), "falli_commessi" : genPlayerFouls(),
                  "tiri_2punti" : getScoredPercent(playerScore, twoPoint), "tiri_3punti" : getScoredPercent(playerScore, threePoint) };
   db.push(player);
}


var playerList = document.getElementById('players-list');
for (var i = 0; i < db.length; i++) {

   var newDiv = document.createElement('div');
   newDiv.className = "players";
   var text = document.createTextNode(db[i].id);
   newDiv.appendChild(text);

   playerList.appendChild(newDiv);


   console.log("i: " + i + " " + db[i].id);
   console.log("i: " + i + " " + db[i].number);
   console.log("i: " + i + " " + db[i].photo);
}


var idRequested;

var btn = document.getElementById("search-button");

btn.addEventListener('click', function() {

   var idRequested = insertId(); //Inserimento id richiesto dall'utente
   var idExist = searchId(db, idRequested); //idExist contiene l'indice in cui si trova l'id, se l'id non esiste conterrà -1

   var error_msg = document.getElementById('error-msg');
   var statisticSection = document.getElementById('stat');

   var changeBtn = document.getElementById('search-button');
   changeBtn.classList.remove('default-bg-btn');
   var changeBtnIcon = document.getElementById('btn-icon');
   changeBtnIcon.classList.remove('fa-search');

   //Se l'id esiste ciclo sull'oggetto trovato tutte le sue proprietà, recupero i corrispondenti
   //id nel modello html e assegno ogni valore al campo corrispondente
   if ( idExist != -1 ) {
         changeBtn.classList.add('matched-bg-btn');
         changeBtnIcon.classList.add('fa-check');

         statisticSection.classList.remove('hidden');


         for (var objectProperty in db[idExist]) {

            if (objectProperty == 'photo') {
               var ph = document.getElementById(objectProperty);
               ph.classList.add('bg-img');
               ph.style.background = "url" + "(" + db[idExist][objectProperty] + ")";

            } else {
               var e = document.getElementById(objectProperty);
               e.classList.add('db-data');
               e.innerHTML = db[idExist][objectProperty];
            }

         }

   //Se l'id non esiste rendo visibile il messaggio d'errore
   //La timing function mi permette di cancellare il messaggio dopo il tempo prestabilito
   //e resettare le classi iniziali.
   } else {

      changeBtn.classList.add('error-bg-btn');
      changeBtnIcon.classList.add('fa-times');
      error_msg.classList.remove('hidden');
      error_msg.classList.add('visible');
      statisticSection.classList.add('hidden');

   }

   //La timing function riporta alle condizioni iniziali il form e il search button
   window.setTimeout(function(){

      error_msg.classList.remove('visible');
      error_msg.classList.add('hidden');


      if (idExist != -1) {
         changeBtn.classList.remove('matched-bg-btn');
         changeBtnIcon.classList.remove('fa-check');
      } else {
         changeBtn.classList.remove('error-bg-btn');
         changeBtnIcon.classList.remove('fa-times');
      }

      changeBtn.classList.add('default-bg-btn');
      changeBtnIcon.classList.add('fa-search');

   }, 2500);

})



//Funzione che genera un codice casuale formato da tre lettere maiuscole e tre numeri:
//Il primo ciclo genera un numero casuale tra 0 e la lunghezza della stringa maiusc-1. Tale
//numero verrà utilizzato come indice per prendere quel carattere presente in quella posizione della stringa
//Il secondo ciclo genera 3 numeri casuali da 0 a 9 e li concatenta
//Le tre lettere e i tre numeri verranno concatenati insieme e restituiti come codice.
function genCode() {
   var maiusc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var literal = "";
   var number = "";
   var code = "";
   for (var i = 0; i < 3; i++) {
      literal += maiusc.charAt(randomNumber( 0, (maiusc.length-1) ) );
   }
   for (var i = 0; i < 3; i++) {
      number += randomNumber(0, 9);
   }
   code = literal + number;
   return code;
}

//Funzione che genera un numero casuale compreso tra l'estremo inferiore start
//e l'estremo superiore end, inclusi.
function randomNumber(start, end) {
   return Math.floor(Math.random() * (end - start + 1)) + start;
}

//Funzione che genera il numero del giocatore
function genNumber() {
   var n = randomNumber(0, 99);
   if (n < 10) {
      n = "0" + n;
   }
   return n ;
}

//Funzione che genera i punti fatti da un giocatore in una partita
function genPlayerScore() {
   return randomNumber(0, 40);
}

//Funzione che riceve un array di url di immagini e ne restituisce uno casualmente
function getPhoto(arr) {
   var index = randomNumber(0, (arr.length-1));
   return arr[index];
}


//Funzione che genera i falli fatti da un giocatore in una partita
function genPlayerFouls() {
   return randomNumber(0, 15);
}

//Funzione che genera la percentuale di tiri da 2 punti fatti da un giocatore in una partita
function twoPointsScored(maxPointScored) {
   return randomNumber(0, maxPointScored);
}

//Funzione che genera la percentuale di tiri da 3 punti fatti da un giocatore in una partita
function threePointsScored(maxPointScored, twoPoint) {
   var maxPossible = maxPointScored - twoPoint;
   return randomNumber(0, maxPossible);
}

//Funzione che calcola la percentuale dei tiri da 2 o 3 punti rispetto ai punti totali
function getScoredPercent(maxPointScored, score) {
   if(maxPointScored == 0){
      return 0;
   } else {
      return (score / maxPointScored * 100).toFixed(2);
   }
}

//Funzione che cerca nel db se l'id inserito è presente; ritorna la posizione dell'id altrimenti -1
function searchId(db, idRequested) {
   index = -1;
   for (var i = 0; i < db.length; i++) {
      if (db[i].id == idRequested) {
         index = i;
      }
   }
   return index;
}

//Funzione che riceve un oggetto e ne stampa le proprietà
function printStat(obj) {
   alert("STATISTICHE GIOCATORE: " + obj.id  + "\n" +
                  "punti_fatti: " + obj.punti_fatti + "\n" +
                  "falli_commessi: " + obj.falli_commessi + "\n" +
                  "tiri_2punti: " + obj.tiri_2punti + "\n" +
                  "tiri_3punti: " + obj.tiri_3punti);
}

//Funzione che chiede all'utente di inserire il codice identificativo di un giocatore
function insertId(){
   var codeRequest = document.getElementById('insertId').value;
   return codeRequest;
}


//Funzione che richiede all'utente di scegliere la statistica
function statChoiche(db) {
   do {
      var property = prompt("Quale statistica vuoi visualizzare?\npunti_fatti,\nfalli_commessi,\ntiri_2punti,\ntiri_3punti");
   } while ( (property != "punti_fatti") && (property != "falli_commessi") && (property != "tiri_2punti") && (property != "tiri_3punti")  );
   return property;
}

//FUnzione che prende in input l'array e la statistica della quale calcolerà la media
function statMedia(db, property){
   var totalSum = 0;
   for (var i = 0; i < db.length; i++) {
      if (property == "punti_fatti") {
         totalSum += db[i].punti_fatti;
      } else if(property == "falli_commessi") {
         totalSum += db[i].falli_commessi;
      } else if (property == "tiri_2punti") {
         totalSum += db[i].tiri_2punti;
      } else {
         totalSum += db[i].tiri_3punti;
      }
   }
   return totalSum / db.length;
}
