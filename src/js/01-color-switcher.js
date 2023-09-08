const start = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let time = null;
stopBtn.disabled = true;

start.addEventListener('click', () => {
  time = setInterval(() => {
    start.disabled = true;
    stopBtn.disabled = !true;
    body.style.background = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(time);
  stopBtn.disabled = true;
  start.disabled = !true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
