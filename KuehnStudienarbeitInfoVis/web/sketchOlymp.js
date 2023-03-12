var table;
var img;
var anz_Zeilen;
var min_lat; max_lat;
var min_long; max_long;
var x;
var y;
var ortsName;

var ufrSport;
var ofrSport;
var mfrSport;
var opfSport;
var ndbSport;
var obbSport;
var schwaSport;

var clicked = false;

function preload() {
  table = loadTable("OlympiaDataFinal.csv","csv","header")
  img = loadImage('bezirkMapFarbe.png')
}

//in der Setup Funktion werden die Werte der Zeilen in Variablen gespeichert,
//des Weiteren werden hier noch Arrays für die Sportarten aus jedem Bezirks erstellt
function setup() {
  createCanvas(1200, 1200);
  noStroke();
  var ufrSportArr = [];
  var ofrSportArr = [];
  var mfrSportArr = [];
  var opfSportArr = [];
  var schwaSportArr = [];
  var obbSportArr = [];
  var ndbSportArr = [];

  anz_Zeilen = table.getRowCount();

  min_lat = Number.MAX_VALUE;
  max_lat = 0;
  min_long = Number.MAX_VALUE;
  max_long = 0;

  for(var i = 0; i < anz_Zeilen; i++) {
    var row = table.getRow(i);

    var lat = row.getNum("Latitude1");
    if(lat < min_lat) min_lat = lat;
    if(lat > max_lat) max_lat = lat;

    var long = row.getNum("Longitude1");
    if(long < min_long) min_long = long;
    if(long > max_long) max_long = long;

    var bezirk = row.getString("Bezirk");
    var medaille = row.getString("Medaille");
    var geburtsort = row.getString("Geburtsort");
    var sport = row.getString("Sportart");

    //Prüfung um welchen Bezirk es sich handelt, Zeilen von sport werden in Variable
    //sportVal gespeichert, beim if wird geprüft ob sich in dem jeweiligen Array
    //der Wert bereits befindet um doppelte Einträge zu vermeiden, wenn nicht,
    //wird es dem Array hinzugefügt
    if (bezirk == 'UFR') {
      var sportVal = sport;
      if(!ufrSportArr.includes(sportVal)) {
        ufrSportArr.push(sportVal);
      }
      ufrSport = ufrSportArr;
    }

    if (bezirk == 'OFR') {
      var sportVal = sport;
      if(!ofrSportArr.includes(sportVal)) {
        ofrSportArr.push(sportVal);
      }
      ofrSport = ofrSportArr;
    }

    if (bezirk == 'MFR') {
      var sportVal = sport;
      if(!mfrSportArr.includes(sportVal)) {
        mfrSportArr.push(sportVal);
      }
      mfrSport = mfrSportArr;
    }
    if (bezirk == 'OPF') {
      var sportVal = sport;
      if(!opfSportArr.includes(sportVal)) {
        opfSportArr.push(sportVal);
      }
      opfSport = opfSportArr;
    }
    if (bezirk == 'NDB') {
      var sportVal = sport;
      if(!ndbSportArr.includes(sportVal)) {
        ndbSportArr.push(sportVal);
      }
      ndbSport = ndbSportArr;
    }
    if (bezirk == 'OBB') {
      var sportVal = sport;
      if(!obbSportArr.includes(sportVal)) {
        obbSportArr.push(sportVal);
      }
      obbSport = obbSportArr;
    }
    if (bezirk == 'SCHW') {
      var sportVal = sport;
      if(!schwaSportArr.includes(sportVal)) {
        schwaSportArr.push(sportVal);
      }
      schwaSport = schwaSportArr;
    }
  }
}

//Funktion zum Erstellen der Bezirknamen in den jeweiligen Farbfeldern
function drawDistrictName(districtName, xPos, yPos, brightness = 255) {

  if (brightness != 255)
  stroke(brightness);

  textSize(30);
  textStyle(ITALIC);
  text(districtName, xPos, yPos)

  if (brightness != 255)
  stroke(255);
}

//Funktion, die alle Funktionen für den jeweiligen Bezirknamen enthält,
//damit es in der draw() Funktion übersichtlicher ausschaut
function drawDistrictNames() {
  drawDistrictName('Unterfranken', 170, 200)
  drawDistrictName('Oberfranken', 519, 190, 139)
  drawDistrictName('Oberpfalz', 695, 470)
  drawDistrictName('Niederbayern', 790, 705)
  drawDistrictName('Oberbayern', 660, 950)
  drawDistrictName('Schwaben', 338, 810)
  drawDistrictName('Mittelfranken', 344, 480)
}

