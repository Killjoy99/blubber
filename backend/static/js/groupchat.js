const groupId = new URLSearchParams(window.location.search).get('group_id');

function sendMessage() {
    const message = document.getElementById('message').value;
    if (message) {
        // Replace with actual WebSocket or API call to send message
        const chatWindow = document.getElementById('chat-window');
        const p = document.createElement('p');
        p.textContent = `You: ${message}`;
        chatWindow.appendChild(p);
        document.getElementById('message').value = '';
    }
}

// Simulated chat messages; replace with WebSocket or API calls
const initialMessages = [
    { user: 'JohnDoe', text: 'Hello everyone!' },
    { user: 'JaneDoe', text: 'Hi there!' }
];

function loadMessages() {
    const chatWindow = document.getElementById('chat-window');
    initialMessages.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = `${msg.user}: ${msg.text}`;
        chatWindow.appendChild(p);
    });
}

window.onload = loadMessages;
