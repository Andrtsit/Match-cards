"use strict";
(() => {
  const container = document.querySelector(".container");
  const score1 = document.querySelector(".score");
  const btn = document.getElementById("restart");

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

  // RANDOMIZE ARRAY WITH WHILE AND SPLICE
  let randomizeArrayWithSplice = function (array) {
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

  const shuffledArray = randomizeArrayWithSplice(arrayCards1);

  // board generate

  const generate = function (array) {
    for (const obj of array) {
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
  };
  generate(shuffledArray);

  const cards = document.querySelectorAll(".card");
  const inners = document.querySelectorAll(".inner");
  // FUNCTIONS
  //
  // ============================ vaggooo edw =========
  // apo panw kanw select ta elements pou ekana generate sto function (cards kai inners)
  // sto restart function apo katw ta kanw remove kai ksanakanw kainourgia generate .to provlhma m einai oti ta event listeners sthn grammh 108 den pianoun sta kainourgia inners pou kanw generate, to xw ksanapathei kai to xw lusei me event delegation ,edw den douleuei (nomizw) me event delegation , pws tha to lunes ?
  ///
  ////
  ////
  const restart = function () {
    score1.textContent = 0;
    firstCard = null;
    secondCard = null;
    cards.forEach((card) => card.remove());
    inners.forEach((inner) => {
      inner.remove();
    });
    const shuffledArray2 = randomizeArrayWithSplice(arrayCards1);
    generate(shuffledArray2);
  };

  const unFlip = function (card, card2) {
    setTimeout(() => {
      card.classList.remove("flip");
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

  // EVENT LISTENERs
  inners.forEach((inner) =>
    inner.addEventListener("click", function () {
      if (!firstCard) {
        this.classList.add("flip");
        firstCard = this;
        console.log(firstCard);
        return;
      }
      if (firstCard) {
        this.classList.add("flip");
        secondCard = this;
        console.log(secondCard);
        check();
      }
    })
  );

  btn.addEventListener("click", restart);
})();
