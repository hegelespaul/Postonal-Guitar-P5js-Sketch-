//holomorfo.mx@gmail.com
let textPr;
let cnv;
let cnvWidth;
let cnvHeight;
let cp;

let afinacion = [5, 0, 8, 3, 10, 5];
let trastesNum = 22;
let chord = [];
let pispitch = [];
let cuerda;
let traste;
let nota;
let pisadas;

let mtx = [];

let cord = [];

var zoom = 1.0;
var zMin = 1.0;
var zMax = 2.0;
var sensativity = 0.005;

function getChord() {
  chord = bsel;
  return chord;
}

function reset() {
  getChord();
  clearAllDiagram();
  construyeDiapa();
  construyeDedos();
  generadorDiagramas();
}

function resetAll() {
  getChord();
  clearAllDiagram();
  construyeDedos();
}

function setup() {
  mastilWidth = windowWidth / 2;
  cp = mastilWidth * 0.01;
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, cp * 10);
  translate(0, cp * 5);
  textSize(cp * 1.7);
  textAlign(CENTER, CENTER);
  reset();
  print(chord);
  clearAllDiagram();
}

function draw() {
  cnv.resize(
    windowWidth * zoom,
    windowHeight * zoom + ((cp * mtx.length) / 10) * 6.5
  );
  scale(zoom);
  noCursor();
  noStroke();
  fill(230, 230, 0, 100);
  ellipse(mouseX / zoom, mouseY / zoom, cp * 10, cp * 10);
  construyeDiapa();
  constructorPosicion(chord);
  allDiagram();
}

function mouseWheel(event) {
  zoom += sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  //uncomment to block page scrolling
  return false;
}

function clearAllDiagram() {
  mtx = [];
}

function construyeDedos() {
  pisadas = constructorPosicion(getChord());
  cuerda = pisadas.map((a) => a[0]);
  traste = pisadas.map((a) => a[1]);
  nota = pisadas.map((a) => a[2]);
  print(pisadas);
}

function construyeDiapa() {
  translate(0, cp * 5);
  stroke(0, 0, 0);
  strokeWeight(1);
  line(cp * 1.5, cp * 2.66, cp * 1.5, cp * 16);
  strokeWeight(0.6);
  line(cp * 1.5, cp * 2.66, cp * 2.66, cp * 2.66);
  strokeWeight(2.5);
  line(cp * 1.5, cp * 15.96, cp * 2.66, cp * 15.96);

  for (var i = 0; i < 6; i++) {
    strokeWeight((1 * i + 1) / 2);
    stroke(30);
    line(
      cp * 2.66,
      i * cp * 2.66 + cp * 2.66,
      cp * 98.46,
      i * cp * 2.66 + cp * 2.66
    );
  }
  for (var i = 0; i < trastesNum + 1; i++) {
    strokeWeight(1.2);
    stroke(30);
    line(
      (i * cp * 95.8) / trastesNum + cp * 2.66,
      cp * 2.66,
      (i * cp * 95.8) / trastesNum + cp * 2.66,
      cp * 15.96
    );
  }

  var ini = cp * 0.6;
  var trt = cp * 4.35;
  fill(161, 161, 161, 100);
  stroke(200, 200, 200, 100);
  for (var o = 0; o < 22; o++) {
    if (o % 2 != 0 && o != 1 && o != 11 && o != 13) {
      ellipse(ini + trt * o, cp * 9.3, cp * 1.3, cp * 1.3);
    }
  }
  ellipse(ini + trt * 12, cp * 6.6, cp * 1.3, cp * 1.3);
  ellipse(ini + trt * 12, cp * 12, cp * 1.3, cp * 1.3);

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < trastesNum; j++) {
      //text((afinacion[i] + j) % 12,(j * 720) / trastesNum + 20 + 15,i * 20 + 20);
    }
  }
}

function constructorPosicion(chord) {
  //translate(cp*2.5,0)
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < trastesNum; j++) {
      for (var k = 0; k < chord.length; k++) {
        if ((chord[k] + afinacion[i] + j) % 12 == (chord[k] * 2) % 12) {
          pispitch.push([i + 1, j + 1, chord[k]]);
          fill(255, 255, 255);
          strokeWeight(2);
          stroke(51, 51, 51, 100);
          ellipse(
            (j * cp * 95.8) / trastesNum + cp * 4.86,
            i * cp * 2.66 + cp * 2.66,
            cp * 2.66,
            cp * 2.66
          );
          noStroke();
          fill(51, 51, 51);
          textSize(cp * 1.5);
          text(
            chord[k],
            cp * 4.86 + (j * cp * 95.8) / trastesNum,
            cp * 2.66 + i * cp * 2.7
          );
        }
      }
    }
  }
  pispitch = Array.from(new Set(pispitch.map(JSON.stringify)), JSON.parse);
  return pispitch;
}

