export class HangmanElements {
  constructor(container) {
    this.container = container;
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
  }

  renderHangmanElements() {
    const hangman = document.createElement("div");
    hangman.id = "hangman";
    this.container.appendChild(hangman);

    this.hangmanPartsData.forEach((part) => {
      const div = document.createElement("div");
      div.id = part.id;
      div.className = part.className;
      hangman.appendChild(div);

      if (part.id.includes("human")) {
        this.hangmanParts.push(div);
      }
    });
  }

  displayWord(wordState) {
    const wordContainer = document.createElement("div");
    wordContainer.id = "word-container";
    this.container.appendChild(wordContainer);
    wordContainer.textContent = wordState.join(" ");
  }

  showHangmanPart(wrongGuesses) {
    if (wrongGuesses >= 1 && wrongGuesses <= 6) {
      const hangmanPartToDisplay = this.hangmanParts[wrongGuesses - 1];
      hangmanPartToDisplay.classList.add("human__part_visible");
    }
  }

  updateIncorrectGuesses(wrongGuesses) {
    const incorrectGuesses = document.createElement("p");
    incorrectGuesses.id = "incorrect-guesses";
    incorrectGuesses.textContent = `Incorrect guesses: ${wrongGuesses} / 6`;
    this.container.appendChild(incorrectGuesses);
  }
}
