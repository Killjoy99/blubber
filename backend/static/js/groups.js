// Fetch and display groups list
function loadGroups() {
    fetch('/groups') // Update to match the FastAPI route
        .then(response => response.json())
        .then(data => {
            const groupsList = document.getElementById('groups-list');
            groupsList.innerHTML = '';
            data.groups.forEach(group => {
                const li = document.createElement('li');
                li.textContent = group.name;
                li.addEventListener('click', () => joinGroup(group.id));
                groupsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching groups:', error));
}

// Function to handle joining a group
function joinGroup(groupId) {
    // Add logic to join the group
    console.log('Joining group:', groupId);
    // For example, redirect to a group chat page or update the UI
}

// Function to create a new group
function createGroup() {
    const groupName = prompt('Enter the name of the new group:');
    if (groupName) {
        fetch('/api/groups', { // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: groupName }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Group created successfully!');
                loadGroups(); // Reload the groups list
            } else {
                alert('Error creating group.');
            }
        })
        .catch(error => console.error('Error creating group:', error));
    }
}

// Load groups when the page loads
document.addEventListener('DOMContentLoaded', loadGroups);