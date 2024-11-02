const input = document.getElementById("userInput");
const quiz = document.querySelector(".quiz");
const playBtn = document.getElementById("play");
const giveUp = document.getElementById("give-up");
const Again = document.getElementById("play-again");
const countdownElement = document.getElementById("countdown");
quiz.classList.add("hide");
countdownElement.classList.add("hide");
let correctAnswer = 0;
const tab = [
  ["cristiano ronaldo", "ronaldo"],
  ["lionnel messi", "messi"],
  ["robert lewandowski", "lewandowski"],
  ["karim benzema", "benzema"],
  ["raul gonzalez", "raul"],
  ["ruud van nistelrooy", "van nistelrooy"],
  ["thomas muller", "muller"],
  ["thierry henry", "henry"],
  ["kylian mbappe", "mbappe"],
  ["zlatan ibrahimovic", "ibrahimovic"],
];
const answerDisplay = [
  "Cristiano Ronaldo",
  "Lionnel Messi",
  "Robert Lewandowski",
  "Karim Benzema",
  "Raul Gonzalez",
  "Ruud Van Nistelrooy",
  "Thomas Muller",
  "Thierry Henry",
  "Kylian Mbappe",
  "Zlatan Ibrahimovic",
];

const answeredIndices = new Set(); // Pour garder la trace des réponses déjà fournies

//timer
let time = 120;
let countdownInterval;

function startTimer() {
  countdownInterval = setInterval(updateCountdown, 1000);
}
function stopTimer() {
  clearInterval(countdownInterval);
  countdownInterval = null;
}

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  countdownElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  if (correctAnswer === 10) {
    return;
  } else if (time === 0) {
    clearInterval(countdownInterval);
    alert("Time's up! You Lose");
  } else {
    time--;
  }
}

//fin timer

//check the answer index after the user set the input value
function checkAnswerIndex() {
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].includes(input.value.toLowerCase())) {
      return i;
    }
  }
  return -1;
}

//display the answer if it's correct
function createListAnswer() {
  const index = checkAnswerIndex();
  if (index !== -1 && !answeredIndices.has(index)) {
    answeredIndices.add(index); // Marque cette réponse comme traitée

    // Sélectionne le span correspondant en utilisant `data-num`
    const targetSpan = document.querySelector(`span[data-player="${index}"]`);
    if (targetSpan) {
      targetSpan.textContent = answerDisplay[index];
    }

    input.value = "";
    correctAnswer++;
  }
  checkWinner();
}

//check if the user has found all the answers
function checkWinner() {
  if (correctAnswer === 10) {
    alert("Winner Winner Chicken Dinner!");
  }
}
//reveal all the answers if the user gives up
function revealAnswer() {
  for (let i = 0; i < answerDisplay.length; i++) {
    let targetSpan = document.querySelector(`span[data-player="${i}"]`);
    if (targetSpan) {
      targetSpan.textContent = answerDisplay[i];
    }
  }
}
//show the game after clicking "play"
function show() {
  quiz.classList.replace("hide", "show");
  countdownElement.classList.replace("hide", "show");
  playBtn.classList.add("hide");
}
//reset all the answers to play again
function playAgain() {
  for (let i = 0; i < answerDisplay.length; i++) {
    let targetSpan = document.querySelector(`span[data-player="${i}"]`);
    if (targetSpan) {
      targetSpan.textContent = "";
    }
  }
  return 1;
}

playBtn.addEventListener("click", show);
countdownElement.addEventListener("click", show);
input.addEventListener("input", createListAnswer);
giveUp.addEventListener("click", revealAnswer);
Again.addEventListener("click", playAgain);
