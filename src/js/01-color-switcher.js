
const StartBtnEl = document.querySelector('[data-start]');
const StopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

StartBtnEl.addEventListener('click', onStart);
StopBtnEl.addEventListener('click', onStop);

function onStart() {
    StartBtnEl.disabled = true;
    bodyEl.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
    StartBtnEl.disabled = false;
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}