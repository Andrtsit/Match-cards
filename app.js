"use strict";

// SOME SELECTORS AND VARIABLES NEEDED
const container = document.querySelector(".container");
const score1 = document.querySelector(".score");
const btn = document.getElementById("restart");

let firstCard, secondCard;
let score = 0;

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

// RANDOMIZE ARRAY WITH WHILE AND SPLICE
const randomizeArrayWithSplice = function (array) {
  const arrayCopy = [...array];
  const shuffledArray = [];
  while (arrayCopy.length > 0) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    // Remove the element at the random index and push it to the shuffled array
    shuffledArray.push(arrayCopy.splice(randomIndex, 1)[0]);
  }
  return shuffledArray;
};

const shuffledArray = randomizeArrayWithSplice(arrayCards);

// FUNCTIONS

const unFlip = function (card1, card2) {
  setTimeout(() => {
    card1.classList.remove("flip");
    card2.classList.remove("flip");
  }, 1000);
};

const reset = function () {
  firstCard = null;
  secondCard = null;
};

const check = function () {
  if (secondCard.dataset.name === firstCard.dataset.name) {
    score++;
    score1.textContent = score;
    reset();
  } else {
    unFlip(secondCard, firstCard);
    reset();
  }
};
// GENERATE FUNCTION

const generate = function (array) {
  array.forEach((obj) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const inner = document.createElement("div");
    inner.classList.add("inner");
    inner.setAttribute("data-name", obj.name);
    inner.innerHTML = `
    <div class="front"></div>
    <div class="back">
    <img src="${obj.src}" alt="random-icon" />
    </div>
    `;
    container.appendChild(card);
    card.appendChild(inner);
  });
  let inners = document.querySelectorAll(".inner");
  const eventListenerAttacher = () => {
    inners.forEach((inner) =>
      inner.addEventListener("click", function () {
        if (!firstCard) {
          this.classList.add("flip");
          firstCard = this;
          return;
        }
        if (firstCard) {
          this.classList.add("flip");
          secondCard = this;
          check();
        }
      })
    );
  };
  eventListenerAttacher();
};

// BOARD GENERATE
generate(shuffledArray);

const restart = function () {
  score = 0;
  score1.textContent = 0;
  firstCard = null;
  secondCard = null;
  let cards = document.querySelectorAll(".card");
  let inners = document.querySelectorAll(".inner");
  cards.forEach((card) => card.remove());
  inners.forEach((inner) => {
    inner.remove();
  });
  const shuffledArray2 = randomizeArrayWithSplice(arrayCards);
  generate(shuffledArray2);
};

btn.addEventListener("click", restart);
