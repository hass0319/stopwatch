let startTime,
  elapsedTime = 0,
  timerInterval,
  isRunning = false,
  lapCount = 1;

const display = document.getElementById("display"),
  startStopBtn = document.getElementById("startStop"),
  resetBtn = document.getElementById("reset"),
  lapBtn = document.getElementById("lapBtn"),
  pointer = document.getElementById("pointer");

function formatTime(time) {
  let date = new Date(time),
    hours = date.getUTCHours(),
    min = date.getUTCMinutes(),
    sec = date.getUTCSeconds(),
    millisec = Math.floor(date.getUTCMilliseconds() / 10);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${millisec
      .toString()
      .padStart(2, "0")}`;
  } else if (min > 0) {
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}.${millisec.toString().padStart(2, "0")}`;
  } else {
    return `${sec.toString().padStart(2, "0")}.${millisec
      .toString()
      .padStart(2, "0")}`;
  }
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);

  const seconds = elapsedTime / 1000;
  const rotationDegree = (seconds % 60) * 6;
  pointer.style.transform = `translateX(-50%) rotate(${rotationDegree}deg)`;
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
    startStopBtn.textContent = "Stop";
    startStopBtn.style.width = "80px";
    resetBtn.style.display = "flex";
    lapBtn.style.display = "flex";
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = "Start";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;

  updateDisplay();

  startStopBtn.textContent = "Start";
  startStopBtn.style.width = "200px";
  resetBtn.style.display = "none";
  lapBtn.style.display = "none";
  pointer.style.transform = "translateX(-50%) rotate(0deg)";
  lapCount = 1;
  document.getElementById("laper").innerHTML = "";
}

function newLap() {
  const laper = document.getElementById("laper");
  let listBox = document.querySelector(".list-box");

  if (!listBox) {
    listBox = document.createElement("ul");
    listBox.className = "list-box";
    laper.appendChild(listBox);
  }

  const lapLine = document.createElement("li");
  lapLine.className = "lap";
  lapLine.textContent = `Lap ${lapCount++} =>  ${formatTime(elapsedTime)}`;

  listBox.insertBefore(lapLine, listBox.firstChild);
}

startStopBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", newLap);

updateDisplay();
