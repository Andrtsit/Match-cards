"use strict";

(function () {
  // DOM Elements
  const container = document.querySelector(".container");
  const scoreDisplay = document.querySelector(".score");
  const restartBtn = document.getElementById("restart");

  // Game State
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let score = 0;
  let matchedPairs = 0;

  const arrayCards = [
    { name: "flower", src: "icons/1.svg" },
    { name: "tulip", src: "icons/2.svg" },
    { name: "heart", src: "icons/3.svg" },
    { name: "react", src: "icons/4.svg" },
    { name: "sass", src: "icons/5.svg" },
    { name: "html", src: "icons/6.svg" },
    { name: "flower", src: "icons/1.svg" },
    { name: "tulip", src: "icons/2.svg" },
    { name: "heart", src: "icons/3.svg" },
    { name: "react", src: "icons/4.svg" },
    { name: "sass", src: "icons/5.svg" },
    { name: "html", src: "icons/6.svg" },
  ];

  // Shuffle array
  function shuffle(array) {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  }

  // Create card element
  function createCard(obj) {
    const card = document.createElement("div");
    card.classList.add("card");

    const inner = document.createElement("div");
    inner.classList.add("inner");
    inner.setAttribute("data-name", obj.name);
    inner.setAttribute("tabindex", "0");
    inner.setAttribute("role", "button");
    inner.setAttribute("aria-label", `Card with ${obj.name}`);

    inner.innerHTML = `
      <div class="front"></div>
      <div class="back">
        <img src="${obj.src}" alt="${obj.name}" />
      </div>
    `;

    card.appendChild(inner);
    container.appendChild(card);

    // Event listeners
    inner.addEventListener("click", handleCardClick);
    inner.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick.call(inner);
      }
    });
  }

  // Handle card click
  function handleCardClick() {
    if (lockBoard || this === firstCard || this.classList.contains("flip")) return;

    this.classList.add("flip");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }

  // Check for match
  function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
      disableCards();
      updateScore();
      matchedPairs++;
      checkGameCompletion();
    } else {
      unflipCards();
    }
  }

  // Disable matched cards
  function disableCards() {
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
  }

  // Unflip unmatched cards
  function unflipCards() {
    firstCard.classList.add("mismatched");
    secondCard.classList.add("mismatched");

    setTimeout(() => {
      firstCard.classList.remove("flip", "mismatched");
      secondCard.classList.remove("flip", "mismatched");
      resetBoard();
    }, 1000);
  }

  // Reset board state
  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  // Update score display
  function updateScore() {
    score++;
    scoreDisplay.textContent = score;
  }

  // Check if game is completed
  function checkGameCompletion() {
    if (matchedPairs === arrayCards.length / 2) {
      setTimeout(() => {
        alert(`Congratulations! You matched all pairs in ${score} moves!`);
      }, 500);
    }
  }

  // Initialize game
  function initGame() {
    container.innerHTML = "";
    score = 0;
    matchedPairs = 0;
    scoreDisplay.textContent = score;
    const shuffledCards = shuffle(arrayCards);
    shuffledCards.forEach(createCard);
  }

  // Restart game
  restartBtn.addEventListener("click", initGame);

  // Start game on load
  initGame();
})();