function generadorDiagramas() {
  var mtxf = [];
  var mtx2 = [];
  var s1 = [];
  var a;
  var b;

  function cartesianProduct(arr) {
    return Array.prototype.reduce.call(
      arr,
      function (a, b) {
        var ret = [];
        a.forEach(function (a) {
          b.forEach(function (b) {
            ret.push(a.concat([b]));
          });
        });
        return ret;
      },
      [[]]
    );
  }

  for (var i = 0; i < 18; i++) {
    a = 5 + i;
    b = 1 + i;
    s1.push([]);
    pisadas.forEach(function (t) {
      if (t[1] <= a && t[1] >= b) {
        s1[i].push(t);
      }
    });
  }
  print(s1);

  s1.forEach(function (x) {
    var myGrid = [...Array(chord.length)].map((e) => Array());

    x.forEach(function (y) {
      for (var c = 0; c < chord.length; c++) {
        if (y[2] == chord[c]) {
          myGrid[c].push(y);
        }
      }
    });

    myGrid = cartesianProduct(myGrid);

    myGrid.forEach(function (e) {
      mtx.push(e);
      for (var c = 0; c < e.length; c++) {
        for (var d = 0; d < e.length; d++) {
          if (c != d && e[c][0] == e[d][0]) {
            mtx2.push(e);
          }
        }
      }
      mtx = _.difference(mtx, mtx2);
    });
    mtx = Array.from(new Set(mtx.map(JSON.stringify)), JSON.parse);
  });
  print(mtx);
}
///////////////////////////////////////////////////////////////////////////////////////////////

class Diagram {
  constructor(fret, f, trm5) {
    this.f = f;
    this.fret = fret;
    this.trm5 = trm5;

    for (var i = 0; i < 6; i++) {
      if (fret != 1) {
        stroke(255, 255, 255);
        textSize(cp);
        text(fret.toString() + " fr.", cp * 3.6, cp * 2.52 * 10);
      }
      fill(100);
      noStroke();
      textSize(cp * 1.5);
      text((f + 1).toString(), cp, cp * 2.66 * 10);
      fill(0);

      strokeWeight((1 * i + 1) / 5);
      stroke(30);
      line(
        cp * 2.66,
        i * cp * 1.03 + cp * 2.66 * 10,
        cp * 12.2,
        i * cp * 1.03 + cp * 2.66 * 10
      );
    }

    for (var i = 0; i < 6; i++) {
      strokeWeight(1);
      stroke(30);
      line(
        (i * cp * 9.58) / 5 + cp * 2.66,
        cp * 2.66 * 10,
        (i * cp * 9.58) / 5 + cp * 2.66,
        cp * 3.17 * 10
      );
    }

    for (var g = 0; g < mtx[f].length; g++) {
      for (var h = 1; h < 7; h++) {
        for (var j = 0; j < trm5.length; j++) {
          if (mtx[f][g][0] == h && mtx[f][g][1] == trm5[j] + fret - 1) {
            strokeWeight(1);
            stroke(150, 150, 150, 150);
            fill(255);
            ellipse(
              (trm5[j] * cp * 9.58) / 5 + cp * 1.7,
              h * cp * 1.03 + cp * 2.56 * 10,
              cp * 1.05,
              cp * 1.05
            );
            fill(30);
            noStroke();
            textSize(cp * 0.7);
            text(
              mtx[f][g][2].toString(),
              (trm5[j] * cp * 9.58) / 5 + cp * 1.7,
              h * cp * 1.03 + cp * 2.565 * 10
            );
          }
        }
      }
    }
    //rectMode(RADIUS);
    //rect(cp * 10, cp * 3.2 * 9, 9 * cp, 4 * cp);
  }
}
///////////////////////////////////////////////////////////////////////////////////////
var arrayDiagram = [];

