// I.  Start game
const startButton = document.getElementById("startButton");
let isGameOn = false;
startButton.addEventListener("click", () => {
  // a. Randomly assign life/death state to each square.
  if (isGameOn === true) {
    // Only if game isn't already running.
  } else {
    const grid = document.getElementsByClassName("grid");
    for (element of grid) {
      const randomValue = Math.round(Math.random());
      if (randomValue === 1) {
        element.style.backgroundColor = "black";
      }
    }
  }
  isGameOn = true;
});

//Run generation loop (delay via setInterval)
function incrementOneGeneration() {
  console.log("one generation ahead");
  // 1. Check grid for life/death,
  // 2. Do color updates
}

setInterval(incrementOneGeneration, 3000);

/* let el = document.getElementsByTagName("div")[2]
console.log(el);
el.style.backgroundColor = "red"; */
