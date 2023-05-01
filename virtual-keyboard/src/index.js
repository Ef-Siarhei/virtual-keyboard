import buttons from '../js/objButtons.js';

let language;
const localHash = () => {
  language = (!sessionStorage.getItem('language')) ? 'en' : sessionStorage.getItem('language');
  return language;
};
localHash();

// add site icon
const head = document.querySelector('head');
const link = document.createElement('link');
link.rel = 'shortcut icon';
link.href = '../images/icon-keyboard.png';
head.append(link);

const body = document.querySelector('body');
body.className = 'body';
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

// set  Buttons Value
const setButtonsValue = (...args) => {
  const arrId = buttons.id;
  const keyboardDom = document.getElementsByClassName('keyboard__row');
  const a = args[0] ? args[0] : '';
  arrId.forEach((el, indexId) => {
    el.forEach((key, keyIndex) => {
      keyboardDom[indexId].childNodes[keyIndex].innerText = `${buttons[`${language + a}`][indexId][keyIndex]}`;
    });
  });
};

// create buttons
const createButtons = () => {
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
};
createButtons();

// добавить класс Active при нажатии на кнопку настоящей клавиатуры
const button = [...document.getElementsByClassName('keyboard__button')];

const addActive = (event) => {
  for (let i = 0; i < button.length; i += 1) {
    if (button[i].id === event.code) {
      button[i].classList.add('active');
    }
  }
};
const removeActive = (event) => {
  for (let i = 0; i < button.length; i += 1) {
    if (button[i].id === event.code) {
      button[i].classList.remove('active');
    }
  }
};

body.addEventListener('keydown', (event) => {
  addActive(event);
});

body.addEventListener('keyup', (event) => {
  removeActive(event);
});

// поймать событие нажатия кнопки настоящей клавиатуры и отменить действие
body.addEventListener('keydown', (e) => {
  e.preventDefault();
});

// Переключить язык ввода
const pressedButton = {};
onkeydown = (e) => {
  if (e.code === 'ControlLeft') { pressedButton[e.code] = e.code; }
  if (e.code === 'AltLeft') { pressedButton[e.code] = e.code; }

  if (pressedButton.ControlLeft === 'ControlLeft'
    && pressedButton.AltLeft === 'AltLeft') {
    if (language === 'en') {
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

const getTextarea = document.querySelector('.textarea');
// function remove symbol with help button backspace
const backspaceValue = () => {
  const indexSymbolBeforeCursor = getTextarea.selectionEnd - 1;
  const arrTextareaValue = textarea.value.split('');
  if (indexSymbolBeforeCursor >= 0) {
    arrTextareaValue.splice(indexSymbolBeforeCursor, 1);
    textarea.value = arrTextareaValue.join('');
    getTextarea.selectionEnd = indexSymbolBeforeCursor;
  }
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
  getTextarea.selectionEnd = indexSymbolAfterCursor + symbol.length;
};

const capsLock = () => {
  for (let i = 0; i < button.length; i += 1) {
    if (button[i].innerText.length === 1) {
      button[i].classList.toggle('upper-case');
    }
  }
  const CAPSLOCK = document.querySelector('#CapsLock');
  CAPSLOCK.classList.toggle('capsLock_active');
};

// ввод текста с клавиатуры
body.addEventListener('keydown', (event) => {
  textarea.focus();
  button.forEach((el) => {
    if (el.innerText.length === 1) {
      if (el.id === event.code) {
        inputValue(el.innerText);
      }
    }
  });
  switch (event.code) {
    case 'Tab':
      inputValue('    ');
      break;

    case 'CapsLock':
      capsLock();
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

// ввод текста мышкой
keyboard.addEventListener('click', (event) => {
  textarea.focus();

  button.forEach((el) => {
    if (el.innerText.length === 1) {
      if (el.id === event.target.id) {
        inputValue(el.innerText);
      }
    }
  });

  switch (event.target.id) {
    case 'Tab':
      inputValue('    ');
      break;

    case 'CapsLock':
      capsLock();
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
    shiftRight.classList.remove('active');
  }
});
