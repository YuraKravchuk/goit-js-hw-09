import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      refs.startBtn.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    timeDifference = selectedDates[0].getTime() - options.defaultDate.getTime();
    return { timeDifference };
  },
};

refs.startBtn.setAttribute('disabled', '');

flatpickr(refs.input, options);

let timeDifference = 0;

let timerId = null;
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  let timLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  convertMs(timeDifference);
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    timLeft.days = days;
    timLeft.hours = hours;
    timLeft.minutes = minutes;
    timLeft.seconds = seconds;

    return { timLeft };
  }
  timerId = setInterval(() => {
    if (timeDifference > 1000) {
      timeDifference -= 1000;

      convertMs(timeDifference);
      function addLeadingZero(value) {
        refs.days.textContent = `${value.days.toString().padStart(2, '0')}`;
        refs.hours.textContent = `${value.hours.toString().padStart(2, '0')}`;
        refs.minutes.textContent = `${value.minutes
          .toString()
          .padStart(2, '0')}`;
        refs.seconds.textContent = `${value.seconds
          .toString()
          .padStart(2, '0')}`;
      }
      addLeadingZero(timLeft);
    } else {
      clearInterval(timerId);
      Notiflix.Notify.success('Time is over');
    }
  }, 1000);
}
