"use strict";
(() => {
  const container = document.querySelector(".container");

  // making grid UI
  const boxesNumber = 12;
  const htmlString = `<div class="card">
          <div class="inner">
            <div class="front"></div>
            <div class="back">
              <img src="" alt="random-icon" />
            </div>
          </div>
        </div>`;
  for (let i = 0; i < boxesNumber; i++) {
    container.insertAdjacentHTML("beforeend", htmlString);
  }

  // cards and images DOM
  const cards = document.querySelectorAll(".inner");
  const imgs = document.querySelectorAll("img");

  // making every IMG random

  imgs.forEach(
    (img) => (img.src = `icons/${Math.trunc(Math.random() * 6 + 1)}.svg`)
  );

  // event listener for flip
  cards.forEach((card) =>
    card.addEventListener("click", function () {
      this.classList.add("flip");
      // flip back

      setTimeout(() => {
        this.classList.remove("flip");
      }, 1000);
    })
  );
})();
