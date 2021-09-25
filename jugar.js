const wordSection = document.getElementById("wordSection");
const wonPopUp = document.getElementById("wonPopUp");
const lostPopUp = document.getElementById("lostPopUp");
const tWord = document.getElementById("tWord");

let words = ["albañil", "mensajero", "abrochar", "paro", "plaqueta", "descubrir", "disparar", "carpa", "tigre", "significado",
"macarrones", "paisaje ", "muelle", "juez", "perseguir", "hermosa", "oro", "realidad", "utilidad", "escandinavo",
"activista", "biblioteca", "diminuto", "lavabo", "hilos", "pedal", "cerrado", "urgencia", "momia", "agujeros",
"trepar", "alhajas", "tartamudear", "dichoso", "congreso", "blusa", "separar", "avergonzar", "ganado", "espuma",
"libro", "servilleta", "camello", "mediano", "maleta", "metal", "nafta", "ruidoso", "microbio", "escuchar",
"traducir", "aguacero", "carruaje", "verruga", "herradura", "novio", "este", "medialuna", "duelo", "retoque",
"envolver", "fotocopiadora", "ecologista", "extractor", "modelar", "impresora", "africano", "departamento", "integral", "azotea",
"navaja", "perderse", "músculo", "amigo", "confucio", "meses", "entrar", "viajar", "aviones", "ingenuo",
"fideos", "amortiguar", "acuario", "eclipse", "estirar", "zapatillas", "juguetes", "lava", "metal", "colina",
"curva", "hechizar", "holanda", "grapadora", "placas", "muebles", "manija", "consonantes", "arpa", "conquistar"];
let wrongWordArea = document.getElementById("wrongWordArea");

const head = document.getElementById("head");
const body = document.getElementById("body");
const rightArm = document.getElementById("rightArm");
const leftArm = document.getElementById("leftArm");
const rightLeg = document.getElementById("rightLeg");
const leftLeg = document.getElementById("leftLeg");

let correctWords = [];
let wrongLetter = [];
const random = randomWord();

function randomWord(){
  return words[Math.floor(Math.random() * 100)]
}

function updateWord(){
  wordSection.innerHTML = `
  ${random.split('').map(letter => `
    <div class="letter">
    ${correctWords.includes(letter) ? letter: ''}
    </div>
  `).join('')}
  `;
  const w = wordSection.innerText.replace(/\n/g, "");
  if(w === random){
    wonPopUp.style.display = "block";
  }
}

updateWord();

function detectFalseLetter(){
  wrongWordArea.innerHTML = `
  ${wrongLetter.map(letter =>
    ` <div class="wrongWordDiv">
    ${letter}
    </div>
  `)}
  `
}

var wordArray = random.split('');
var valor = document.getElementById("valor");

function validar(){
  alert(wordArray);
  alert(valor.value);

  if (!random.includes(valor.value)){
    //alert("La letra no se incluye");
    if(!wrongLetter.includes(valor.value)){
      wrongLetter.push(valor.value);
      detectFalseLetter();
      switch (wrongLetter.length) {
        case 1:
          head.style.display = "block";
          break;
        case 2:
          body.style.display = "block";
          break;
        case 3:
          rightArm.style.display = "block";
          break;
        case 4:
          leftArm.style.display = "block";
          break;
        case 5:
          rightLeg.style.display = "block";
          break;
        case 6:
          leftLeg.style.display = "block";
          lostPopUp.style.display = "block";
          tWord.textContent = random.toUpperCase();
          break;
      }
    }
  }
  else{
    //alert("La letra se incluye");
    if (!correctWords.includes(valor.value)) {
      correctWords.push(valor.value);
      updateWord();
      console.log(correctWords);
    }
  }
}
