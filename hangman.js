// Инициализация игрового интерфейса
const container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

const title = document.createElement("h1");
title.id = "title-text";
title.textContent = "HANGMAN GAME";
container.appendChild(title);

const hangman = document.createElement("div");
hangman.id = "hangman";
container.appendChild(hangman);

const hangmanPartsData = [
  { id: "lower-support", className: "" },
  { id: "vertical-beam", className: "" },
  { id: "uper-support", className: "" },
  { id: "rope", className: "" },
  { id: "human-head", className: "human__part" },
  { id: "human-body", className: "human__part" },
  { id: "human-hund_left", className: "human__part" },
  { id: "human-hund_right", className: "human__part" },
  { id: "human-leg_left", className: "human__part" },
  { id: "human-leg_right", className: "human__part" },
];

const hangmanParts = [];

function renderHangmanElements() {
  hangmanPartsData.forEach((part) => {
    const div = document.createElement("div");
    div.id = part.id;
    div.className = part.className;
    hangman.appendChild(div);

    if (part.id.includes("human")) {
      hangmanParts.push(div);
    }
  });
}

renderHangmanElements();

// Контейнер для слова и подсказок
const wordContainer = document.createElement("div");
wordContainer.id = "word-container";
container.appendChild(wordContainer);

const hintText = document.createElement("p");
hintText.id = "hint-text";
container.appendChild(hintText);

const incorrectGuesses = document.createElement("p");
incorrectGuesses.id = "incorrect-guesses";
incorrectGuesses.textContent = "Incorrect guesses: 0 / 6";
container.appendChild(incorrectGuesses);

// Контейнер для кнопок с буквами
const buttonContainer = document.createElement("div");
buttonContainer.id = "button-container";
container.appendChild(buttonContainer);

const elementBtnsDict = {};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters.split("").forEach((letter) => {
  const button = document.createElement("button");
  button.classList.add("letter-button");
  button.textContent = letter;
  buttonContainer.appendChild(button);
  button.addEventListener("click", () => {
    const letter = button.textContent;
    if (currentWord.includes(letter)) {
      // Если буква правильная, обновляем состояние слова
      currentWord.split("").forEach((char, index) => {
        if (char === letter) {
          wordState[index] = letter;
        }
      });
      displayWord();
    } else {
      // Если буква неверная, увеличиваем счетчик ошибок и показываем часть тела
      wrongGuesses++;
      incorrectGuesses.textContent = `Incorrect guesses: ${wrongGuesses} / 6`;
      showHangmanPart(wrongGuesses);
    }

    // Блокировка нажатой кнопки
    button.disabled = true;

    // Проверка на выигрыш
    if (wordState.join("") === currentWord) {
      setTimeout(() => alert("Congratulations! You guessed the word!"), 100);
      setTimeout(() => restartGame(), 200);
    }

    // Проверка на проигрыш
    if (wrongGuesses >= 6) {
      setTimeout(
        () =>
          alert(
            "Game Over! You have reached the maximum number of wrong guesses."
          ),
        100
      );
      setTimeout(() => restartGame(), 200);
    }
  });

  elementBtnsDict[letter] = button;
  document.addEventListener("keydown", (event) => {
    const pressedKey = event.key.toUpperCase();
    if (letters.includes(pressedKey)) {
      const button = elementBtnsDict[pressedKey];
      button?.click();
    }
  });
});

const wordsWithHints = [
  {
    word: "COMPUTER",
    hint: "An electronic device for storing and processing data.",
  },
  {
    word: "TELEPHONE",
    hint: "A device used to transmit sound over long distances.",
  },
  {
    word: "INTERNET",
    hint: "A global network providing a variety of information.",
  },
  {
    word: "PROGRAM",
    hint: "A sequence of instructions that a computer can execute.",
  },
];

let currentWordObject =
  wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
let currentWord = currentWordObject.word;
hintText.textContent = `Hint: ${currentWordObject.hint}`;

let wordState = "_".repeat(currentWord.length).split(""); // Состояние слова
let wrongGuesses = 0;

// Отображение текущего состояния слова
function displayWord() {
  wordContainer.textContent = wordState.join(" ");
}

displayWord();

function showHangmanPart(wrongGuesses) {
  if (wrongGuesses >= 1 && wrongGuesses <= 6) {
    const hangmanPartToDisplay = hangmanParts[wrongGuesses - 1];
    hangmanPartToDisplay.classList.add("human__part_visible");
  }
}

// Функция перезапуска игры
function restartGame() {
  // Сброс состояния игры
  currentWordObject =
    wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
  currentWord = currentWordObject.word;
  hintText.textContent = `Hint: ${currentWordObject.hint}`;
  wordState = "_".repeat(currentWord.length).split("");
  wrongGuesses = 0;

  // Обновление отображения
  displayWord();
  incorrectGuesses.textContent = `Incorrect guesses: ${wrongGuesses} / 6`;

  // Сброс кнопок
  document.querySelectorAll(".letter-button").forEach((button) => {
    button.disabled = false;
  });
}
