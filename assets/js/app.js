'use strict';

new ClipboardJS('.lock-copy');

const digits = document.querySelector('.lock-code'),
    generate = document.querySelector('.lock-generate'),
        copy = document.querySelector('.lock-copy'),
     history = document.querySelector('.code-history');

const randNum = () => (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

const regenerateCodeHistory = (codesArr) => {
  // Delete code history
  while (history.firstChild) {
    history.removeChild(history.firstChild);
  }

  // Generate code history
  codesArr.reverse().forEach(num => {
    const li = document.createElement('li'),
    data = document.createTextNode(num);

    li.classList.add('code-item');
    li.appendChild(data);

    history.appendChild(li);
  });
}

generate.addEventListener('click', () => {
  let numArr;
  digits.textContent = randNum();

  if (localStorage.getItem('codes') === null) {
    numArr = [];
  } else {
    numArr = JSON.parse(localStorage.getItem('codes'));
  }

  numArr.push(digits.textContent);
  let codes = numArr.slice(-5);
  localStorage.setItem('codes', JSON.stringify(codes));
  regenerateCodeHistory(codes)
});

copy.addEventListener('click', () => {
  copy.textContent = 'Copied';

  setTimeout(() => {
    copy.textContent = 'Copy';
  }, 1250);
});

const listArr = JSON.parse(localStorage.getItem('codes'));

// Generate code history on page load
if (listArr != null) {
  regenerateCodeHistory(listArr);
}