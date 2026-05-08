const users = {
  "Lohanna": "157",
  "Clara": "cavalo",
  "Grazy": "123",
  "Kleber": "babado",
  "Kalleo": "indio",
  "mimmarcelo": "Teste123"
};

let currentUser = localStorage.getItem('currentUser') || "";
let currentChat = "chat1";

let chats = JSON.parse(localStorage.getItem('chats')) || {
  chat1: [
    { user: "Lohanna", text: "Oh professor socorrooooo"},
    { user: "Clara",   text: "Sexta vai ter orientação?"},
    { user: "Grazy",   text: "Tem que ver se eu quero"},
    { user: "Kleber",  text: "Só posso ás 7h"}
  ],
  chat2: [
    { user: "Kalleo", text: "Hoje tem aula de programação?"},
    { user: "Miguel", text: "Tem não, man"}
  ],
  chat3: [
    { user: "Clara", text: "Viram o babado hoje no cc?"},
    { user: "Kleber", text: "e eu num vi menina"}
  ]
};

function login() {
  const u = document.getElementById('user').value.trim();
  const p = document.getElementById('senha').value;

  if (users[u] && users[u] === p) {
    localStorage.setItem('currentUser', u);
    window.location.href = "chat.html";
  } else {
    alert('Login inválido. Verifique usuário e senha.');
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = "index.html";
}

function selectChat(chat) {
  currentChat = chat;
  renderMessages(chat);
}

function renderMessages(chat) {
  const container = document.getElementById("messages");
  container.innerHTML = "";

  chats[chat].forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(msg.user === currentUser ? "eu" : "outro");
    div.innerHTML = `
      <span class="msg-name">${msg.user}</span>
      ${msg.text}
    `;
    container.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}

function sendMsg() {
  const input = document.getElementById("msg");
  const text = input.value.trim();
  if (text === "") return;

  chats[currentChat].push({ user: currentUser, text: text });
  localStorage.setItem('chats', JSON.stringify(chats));
  input.value = "";
  renderMessages(currentChat);
}

const msgInput = document.getElementById("msg");
if (msgInput) {
  msgInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMsg();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("messages")) {
    renderMessages(currentChat);
  }
});