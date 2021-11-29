 import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');



form.addEventListener('submit', handleBtnSubmit);

function handleBtnSubmit(event) {
  event.preventDefault(event);

  const delay = Number(document.querySelector('input[name="delay"]').value);
  const step = Number(document.querySelector('input[name="step"]').value);
  const position = Number(document.querySelector('input[name="amount"]').value);

  let delayTime = delay;

for (let i = 1; i <= position; i++) {
createPromise(i, delayTime)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  
  delayTime += step;
  
  };
};
 



function createPromise(position, delay) {
 
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
       if (shouldResolve) {
         resolve({position, delay});
    } 
      reject({position, delay});

    }, delay);
   
  })
  return promise
};


