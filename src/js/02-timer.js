import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
startBtn.disabled = true;
let intervalId;
let startTime;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        dateVerification(selectedDates)
    },
};
flatpickr(input, options);


startBtn.addEventListener('click', startCountdown)

function dateVerification(date) {
    

    let selectedDate = date[0].getTime();
    let currentDate = Date.now();

    if (currentDate >= selectedDate) {
        return Notify.failure("Please choose a date in the future")
    };
    

    startBtn.disabled = false;
    startTime = selectedDate;
};

function startCountdown() {
    

    intervalId = setInterval(() => {
        let currentTime = Date.now();
        if (startTime <= currentTime) {
      clearInterval(intervalId);
      return;}
        
        const remainingTime = convertMs(startTime - currentTime);
        const validTime = addLeadingZero(remainingTime);
        parceResult(validTime)
    }, 1000);

    startBtn.disabled = true;

};


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };

};


function addLeadingZero({ days, hours, minutes, seconds }) {
    const day = String(days).padStart(2, '0');
    const hour = String(hours).padStart(2, '0');
    const minute = String(minutes).padStart(2, '0');
    const second = String(seconds).padStart(2, '0');

    return { day, hour, minute, second }
};

function parceResult({ day, hour, minute, second }) {
    const dayField = document.querySelector('span[data-days]');
    const hourField = document.querySelector('span[data-hours]');
    const minuteField = document.querySelector('span[data-minutes]');
    const secondField = document.querySelector('span[data-seconds]');

    dayField.textContent = day;
    hourField.textContent = hour;
    minuteField.textContent = minute;
    secondField.textContent = second;
};