'use strict';

new ClipboardJS('.lock-copy');

const digits = document.querySelector('.lock-code'),
    generate = document.querySelector('.lock-generate'),
        copy = document.querySelector('.lock-copy'),
     history = document.querySelector('.code-history');

const randNum = () => (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

generate.addEventListener('click', (e) => {

  let numArr;
  digits.textContent = randNum();

  if (localStorage.getItem('codes') === null) {
    numArr = [];
  } else {
    numArr = JSON.parse(localStorage.getItem('codes'));
  }

  numArr.push(digits.textContent);
  localStorage.setItem('codes', JSON.stringify(numArr.slice(-5)));

  e.preventDefault();
});

copy.addEventListener('click', (e) => {

  copy.textContent = 'Copied';

  setTimeout(() => {
    copy.textContent = 'Copy';
  }, 1250);

  e.preventDefault();
});

const listArr = JSON.parse(localStorage.getItem('codes'));

if (listArr != null) {
  listArr.reverse().forEach((num) => {

    const li = document.createElement('li'),
    data = document.createTextNode(num);

    li.classList.add('code-item');
    li.appendChild(data);

    history.appendChild(li);
  });
}