//Poor Man's Parallax effect

const numSteps = 500.0;
let target;
let eff;
let parallaxEffect;
let prevRatio = 0.0;
let incXPos = "bottom ratio right 50%";
let decXPos = "bottom ratio right 50%";

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    eff = Math.floor(Math.abs(parseInt(parallaxEffect) - (100*entry.intersectionRatio)));
    if (entry.intersectionRatio > prevRatio) {
        entry.target.style.backgroundPosition = incXPos.replace("ratio", `${eff}px`);
      } else {
        entry.target.style.backgroundPosition = decXPos.replace("ratio", `${eff}px`);
      } 
      prevRatio = entry.intersectionRatio;
  });
}

function buildThresholdList() {
    let thresholds = [];
    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  };


function createObserver() {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(target);
}

//Grab the target and call the function
window.addEventListener(
    "load",
    (event) => {
      target = document.querySelector("#sect1");
      target.style.backgroundPosition = "bottom 50% right 50%";
      parallaxEffect = target.getAttribute('data-xAmt');
      createObserver();
    },
    false
  );
