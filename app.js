let startTime,
  elapsedTime = 0,
  timeInterval,
  isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const pointerBtn = document.getElementById("pointer");

function formatTime(time) {
  let date = new Date(time);
  let hours = date.getUTCHours();
  let min = date.getUTCMinutes();
  let sec = date.getUTCSeconds();
  let millisec = date.getUTCMilliseconds();

  if (hours > 0) {
    return console.log(`${min.toString().padStart(2, "0")}
    :${min.toString().padStart(2, "0")}
    :${sec.toString().padStart(2, "0")}
    :${millisec.toString().padStart(2, "0")}`);
  } else if (hours === 0 && min > 0) {
    return console.log(`${min.toString().padStart(2, "0")}
    :${sec.toString().padStart(2, "0")}
    :${millisec.toString().padStart(2, "0")}`);
  } else {
    return console.log(`${sec.toString().padStart(2, "0")}
    :${millisec.toString().padStart(2, "0")}`);
  }
}

function updateDisplay() {
  display.textcontent = formatTime(elapsedTime);

  const seconds = elapsedTime / 1000;
  const rotationDegree = (seconds % 60) * 6;
  pointer.style.transform = `translate(-50%) rotate(${rotationDegree}deg)`;
}
