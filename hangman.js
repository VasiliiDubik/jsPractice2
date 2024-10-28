class HangmanGame {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "container";
    document.body.appendChild(this.container);

    this.title = document.createElement("h1");
    this.title.id = "title-text";
    this.title.textContent = "HANGMAN GAME";
    this.container.appendChild(this.title);

    this.hangman = document.createElement("div");
    this.hangman.id = "hangman";
    this.container.appendChild(this.hangman);

    this.hangmanPartsData = [
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

    this.hangmanParts = [];

    this.renderHangmanElements();

    this.wordContainer = document.createElement("div");
    this.wordContainer.id = "word-container";
    this.container.appendChild(this.wordContainer);

    this.hintText = document.createElement("p");
    this.hintText.id = "hint-text";
    this.container.appendChild(this.hintText);

    this.incorrectGuesses = document.createElement("p");
    this.incorrectGuesses.id = "incorrect-guesses";
    this.incorrectGuesses.textContent = "Incorrect guesses: 0 / 6";
    this.container.appendChild(this.incorrectGuesses);

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.id = "button-container";
    this.container.appendChild(this.buttonContainer);

    this.elementBtnsDict = {};

    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.letters.split("").forEach((letter) => {
      const button = document.createElement("button");
      button.classList.add("letter-button");
      button.textContent = letter;
      this.buttonContainer.appendChild(button);
      button.addEventListener("click", () => {
        this.processLetterClick(button.textContent);
      });

      this.elementBtnsDict[letter] = button;
      document.addEventListener("keydown", (event) => {
        const pressedKey = event.key.toUpperCase();
        if (this.letters.includes(pressedKey)) {
          const button = this.elementBtnsDict[pressedKey];

          if (button && !button.disabled) {
            button.click();
            button.classList.add("letter_button__pressed");
          }
        }
      });
    });

    this.wordsWithHints = [
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

    this.currentWordObject =
      this.wordsWithHints[
        Math.floor(Math.random() * this.wordsWithHints.length)
      ];
    this.currentWord = this.currentWordObject.word;
    this.hintText.textContent = `Hint: ${this.currentWordObject.hint}`;

    this.wordState = "_".repeat(this.currentWord.length).split("");
    this.wrongGuesses = 0;

    this.displayWord();

    this.restartGame();
  }

  renderHangmanElements() {
    this.hangmanPartsData.forEach((part) => {
      const div = document.createElement("div");
      div.id = part.id;
      div.className = part.className;
      this.hangman.appendChild(div);

      if (part.id.includes("human")) {
        this.hangmanParts.push(div);
      }
    });
  }

  processLetterClick(letter) {
    if (this.currentWord.includes(letter)) {
      this.currentWord.split("").forEach((char, index) => {
        if (char === letter) {
          this.wordState[index] = letter;
        }
      });
      this.displayWord();
    } else {
      this.wrongGuesses++;
      this.incorrectGuesses.textContent = `Incorrect guesses: ${this.wrongGuesses} / 6`;
      this.showHangmanPart(this.wrongGuesses);
    }

    this.elementBtnsDict[letter].disabled = true;

    if (this.wordState.join("") === this.currentWord) {
      setTimeout(() => alert("Congratulations! You guessed the word!"), 100);
      setTimeout(() => this.restartGame(), 200);
    }

    if (this.wrongGuesses >= 6) {
      setTimeout(
        () =>
          alert(
            "Game Over! You have reached the maximum number of wrong guesses."
          ),
        100
      );
      setTimeout(() => this.restartGame(), 200);
    }
  }

  displayWord() {
    this.wordContainer.textContent = this.wordState.join(" ");
  }

  showHangmanPart(wrongGuesses) {
    if (wrongGuesses >= 1 && wrongGuesses <= 6) {
      const hangmanPartToDisplay = this.hangmanParts[wrongGuesses - 1];
      hangmanPartToDisplay.classList.add("human__part_visible");
    }
  }

  restartGame() {
    this.currentWordObject =
      this.wordsWithHints[
        Math.floor(Math.random() * this.wordsWithHints.length)
      ];
    this.currentWord = this.currentWordObject.word;
    this.hintText.textContent = `Hint: ${this.currentWordObject.hint}`;
    this.wordState = "_".repeat(this.currentWord.length).split("");
    this.wrongGuesses = 0;

    this.displayWord();
    this.incorrectGuesses.textContent = `Incorrect guesses: ${this.wrongGuesses} / 6`;

    document.querySelectorAll(".letter-button").forEach((button) => {
      button.disabled = false;
    });
  }
}

const game = new HangmanGame();
