const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.setAttribute('disabled', 'disabled');

let timerId = null;


startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopChangingBodyColor);



const randomColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


function changeBodyColor() {
    body.style.backgroundColor = randomColor();
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled', 'disabled');
    timerId = setInterval(() => {
        body.style.backgroundColor = randomColor();
    }, 1000);
};


function stopChangingBodyColor() {
    startBtn.removeAttribute('disabled', 'disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    clearInterval(timerId)
};