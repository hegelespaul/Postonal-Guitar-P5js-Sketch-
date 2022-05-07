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
let audio1,audio2,audio3,audio4,audio5,audio6;
  
audio1 = new Audio;  
audio1.src="di/"+coordenadas[0]+".mp3";
audio1.volume = betweenf(0.13,0.33);

audio2 = new Audio;
audio2.src ="di/"+coordenadas[1]+".mp3"    
audio2.volume = betweenf(0.13,0.33);
  
audio3 = new Audio;
audio3.src ="di/"+coordenadas[2]+".mp3";    
audio3.volume = betweenf(0.13,0.33);
  
audio4 = new Audio;
audio4.src = "di/"+coordenadas[3]+".mp3"   
audio4.volume = betweenf(0.13,0.33);
  
audio5 = new Audio;
audio5.src = "di/"+coordenadas[4]+".mp3" 
audio5.volume = betweenf(0.13,0.33);
  
audio6 = new Audio;
audio6.src = "di/"+coordenadas[5]+".mp3"   
audio6.volume = betweenf(0.13,0.33);

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