//Funktion, für das Anzeigen der Sportarten, in denen Medaillen gewonnen wurden
//für jeden Bezirk
function drawSport(x1, x2, y1, y2, sportArr, textX, textY) {
  if ((mouseX > x1 && mouseX < x2) && (mouseY > y1 && mouseY < y2)) {
    if(clicked) {
      fill(0);
      stroke(255);
      strokeWeight(2);
      textSize(17);
      textWrap(WORD);
      fill(155);
      text("Medaillen in:", textX, textY-45);
      for(var k = 0; k < sportArr.length; k++) {
        text(sportArr[k], textX, textY+20*k);
      }
      textSize(15);
    }
  }
}

//Funktion, die alle Funktionen für die Anzeige der Sportarten enthält,
//damit es in der draw() Funktion übersichtlicher ausschaut
function drawAllSports() {
  drawSport(19, 400, 6, 345, ufrSport, 850, 95);
  drawSport(415, 705, 22, 306, ofrSport, 850, 95);
  drawSport(575, 980, 224, 609, opfSport, 37, 450);
  drawSport(288, 597, 320, 612, mfrSport, 37, 450);
  drawSport(699, 1190, 533, 835, ndbSport, 37, 450);
  drawSport(437, 1017, 770, 1163, obbSport, 37, 480);
  drawSport(150, 540, 606, 1200, schwaSport, 37, 480);
}

//Funktion, die für jeden Bezirk alle Daten erstellt:
//Erzeugen der Medaillen, sowie Namen der Geburtsorte per Mouseover
function createDistrictData(districtID, start, stop, widthCorr, heightCorr) {
  for(var i = 0; i < anz_Zeilen; i++) {
  var row = table.getRow(i);
  var long = row.getNum("Longitude1");
  var lat = row.getNum("Latitude1");
  var bezirk = row.getString("Bezirk");
  var medaille = row.getString("Medaille");
  var geburtsort = row.getString("Geburtsort");
  var sport = row.getString("Sportart");

  if ( (bezirk == districtID)) {

    x = map(long, min_long, max_long, start, width-widthCorr);
    y = map(lat, min_lat, max_lat, height-heightCorr, stop);


    if ( medaille == 'Gold') {
      fill(255,215,0);
      stroke(255);
      strokeWeight(1);
      ellipse(x,y,30,30);
    }

    if ( medaille == 'Silber'){
      fill(192,192,192)
      stroke(255);
      strokeWeight(1);
      ellipse(x,y,20,20)
    }

    if ( medaille == 'Bronze') {
      stroke(255);
      strokeWeight(1);
      fill(191,137,112)
      ellipse(x,y,10,10)
    }

    //Prüfen ob sich Mauszeiger innerhalb des Kreises befindet um Ort anzuzeigen
    if (dist(mouseX, mouseY, x, y) < 10) {
      ortsName = row.get("Geburtsort");

      fill(0);
      stroke(255);
      strokeWeight(2);
      text(ortsName, mouseX, mouseY);
      }
    }
  }
}

//Funktion, die alle Funktionen für die jeweiligen Bezirke enthält
function drawAllBezirkData() {
  createDistrictData('UFR', 40, 60, 0, 0);
  createDistrictData('OFR', 0, 70, 0, 0);
  createDistrictData('MFR', 0, 50, 0, 0);
  createDistrictData('OPF', 40, 80, 0, 0);
  createDistrictData('NDB', -10, 40, 30, 0);
  createDistrictData('OBB', 0, -20, 0, 30);
  createDistrictData('SCHW', 50, -100, 0, 30);
}


function draw() {
  background(255);
  image(img,0,0);
  img.resize(1200,1200);

  text('Legende:', 10, 10);
  text('= Goldmedaille', 23, 42);
  text('= Silbermedaille', 23, 70);
  text('= Bronzemedaille', 23, 98);
  text('Mausklick auf Bezirk für Anzeige Sportarten', 353, 15);

  fill(255,215,0);
  ellipse(10, 37, 20,20);

  fill(192,192,192);
  ellipse(10,65,20,20);

  fill(191,137,112);
  ellipse(10,93,20,20);

  noFill();
  drawDistrictNames();

  textSize(15);
  textStyle(NORMAL);

  //zeichnet alle Sportanzeige Funktionen in dieser Funktion
  drawAllSports();

  //zeichnet alle Bezirk Funktionen in dieser Funktion
  drawAllBezirkData();
}

//Funktion für den Mausklick, setzt den bool von clicked auf true und bei
// erneutem klicken von true auf false
function mousePressed() {
  if (clicked == false) {
    clicked = true;
  }
  else {
    clicked = false;
  }
}