function allDiagram() {
  if (fPrR != "") {
    fill(255);
    strokeWeight(1.3);
    stroke(10);
    textSize(cp * 8.8);
    var content = "(" + fPrR.toString() + ")";
    textPr = text(content, cp * 145, cp * 8.8);
  }

  translate(0, cp * 3);
  for (var f = 0; f < mtx.length; f++) {
    var trastesacordes = [];
    for (var g = 0; g < mtx[f].length; g++) {
      trastesacordes.push(mtx[f][g][1]);
    }
    var minsum = Math.min(...trastesacordes);
    var maxsum = Math.max(...trastesacordes);
    var fret = minsum;
    var trm5 = new Array(...trastesacordes);
    for (let i = 0; i < trm5.length; i++) {
      trm5[i] = trm5[i] - minsum + 1;
    }
    //print(trastesacordes, fret, trm5);

    var x = cp * 20;
    var xall = x * f;
    var fw = Math.floor(xall / (cp * 200));
    if (f === 0) {
      translate(cp * 2.5, 0);
      var l = new Diagram(fret, f, trm5);
      arrayDiagram.push(l);
    }

    if (f > 0 && xall < cp * 200) {
      push();
      translate(x, 0);
      var m = new Diagram(fret, f, trm5);
      arrayDiagram.push(m);
    }

    if (xall > cp * 200 - x) {
      pop();
      translate(x, 0);
      push();
      translate(-cp * 200 * fw + x, 0);
      translate(0, cp * 8.6 * fw * 1.2);
      var n = new Diagram(fret, f, trm5);
      arrayDiagram.push(n);
    }
  }
}

function mousePressed() {
  var x;
  var y;
  if (mouseY > (cp * 30) / zoom) {
    for (var i = 0; i < windowWidth / zoom; i++) {
      if (Math.floor((mouseX / windowWidth / zoom) * 10) == i) {
        x = i + 1;
        console.log("x=" + x);
      }
      if (Math.floor((mouseY / windowWidth / zoom) * 19.5) == i) {
        y = i - 3;
        console.log("y=" + y);
      }
    }
    var numeroDiagrama = y * 10 + x;
    console.log("coord " + numeroDiagrama.toString());
    var cordDiagrama = mtx[numeroDiagrama - 1];
    var audioFinal = [];
    for (var i = 0; i < cordDiagrama.length; i++) {
      audioFinal.push([
        cordDiagrama[i][0].toString() + "-" + cordDiagrama[i][1].toString(),
      ]);
    }
    for (var i = 0; i < audioFinal.length; i++) {
      let playD;
      playD = new Audio();
      playD.src =
        "di/" +
        audioFinal[i] +
        ".wav";
      playD.volume = 0.5;
      playD.play();
    }
    console.log(audioFinal);
  }
  fullscreen(true);
}

/*
function clock() {
  textAlign(CENTER, CENTER);
  translate(0, cp * 7);

  let radius = cp * 12,
    cx = cp * 127,
    cy = cp * 7;
  let clockDiameter = radius * 1.65;
  let hoursRadius = radius;

  noFill();
  stroke(30);
  strokeWeight(0.2);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  for (hp = 0; hp < 12; hp++) {
    let h = map(hp, 0, 24, 0, TWO_PI * 2) - HALF_PI;
    stroke(0);
    strokeWeight(0.2);
    line(
      cx + (cos(h) * hoursRadius) / 1.22,
      cy + (sin(h) * hoursRadius) / 1.22,
      cx + cos(h) * hoursRadius,
      cy + sin(h) * hoursRadius
    );

    var d = dist(
      mouseX,
      mouseY - cp * 5,
      cx + cos(h) * hoursRadius,
      cy + sin(h) * hoursRadius
    );
    if (d < cp * 3) {
      //redraw();
      fill(255, 150, 150);
    } else {
      //redraw();
      fill(255);
    }
    stroke(0);
    ellipse(
      cx + cos(h) * hoursRadius,
      cy + sin(h) * hoursRadius,
      cp * 3,
      cp * 3
    );
    textSize(cp * 1.5);
    fill(30);
    stroke(51, 51, 51, 100);
    text(hp.toString(), cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  }

  beginShape(POINTS);

  let x;
  let y;
  let c = [];
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    x = cx + cos(angle) * hoursRadius;
    y = cy + sin(angle) * hoursRadius;
    vertex(x, y);
    c.push([x, y]);
  }

  c.forEach(function (e) {
    if (mouseX == e[0] && mouseY == e[1]) {
      fill(0);
      ellipse(e[0], e[1], cp * 3, cp * 3);
    }
  });
  endShape();
}
*/
