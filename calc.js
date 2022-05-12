var bsel = [];
var fPrR = [];

function botones() {
  if (document.getElementsByClassName("botonActivo").length > 0) {
    document.getElementById("Generar").disabled = false;
  } else {
    document.getElementById("Generar").disabled = true;
  }
}

function dodeca() {
  clearAll();
  document.getElementById("tIndex").value = 0;
  var int = parseInt(document.getElementById("rIndex").value) - 1;
  var notas = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  for (var i = 0; i < notas.length; i++) {
    document.getElementById(notas[i]).style.backgroundColor = "white";
  }
  var numbers = []; // new empty array
  var min, max, r, n, p;
  min = 0;
  max = 11;
  r = int;
  for (let i = 0; i <= r; i++) {
    do {
      n = Math.floor(Math.random() * (max - min + 1)) + min;
      p = numbers.includes(n);
      if (!p) {
        numbers.push(n);
      }
    } while (p);
  }
  bsel = numbers;

  for (var i = 0; i < bsel.length; i++) {
    document.getElementById(bsel[i].toString()).classList.toggle("botonActivo");
    document.getElementById(bsel[i].toString()).style.backgroundColor =
      "#2EE59D";
  }
  return bsel;
} 

function toggle(index) {
  var t = document.getElementById(index.toString());
  if (t.classList == "botonActivo") {
    t.classList = "botonInactivo";
    const indexOfIndex = bsel.indexOf(index);
    bsel.splice(indexOfIndex, 1);
  } else {
    t.classList = "botonActivo";
    bsel.push(index);
  }
}

function buttonOff() {
  for (var i = 0; i < 12; i++) {
    document.getElementById(i.toString()).style.backgroundColor = "";
    var btn = i.toString();
    var t = document.getElementById(i);
    t.classList = "botonInactivo";
  }
}

function clearAll() {
  bsel = [];
  fPrR = "";
}

function generar() {
  document.getElementById("tIndex").value = 0;
}
/////////////////////////////////////////

function mySerie(index) {
  var input = [];

  bsel.forEach(function (e) {
    var tindex = document.getElementById("tIndex").value;
    var vb = Math.abs((e + parseInt(tindex)) % 12);
    if (tindex != 0) {
      document.getElementById(vb.toString()).classList.toggle("botonActivo");
      document.getElementById(vb.toString()).style.backgroundColor = "#2EE59D";
    }
    input.push(vb);
  });
  bsel = input;

  console.log("serie", input, "</br>");

  /////////////////////////////////////////

  function permutaciones() {
    var tricorde = input;
    var permu = [];
    var formaPrimaCal = [];
    var formaPrimaSel = [];

    for (var e = 0; e < tricorde.length; e++) {
      var tri0 = [];
      var retro0 = [];
      var tri0sum;
      var retro0sum;

      tricorde.forEach(function (nota) {
        var nuevoValor = (nota - tricorde[e] + 12) % 12;
        tri0.push(nuevoValor);
        tri0.sort((a, b) => a - b);
        tri0sum = tri0.reduce((a, b) => a + b, 0);

        var nuevoValorR = (tricorde[e] - nota + 12) % 12;
        retro0.push(nuevoValorR);
        retro0.sort((a, b) => a - b);
        retro0sum = retro0.reduce((a, b) => a + b, 0);
      });

      formaPrimaCal.push(tri0sum, retro0sum);
      formaPrimaSel.push(tri0, retro0);
      permu.push(
        " " + tricorde[e].toString(),
        tri0,
        "'" + tricorde[e].toString(),
        retro0
      );
    }

    var formaPrimaIn = formaPrimaCal.indexOf(Math.min(...formaPrimaCal));
    fPrR = formaPrimaSel[formaPrimaIn];
    
    return permu;
  }
  console.log("permutaciones", permutaciones(), "</br>");

  function formaPrima() {
    var res = fPrR;
    return res;
  }

  console.log("formaPrima", formaPrima(), "</br>");

  /////////////////////////////////////////
  /////////////////////////////////////////

  function reverse() {
    var rev = input.map((x) => x);
    for (let i = 0, j = rev.length - 1; i < j; i++, j--)
      [rev[i], rev[j]] = [rev[j], rev[i]];
    return rev;
  }

  console.log("retrogrado", reverse(), "</br>");

  /////////////////////////////////////////

  function inv() {
    var p1 = input[0];
    var res = [];
    input.forEach(function (unaNota) {
      var nuevoValor = (unaNota - p1) * -1 + parseInt(index);
      res.push((nuevoValor + 12) % 12);
    });
    return res;
  }
  console.log("inversion", inv(), "</br>");

  /////////////////////////////////////////

  function matrix() {
    var p1 = input[0];
    var res = [];
    var mres = [];
    input.forEach(function (unaNota) {
      var nuevoValor = (unaNota - p1) * -1;
      res.push(nuevoValor);
    });
    var m0 = [],
      m1 = [],
      m2 = [],
      m3 = [],
      m4 = [],
      m5 = [],
      m6 = [],
      m7 = [],
      m8 = [],
      m9 = [],
      m10 = [],
      m11 = [];
    var r = [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11];
    for (var i = 0; i < input.length; i++) {
      m0.push((input[i] + res[0] + 12) % 12);
      m1.push((input[i] + res[1] + 12) % 12);
      m2.push((input[i] + res[2] + 12) % 12);
      m3.push((input[i] + res[3] + 12) % 12);
      m4.push((input[i] + res[4] + 12) % 12);
      m5.push((input[i] + res[5] + 12) % 12);
      m6.push((input[i] + res[6] + 12) % 12);
      m7.push((input[i] + res[7] + 12) % 12);
      m8.push((input[i] + res[8] + 12) % 12);
      m9.push((input[i] + res[9] + 12) % 12);
      m10.push((input[i] + res[10] + 12) % 12);
      m11.push((input[i] + res[11] + 12) % 12);
    }
    for (var i = 0; i < input.length; i++) {
      var mv = r[i];
      mres.push(mv);
    }
    return mres;
  }
  console.log("matrix:", matrix(), "</br>");
}

/////////////////////////////////////////
