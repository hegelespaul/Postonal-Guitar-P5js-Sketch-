function acorde(){
 let audios =[];
 for(var i =1; i<7;i++){
 let cuerda = i;
 let traste = between(0,22);
 audios.push(cuerda.toString()+'-'+traste.toString());
 }
console.log(audios);
return audios;  
}

function playchord(coordenadas){
let audioContext = new AudioContext();
let audio1,audio2,audio3,audio4,audio5,audio6;

audio1 = new Audio;  
audio1.src="di/"+coordenadas[0]+".mp3";
audio1.volume = 1/6;
let track1 = audioContext.createMediaElementSource(audio1);
track1.connect(audioContext.destination);

audio2 = new Audio;
audio2.src ="di/"+coordenadas[1]+".mp3"    
audio2.volume =  1/6;
let track2 = audioContext.createMediaElementSource(audio2);
track2.connect(audioContext.destination);
  
audio3 = new Audio;
audio3.src ="di/"+coordenadas[2]+".mp3";    
audio3.volume =  1/6;
let track3 = audioContext.createMediaElementSource(audio3);
track3.connect(audioContext.destination);
  
audio4 = new Audio;
audio4.src = "di/"+coordenadas[3]+".mp3"   
audio4.volume =  1/6;
let track4 = audioContext.createMediaElementSource(audio4);
track4.connect(audioContext.destination);
  
audio5 = new Audio;
audio5.src = "di/"+coordenadas[4]+".mp3" 
audio5.volume =  1/6;
let track5 = audioContext.createMediaElementSource(audio5);
track5.connect(audioContext.destination);
  
audio6 = new Audio;
audio6.src = "di/"+coordenadas[5]+".mp3"   
audio6.volume =  1/6;
let track6 = audioContext.createMediaElementSource(audio6);
track6.connect(audioContext.destination);

audio1.play();
audio2.play();
audio3.play();
audio4.play();
audio5.play();
audio6.play();
}

function play() {
  var playbutton = document.getElementById("play");
  playbutton.addEventListener("click", playchord(acorde()));
  for (var i=0; i<6; i++);{
  var listAsStr ="<ul>" + acorde() + "<ul>";
  console.log(listAsStr);
    }
}

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

function betweenf(min, max) {  
  return Math.random() * (max - min) + min
}


