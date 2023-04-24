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
const instructionOne = document.createElement('p');
instructionOne.className = 'instruction';
instructionOne.innerText = 'Клавиатура создана в операционной системе Windows.';
wrapContent.append(instructionOne);

// instruction
const instructionTwo = document.createElement('p');
instructionTwo.className = 'instruction';
instructionTwo.innerText = 'Для переключения языка комбинация: левый Shift + Alt';
wrapContent.append(instructionTwo);