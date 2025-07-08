// API Base URL
const API_BASE_URL = 'http://localhost:8080/api/users';

// DOM Elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const usersTable = document.querySelector('table');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadAllUsers();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    submitBtn.addEventListener('click', createUser);
    clearBtn.addEventListener('click', clearForm);
}

// Clear form
function clearForm() {
    nameInput.value = '';
    emailInput.value = '';
}

// Create a new user
async function createUser() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{
                name: name,
                email: email
            }])
        });

        if (response.ok) {
            const users = await response.json();
            console.log('User created:', users[0]);
            clearForm();
            loadAllUsers(); // Refresh the table
            alert('User created successfully!');
        } else {
            const error = await response.text();
            alert(`Error creating user: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating user. Please try again.');
    }
}

// Get all users
async function loadAllUsers() {
    try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
            const users = await response.json();
            displayUsers(users);
        } else {
            console.error('Failed to load users');
        }
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Display users in the table
function displayUsers(users) {
    const tbody = usersTable.querySelector('tbody');
    if (!tbody) {
        usersTable.appendChild(document.createElement('tbody'));
    }
    
    const tableBody = usersTable.querySelector('tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>-</td>
            <td>-</td>
            <td>
                <button onclick="editUser(${user.id})" class="edit-btn">Edit</button>
                <button onclick="deleteUser(${user.id})" class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Get user by ID
async function getUser(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`);
        if (response.ok) {
            const user = await response.json();
            console.log('User:', user);
            return user;
        } else {
            console.error(`Failed to get user ${userId}`);
            return null;
        }
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

// Edit user
async function editUser(userId) {
    const user = await getUser(userId);
    if (user) {
        nameInput.value = user.name;
        emailInput.value = user.email;
        
        // Change submit button to update mode
        submitBtn.textContent = 'Update User';
        submitBtn.onclick = () => updateUser(userId);
    }
}

// Update user
async function updateUser(userId) {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        });

        if (response.ok) {
            const updatedUser = await response.json();
            console.log('User updated:', updatedUser);
            clearForm();
            loadAllUsers(); // Refresh the table
            
            // Reset submit button
            submitBtn.textContent = 'Submit';
            submitBtn.onclick = createUser;
            
            alert('User updated successfully!');
        } else {
            const error = await response.text();
            alert(`Error updating user: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating user. Please try again.');
    }
}

// Delete user
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('User deleted successfully');
            loadAllUsers(); // Refresh the table
            alert('User deleted successfully!');
        } else {
            console.error('Failed to delete user');
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
    }
}

// Load users with pagination (optional)
async function loadUsersWithPagination(page = 0, size = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/page?page=${page}&size=${size}`);
        if (response.ok) {
            const pageData = await response.json();
            displayUsers(pageData.content);
            console.log('Page data:', pageData);
        } else {
            console.error('Failed to load users with pagination');
        }
    } catch (error) {
        console.error('Error loading users with pagination:', error);
    }
}

