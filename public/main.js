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


function renderUserList() {
  let ul = document.querySelector('.userList');
  ul.innerHTML = '';

  userList.forEach(i => {
    ul.innerHTML += '<li>'+i+'</li>'
  });
};

// aqui entramos no chat quando digitamos o nome e apertamos enter
loginInput.addEventListener('keyup', (e) => {
  if(e.keyCode === 13 ){
    let name = loginInput.value.trim();
    if(name !== '') {
      userName = name;
      document.title = 'Chat ('+userName+')';

      socket.emit('join-request', userName);

    }
  }
});

// Quando o servidor emit um user-ok nos renderizamos a tela de chat e a lista de usuarios
socket.on('user-ok', (list) => {
  loginPage.style.display = 'none';
  chatPage.style.display = 'flex';

  textInput.focus();

  userList = list;
  renderUserList();
});
