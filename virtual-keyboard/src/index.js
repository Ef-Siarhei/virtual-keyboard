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
function createButtons() {
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
  };
  const arr = buttons[language];

  arr.forEach((el, index) => {
    const elRow = document.createElement('div');
    elRow.classList.add(`row${index + 1}`);
    elRow.classList.add('keyboard__row');

    el.forEach((key) => {
      const keyElement = document.createElement('button');
      keyElement.innerHTML = `${key}`;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__button');
      elRow.append(keyElement);
    });
    keyboard.append(elRow);
  });

  console.log(arr);
}
createButtons();
