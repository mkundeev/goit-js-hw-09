import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDateEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');

let timerData = 0;
let timerMs = 0;
let timerId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
  },
};

const calendar = flatpickr(inputDateEl, options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStart);


calendar.config.onClose.push(function (selectedDates) {
    startBtn.disabled = false;
    inputDateEl.disabled = true;
    const currentDate = new Date();

    if (currentDate > selectedDates[0]) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startBtn.disabled = true;   
        inputDateEl.disabled = false;
    };

    timerMs = selectedDates[0].getTime();
    
});


function onStart() {
    startBtn.disabled = true;

     timerId = setInterval(() => {
         const currentDate = new Date();
         timerData = convertMs(timerMs - currentDate.getTime());

         for (let key of Object.keys(timerData)){
            timerEl.querySelector(`[data-${[key]}]`).textContent = timerData[key];
         };

         if ((timerMs - currentDate.getTime()) < 1000){
            clearInterval(timerId);
         };

     }, 1000);
     
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
}