'use strict';

new ClipboardJS('.lock-copy');

const code = document.querySelector('.lock-code'),
genBtn = document.querySelector('.lock-generate'),
history = document.querySelector('.code-history');

const randNum = () => (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

genBtn.addEventListener('click', (e) => {
  code.textContent = randNum();

  let numArr; 

  if (localStorage.getItem('codes') === null) {
    numArr = [];
  } else {
    numArr = JSON.parse(localStorage.getItem('codes'));
  }

  numArr.push(code.textContent);
  localStorage.setItem('codes', JSON.stringify(numArr.slice(-5)));

  e.preventDefault();
});

const listArr = JSON.parse(localStorage.getItem('codes'));

if (listArr != null) {
  listArr.reverse().forEach((num) => {
    const li = document.createElement('li');
    const data = document.createTextNode(num);
    li.appendChild(data);
    history.appendChild(li);
  });
}

