// Matching screen js

const username = new URLSearchParams(window.location.search).get('username');
let currentMatch = null;
let friends = [];

// Function to update match information and show chat area
function updateMatchInfo(match) {
    document.getElementById('match-info').innerHTML = `
        <p>Matched with: ${match.username}</p>
        <p>Gender: ${match.gender}</p>
    `;
    currentMatch = match;
    showChatArea(); // Display the chat area when a match is found
}

// Simulate finding a new match (replace with actual API call)
function findNewMatch() {
    const newMatch = { username: 'JohnDoe', gender: 'Male' }; // Placeholder match data
    updateMatchInfo(newMatch);
}

// Function to skip current match and find a new one
function skipMatch() {
    // Add logic to notify the server or API that the current match is being skipped
    findNewMatch();
}

// Function to add the current match as a friend
function addAsFriend() {
    if (currentMatch) {
        // Add friend to the friends list
        friends.push(currentMatch);
        updateFriendsList();
        alert(`Added ${currentMatch.username} as a friend.`);
    } else {
        alert('No match to add as a friend.');
    }
}

// Function to update the friends list sidebar
function updateFriendsList() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';
    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend.username;
        friendsList.appendChild(li);
    });
}

// Function to show the chat area
function showChatArea() {
    document.getElementById('chat-area').style.display = 'block';
}

// Function to handle sending a message
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    if (message.trim() !== '') {
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
        // Here you would also send the message to the server
    }
}

// Event listener for sending a message on Enter key press
document.getElementById('message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Placeholder WebSocket integration
// You need to replace this with your actual WebSocket implementation
const ws = new WebSocket('wss://your-websocket-url');

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.type === 'message') {
        // Display received message in chat area
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = data.message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }
};

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    if (message.trim() !== '') {
        ws.send(JSON.stringify({ type: 'message', content: message }));
        messageInput.value = '';
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }
}
