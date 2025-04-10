// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA-API-KEY",
    authDomain: "SEU-PROJETO.firebaseapp.com",
    databaseURL: "https://SEU-PROJETO.firebaseio.com",
    projectId: "SEU-PROJETO",
    storageBucket: "SEU-PROJETO.appspot.com",
    messagingSenderId: "SEU-ID",
    appId: "SEU-APP-ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Função para enviar mensagens
document.getElementById("send-button").addEventListener("click", () => {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message !== "") {
        db.ref("messages").push({
            text: message,
            timestamp: Date.now()
        });

        messageInput.value = ""; // Limpar campo de entrada
    }
});

// Função para exibir as mensagens na tela
db.ref("messages").on("child_added", (snapshot) => {
    const messageData = snapshot.val();
    const messageElement = document.createElement("div");
    messageElement.textContent = messageData.text;
    document.getElementById("messages").appendChild(messageElement);
});
