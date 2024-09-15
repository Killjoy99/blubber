function startChat() {
    const username = document.getElementById('username').value;
    if (username) {
        // Redirect to the matching screen with the username in the query string
        window.location.href = `/matching?username=${encodeURIComponent(username)}`;
    } else {
        alert('Please enter a username.');
    }
}

function listGroups() {
    const username = document.getElementById('username').value;
    if (username) {
        // Redirect to the groups page with the username in the query string
        window.location.href = `/groups?username=${encodeURIComponent(username)}`;
    } else {
        alert('Please enter a username.');
    }
}
