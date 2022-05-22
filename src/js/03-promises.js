
import Notiflix from 'notiflix';

const refs= {
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit)


function onSubmit(evt) {
  evt.preventDefault();
  const amount = Number(refs.amount.value);
  const delayStep = Number(refs.delayStep.value);
  let delay=Number(refs.firstDelay.value);
    for (let i = 0; i < amount; i += 1) {
      
      createPromise(i + 1, delay)
        .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay}) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += delayStep;
    }
  
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      }
      rejected({ position, delay })
    }, delay)
  });
}

