const screens = {
  start: document.getElementById("start-screen"),
  level1: document.getElementById("level-1"),
  level2: document.getElementById("level-2"),
  level3: document.getElementById("level-3"),
  win: document.getElementById("win-screen")
};


function showScreen(screen) {
  Object.values(screens).forEach((element) => {
    element.classList.remove("active");
  });

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* START */

document
  .getElementById("start-btn")
  .addEventListener("click", () => {
    showScreen(screens.level1);
    startHeartGame();
  });


/* LEVEL 1  */

const heartGame = document.getElementById("heart-game");
const heartCount = document.getElementById("heart-count");

let caught = 0;


function randomPosition() {
  const padding = 20;

  const width = heartGame.clientWidth - 70;

  const height = heartGame.clientHeight - 95;

  return {
    left: Math.max(
      padding,
      Math.random() * Math.max(width, padding)
    ),

    top: Math.max(
      75,
      60 + Math.random() * Math.max(height, 100)
    )
  };
}


function makeHeart() {
  const heart = document.createElement("button");

  heart.type = "button";

  heart.className = "heart";

  heart.textContent = "❤️";

  heart.setAttribute(
    "aria-label",
    "Catch heart"
  );

  const position = randomPosition();

  heart.style.left = `${position.left}px`;

  heart.style.top = `${position.top}px`;


  heart.addEventListener(
    "click",
    () => {
      heart.remove();

      caught++;

      heartCount.textContent = `${caught} / 7`;


      if (caught >= 7) {

        setTimeout(() => {
          showScreen(screens.level2);
        }, 450);

      } else {

        makeHeart();

      }
    },
    { once: true }
  );


  heartGame.appendChild(heart);
}


function startHeartGame() {
  caught = 0;

  heartCount.textContent = "0 / 7";

  heartGame
    .querySelectorAll(".heart")
    .forEach((heart) => heart.remove());


  for (let i = 0; i < 3; i++) {
    makeHeart();
  }
}


/* LEVEL 2 */

document
  .querySelectorAll("#level-2 .choice")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const result =
        document.getElementById("choice-result");

      const correct =
        button.dataset.correct === "true";


      document
        .querySelectorAll("#level-2 .choice")
        .forEach((button) => {
          button.classList.remove(
            "wrong",
            "selected"
          );
        });


      if (correct) {

        button.classList.add("selected");

        result.textContent =
          "Correct. Finally, a doctor who understands medicine ❤️";


        setTimeout(() => {
          showScreen(screens.level3);
        }, 900);

      } else {

        button.classList.add("wrong");

        result.textContent =
          "WRONG TRY AGAIN";

      }
    });
  });


/* LEVEL 3 */

document
  .querySelectorAll("#level-3 .choice")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const result =
        document.getElementById("final-result");

      const correct =
        button.dataset.final === "true";


      document
        .querySelectorAll("#level-3 .choice")
        .forEach((button) => {
          button.classList.remove(
            "wrong",
            "selected"
          );
        });


      if (correct) {

        button.classList.add("selected");

        result.textContent =
          "GOOD. Now you're ready for your surgery. ❤️";


        setTimeout(() => {
          showScreen(screens.win);
        }, 1000);

      } else {

        button.classList.add("wrong");

        result.textContent =
          "Absolutely NOT Please try again.";

      }
    });
  });


/* PLAY AGAIN */

document
  .getElementById("restart-btn")
  .addEventListener("click", () => {

    showScreen(screens.start);

  });