const wordSection = document.getElementById("wordSection");
const wonPopUp = document.getElementById("wonPopUp");
const lostPopUp = document.getElementById("lostPopUp");
const tWord = document.getElementById("tWord");

let words = ["cdzcode", "like", "follow", "save", "cat", "dog", "house", "computer", "system", "eyes"];
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

document.addEventListener("keydown", function(e){
  if (e.which <= 90 && e.which >= 48){
    let key = e.key;
    if(!random.includes(key)){
      if(!wrongLetter.includes(key)){
        wrongLetter.push(key);
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
      if (!correctWords.includes(key)) {
        correctWords.push(key);
        updateWord();
        console.log(correctWords);
      }
    }
  }
})

function randomWord(){
  return words[Math.floor(Math.random() * 10)]
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
