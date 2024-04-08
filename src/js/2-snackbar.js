import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const radio = document.querySelector('fieldset');

let selectedState;

form.addEventListener('submit', handleSubmit);
radio.addEventListener('change', handleRadioChange);

function handleSubmit(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const prom = creatPromis(delay, selectedState);
  prom.then(success).catch(notSuccess);
  form.reset();
  return delay;
}

function handleRadioChange(event) {
  const b = event.target;
  selectedState = b.value;
  return selectedState;
}

function notSuccess(delay) {
  iziToast.error({
    icon: 'null',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topCenter',
  });
}

function success(delay) {
  iziToast.success({
    icon: 'null',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topCenter',
  });
}

function creatPromis(delay, text) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (text === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  return promise;
}
