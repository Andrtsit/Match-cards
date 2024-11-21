"use strict";
(() => {
  const container = document.querySelector(".container");
  let firstCard, secondCard;
  let score = 0;
  let lock = false;
  const arrayCards1 = [
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
  // RANDOMIZE ARRAY WITH SPLICE
  let randomizeArrayWithSplice = function (array) {
    const shuffledArray = [];
    while (array.length > 0) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * array.length);
      // Remove the element at the random index and push it to the shuffled array
      shuffledArray.push(array.splice(randomIndex, 1)[0]);
    }
    return shuffledArray;
  };
  const shuffledArray = randomizeArrayWithSplice(arrayCards1);

  for (const obj of shuffledArray) {
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
  }

  const inners = document.querySelectorAll(".inner");

  // FUNCTIONS

  const unflip = function (card) {
    setTimeout(() => {
      card.classList.remove("flip");
    }, 1000);
  };

  const reset = function () {
    firstCard = null;
    secondCard = null;
  };

  const flip = function () {
    firstCard.classList.add("flip");
    secondCard.classList.add("flip");
  };
  const check = function () {
    if (secondCard.dataset.name === firstCard.dataset.name) {
      score++;
      console.log(score);
    }
  };

  // EVENT LISTENER
  inners.forEach((inner) =>
    inner.addEventListener("click", function () {
      if (!firstCard) {
        firstCard = this;
        firstCard.classList.add("flip");
        unflip(firstCard);
      }
      if (this !== firstCard) {
        secondCard = this;
        secondCard.classList.add("flip");
        unflip(secondCard);
        console.log(firstCard);
        console.log(secondCard);
        check();
      }
    })
  );
})();
