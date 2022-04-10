const socket = io();

socket.on('connect', () => {
  console.log('connect client');
});

let userName = '';
let userList = [];

let loginPage = document.querySelector('#loginPage');
let chatPage = document.querySelector('#chatPage');

let loginInput = document.querySelector('#loginNameInput');
let textInput = document.querySelector('#chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';


loginInput.addEventListener('keyup', (e) => {
  if(e.keyCode === 13 ){
    let name = loginInput.value.trim();
    if(name !== '') {
      userName = name;
      document.title = 'Chat ('+userName+')';
    }
  }
})
