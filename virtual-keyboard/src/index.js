import { buttons } from '../js/objButtons.js';


let language;
function localHash() {
  language = (!sessionStorage.getItem('language')) ? 'en' : sessionStorage.getItem('language');
  return language;
}
localHash();

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
wrapContent.append(textarea);

// keyboard
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
wrapContent.append(keyboard);

// instruction1
const html = `
<p class='instruction'>
  Клавиатура создана в операционной системе <b>Windows</b>.<br>
  Для переключения языка комбинация: левый <b>Ctrl + Alt</b>.
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
function setButtonsValue(...args) {
  const arrId = buttons.id;
  const keyboardDom = document.getElementsByClassName('keyboard__row');
  const a = args[0] ? args[0] : '';
  arrId.forEach((el, indexId) => {
    el.forEach((key, keyIndex) => {
      keyboardDom[indexId].childNodes[keyIndex].innerText = `${buttons[`${language + a}`][indexId][keyIndex]}`;
    });
  });
}


// добавить класс Active при нажатии на кнопку настоящей клавиатуры
const button = [...document.getElementsByClassName('keyboard__button')];

function addActive(event) {
  for (let i = 0; i < button.length; i++) {
    if (button[i].id == event.code) {
      button[i].classList.add('active');
    }
  }
}
function removeActive(event) {
  for (let i = 0; i < button.length; i++) {
    if (button[i].id == event.code) {
      button[i].classList.remove('active');
    }
  }
}

body.addEventListener('keydown', (event) => {
  addActive(event);
});

body.addEventListener('keyup', (event) => {
  removeActive(event);
});

// поймать событие нажатия кнопки и отменить действие
body.addEventListener('keydown', (e) => {
  e.preventDefault();
});

// ввод текста с клавиатуры
body.addEventListener('keydown', (event) => {
  textarea.focus();
  button.forEach((el) => {
    if (el.innerText.length == 1) {
      if (el.id == event.code) {
        inputValue(el.innerText);
      }
    }
  });
  switch (event.code) {
    case 'Tab':
      inputValue('    ');
      break;

    case 'CapsLock':
      for (let i = 0; i < button.length; i++) {
        if (button[i].innerText.length == 1) {
          button[i].classList.toggle('upper-case');
        }
      }
      break;

    case 'Space':
      inputValue(' ');
      break;

    case 'Enter':
      inputValue('\n');
      break;

    case 'Backspace':
      backspaceValue();
      break;

    case 'Delete':
      deleteValue();
      break;

    default:
  }
});


// Переключить язык ввода
const pressedButton = {};
onkeydown = (e) => {
  if (e.code === 'ControlLeft') { pressedButton[e.code] = e.code; }
  if (e.code === 'AltLeft') { pressedButton[e.code] = e.code; }

  if (pressedButton.ControlLeft == 'ControlLeft'
    && pressedButton.AltLeft == 'AltLeft') {
    if (language == 'en') {
      sessionStorage.setItem('language', 'ru');
    } else {
      sessionStorage.setItem('language', 'en');
    }

    localHash();
    setButtonsValue();
  }

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') { setButtonsValue('-Shift'); }
};

onkeyup = (e) => {
  if (e.code === 'ControlLeft') { delete pressedButton[e.code]; }
  if (e.code === 'AltLeft') { delete pressedButton[e.code]; }

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') { setButtonsValue(); }
};


// ввод текста мышкой
keyboard.addEventListener('click', (event) => {
  textarea.focus();
  button.forEach((el) => {
    if (el.innerText.length == 1) {
      if (el.id == event.target.id) {
        inputValue(el.innerText);
      }
    }
  });

  switch (event.target.id) {
    case 'Tab':
      inputValue('    ');
      break;

    case 'CapsLock':
      for (let i = 0; i < button.length; i++) {
        if (button[i].innerText.length == 1) {
          button[i].classList.toggle('upper-case');
        }
      }
      break;

    case 'Space':
      inputValue(' ');
      break;

    case 'Enter':
      inputValue('\n');
      break;

    case 'Backspace':
      backspaceValue();
      break;

    case 'Delete':
      deleteValue();
      break;

    default:
  }
});

const shiftLeft = document.querySelector('#ShiftLeft');
const shiftRight = document.querySelector('#ShiftRight');
keyboard.addEventListener('click', (event) => {
  if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
    setButtonsValue('-Shift');
    event.target.classList.add('active');
  } else if ((event.target.id !== 'ShiftLeft' || event.target.id !== 'ShiftRight')
    && (shiftLeft.classList.contains('active') || shiftRight.classList.contains('active'))) {
    setButtonsValue();
    shiftLeft.classList.remove('active');
  }
});



const getTextarea = document.querySelector('.textarea');

// function remove symbol with help button backspace
const backspaceValue = () => {
  const indexSymbolBeforeCursor = getTextarea.selectionEnd - 1;
  const arrTextareaValue = textarea.value.split('');

  arrTextareaValue.splice(indexSymbolBeforeCursor, 1);
  textarea.value = arrTextareaValue.join('');
  getTextarea.selectionEnd = indexSymbolBeforeCursor;
};

// function remove symbol with button delete
const deleteValue = () => {
  const indexSymbolAfterCursor = getTextarea.selectionEnd;
  const arrTextareaValue = textarea.value.split('');

  arrTextareaValue.splice(indexSymbolAfterCursor, 1).join('');
  textarea.value = arrTextareaValue.join('');
  getTextarea.selectionEnd = indexSymbolAfterCursor;
};

// function add symbol when pressing buttons
const inputValue = (symbol) => {
  const indexSymbolAfterCursor = getTextarea.selectionEnd;
  const arrTextareaValue = textarea.value.split('');

  arrTextareaValue.splice(indexSymbolAfterCursor, 0, symbol).join('');
  textarea.value = arrTextareaValue.join('');
  getTextarea.selectionEnd = indexSymbolAfterCursor + 1;
};