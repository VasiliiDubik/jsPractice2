export class HangmanGameLogic {
  constructor(container, hangmanElements) {
    this.container = container;
    this.hangmanElements = hangmanElements;
    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    this.elementBtnsDict = {};
  }

  startNewGame() {
    this.currentWordObject =
      this.wordsWithHints[
        Math.floor(Math.random() * this.wordsWithHints.length)
      ];
    this.currentWord = this.currentWordObject.word;
    this.hintText = document.createElement("p");
    this.hintText.id = "hint-text";
    this.hintText.textContent = `Hint: ${this.currentWordObject.hint}`;
    this.container.appendChild(this.hintText);

    this.wordState = "_".repeat(this.currentWord.length).split("");
    this.wrongGuesses = 0;

    this.hangmanElements.displayWord(this.wordState);
    this.hangmanElements.updateIncorrectGuesses(this.wrongGuesses);

    this.setupButtons();
  }

  setupButtons() {
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.id = "button-container";
    this.container.appendChild(this.buttonContainer);

    this.letters.split("").forEach((letter) => {
      const button = document.createElement("button");
      button.classList.add("letter-button");
      button.textContent = letter;
      this.buttonContainer.appendChild(button);
      button.addEventListener("click", () =>
        this.processLetterClick(button.textContent)
      );

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
  }

  processLetterClick(letter) {
    if (this.currentWord.includes(letter)) {
      this.currentWord.split("").forEach((char, index) => {
        if (char === letter) {
          this.wordState[index] = letter;
        }
      });
      this.hangmanElements.displayWord(this.wordState);
    } else {
      this.wrongGuesses++;
      this.hangmanElements.updateIncorrectGuesses(this.wrongGuesses);
      this.hangmanElements.showHangmanPart(this.wrongGuesses);
    }

    this.elementBtnsDict[letter].disabled = true;

    if (this.wordState.join("") === this.currentWord) {
      setTimeout(() => alert("Congratulations! You guessed the word!"), 100);
      setTimeout(() => this.startNewGame(), 200);
    }

    if (this.wrongGuesses >= 6) {
      setTimeout(
        () =>
          alert(
            "Game Over! You have reached the maximum number of wrong guesses."
          ),
        100
      );
      setTimeout(() => this.startNewGame(), 200);
    }
  }
}
