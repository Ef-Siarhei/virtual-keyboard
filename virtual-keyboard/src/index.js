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
  Для переключения языка комбинация: левый <b>Shift + Alt</b>.
</p>
`;
wrapContent.insertAdjacentHTML('beforeend', html);

// create buttons
const language = 'en';
const buttons = {
  en: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'],
  ],
  ru: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'],
  ],
  id: [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
  ],
};

function createButtons() {
  const arr = buttons[language];

  arr.forEach((el, index) => {
    const elRow = document.createElement('div');
    elRow.classList.add(`row${index + 1}`);
    elRow.classList.add('keyboard__row');

    el.forEach((key, keyIndex) => {
      const keyElement = document.createElement('button');
      keyElement.innerText = `${key}`;
      // keyElement.innerHTML = `${key}`;
      keyElement.id = `${buttons.id[index][keyIndex]}`;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__button');
      elRow.append(keyElement);
    });
    keyboard.append(elRow);
  });
}
createButtons();

// добавить класс Active при нажатии на кнопку настоящей клавиатуры
const button = document.getElementsByClassName('keyboard__button');

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
  // привязать настоящую клавиатуру к виртуальной, добавить Tab
  textarea.focus();
  // button Tab
  if (event.key == 'Tab') {
    textarea.value += '    ';
  }
  // CapsLock
  if (event.key == 'CapsLock') {
    for (let i = 0; i < button.length; i++) {
      if (button[i].innerText.length == 1) {
        button[i].classList.toggle('upper-case');
      }
    }
  }
});


// Переключить язык ввода ----------- не доделал
const pressedButton = {};

onkeydown = (e) => {
  if (e.code === 'ShiftLeft') { pressedButton[e.code] = e.code; }
  if (e.code === 'AltLeft') { pressedButton[e.code] = e.code; }

  if (pressedButton.ShiftLeft == 'ShiftLeft'
    && pressedButton.AltLeft == 'AltLeft') {
    console.log(pressedButton);
  }
};

onkeyup = (e) => {
  if (e.code === 'ShiftLeft') { delete pressedButton[e.code]; }
  if (e.code === 'AltLeft') { delete pressedButton[e.code]; }
};




// textarea.addEventListener('click', () => {
//   textarea.value = textarea.textContent;
// });

// body.addEventListener('keydown', (event) => {
//   textarea.focus();
//   if (event.key == 'Tab') {
//     textarea.value += '    ';
//     // textarea.textContent += '    ';
//     // event.preventDefault();
//   }

//   // if (event.code == 'KeyQ') {
//   //   textarea.innerHTML += '    ';
//   // }
//   // if (event.key == 'Backspace') {
//   //   textarea.value = textarea.value.substring(0, textarea.value.length - 1);
//   // }


//   // Tab
//   // if (event.key == 'Tab') { textarea.innerHTML += '    '; } else {
//   //   textarea.innerHTML += event.key;
//   // }

//   // if (event.key.length <= 1) { textarea.value += event.key; }
//   // console.dir(textarea.innerHTML);
//   // textarea.innerHTML += event.key;
//   // console.dir(event.key);
// });

// // textarea.addEventListener('click', () => {
// //   textarea.value = textarea.textContent;
// // });

