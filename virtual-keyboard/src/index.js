import { buttons } from '../js/objButtons.js'

let language = 'en';

/* eslint-disable no-undef */
const body = document.querySelector('body');

// создать оболочку для всего контента
const wrapContent = document.createElement('div');
wrapContent.className = 'wrapContent';
body.prepend(wrapContent);

// title
const title = document.createElement('h1');
title.className = 'title';
title.innerHTML = 'Virtual keyboard';
wrapContent.append(title);

// textarea
const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.setAttribute('readonly', '');
wrapContent.append(textarea);

// keyboard
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
wrapContent.append(keyboard);

// instruction1
const html = `
<p class='instruction'>
  Клавиатура создана в операционной системе <b>Windows</b>.<br>
  Для переключения языка комбинация: левый <b>Shift + Alt</b>.
</p>
`;
wrapContent.insertAdjacentHTML('beforeend', html);


// create buttons
function createButtons() {
  const arr = buttons[language];

  arr.forEach((el, index) => {
    const elRow = document.createElement('div');
    elRow.classList.add(`row${index + 1}`);
    elRow.classList.add('keyboard__row');

    el.forEach((key, keyIndex) => {
      const keyElement = document.createElement('button');
      keyElement.id = `${buttons.id[index][keyIndex]}`;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__button');
      elRow.append(keyElement);
    });

    keyboard.append(elRow);
  });

  setButtonsValue();
}
createButtons();


// set  Buttons Value
function setButtonsValue() {
  const arrId = buttons.id;
  let keyboardDom = document.getElementsByClassName('keyboard__row');

  arrId.forEach((el, indexId) => {
    el.forEach((key, keyIndex) => {
      keyboardDom[indexId].childNodes[keyIndex].innerText = `${buttons[language][indexId][keyIndex]}`
    });
  });
}


// добавить класс Active при нажатии на кнопку настоящей клавиатуры
const button = [...document.getElementsByClassName('keyboard__button')];


body.addEventListener('keydown', (event) => {
  for (let i = 0; i < button.length; i++) {
    if (button[i].id == event.code) {
      button[i].classList.add('active');
    }
  }
});

body.addEventListener('keyup', (event) => {
  for (let i = 0; i < button.length; i++) {
    if (button[i].id == event.code) {
      button[i].classList.remove('active');
    }
  }
});

// отключить Tab перемещение с клавиатуры
window.onkeydown = (evt) => {
  if (evt.key == 'Tab') {
    evt.preventDefault();
  }
};


body.addEventListener('keydown', (event) => {
  // textarea.focus();

  button.forEach((el) => {
    if (el.innerText.length == 1) {
      if (el.id == event.code) {
        textarea.value += el.innerText
      }
    }
  })

  switch (event.code) {
    case 'Tab':
      textarea.value += '    ';
      break;

    case 'CapsLock':
      for (let i = 0; i < button.length; i++) {
        if (button[i].innerText.length == 1) {
          button[i].classList.toggle('upper-case');
        }
      }
      break;

    case 'Space':
      textarea.value += '  ';
      break;

    case 'Enter':
      textarea.value += "\n";
      break;

    case 'Backspace':
      textarea.value = textarea.value.substring(0, textarea.value.length - 1);
      break;
  }



});


// Переключить язык ввода
const pressedButton = {};
onkeydown = (e) => {
  if (e.code === 'ShiftLeft') { pressedButton[e.code] = e.code; }
  if (e.code === 'AltLeft') { pressedButton[e.code] = e.code; }

  if (pressedButton.ShiftLeft == 'ShiftLeft'
    && pressedButton.AltLeft == 'AltLeft') {
    if (language == 'en') { language = 'ru' } else {
      language = 'en'
    }
    setButtonsValue()
  }
  onkeyup = (e) => {
    if (e.code === 'ShiftLeft') { delete pressedButton[e.code]; }
    if (e.code === 'AltLeft') { delete pressedButton[e.code]; }
  };
};



keyboard.addEventListener('click', (event) => {
  console.log(event.target.id);
  button.forEach((el) => {
    if (el.innerText.length == 1) {
      if (el.id == event.target.id) {
        textarea.value += el.innerText
        console.log(el.innerText);
      }
    }
  })

  if (event.target.id == 'Tab') {
    textarea.value += '    ';
  }


  if (event.target.id == 'CapsLock') {
    for (let i = 0; i < button.length; i++) {
      if (button[i].innerText.length == 1) {
        button[i].classList.toggle('upper-case');
      }
    }
  }

});

