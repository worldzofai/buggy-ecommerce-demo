// VULNERABILITY 13: Hardcoded Admin Credentials in Client-Side Code
const ADMIN_CONFIG = {
    username: 'admin',
    password: 'supersecretadminpassword', // CRITICAL: Exposed credentials
    apiKey: 'admin-api-key-12345'
};

// BUG 30: Global Scope Pollution
var currentUser = null;
var adminData = [];

// VULNERABILITY 14: Insecure Direct Object Reference (IDOR) - Client Side
function deleteUser(userId) {
    // No confirmation, no proper authorization check on client side
    // Attacker can call this function with any ID
    fetch(`/admin/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': ADMIN_CONFIG.apiKey // Using exposed key
        }
    });
}

// BUG 31: Race Condition in UI Update
async function loadAdminDashboard() {
    const stats = await fetchStats();
    const users = await fetchUsers();
    
    // If fetchUsers finishes before fetchStats, the UI might be in an inconsistent state
    // depending on how renderDashboard handles partial data.
    renderDashboard(stats, users);
}

// VULNERABILITY 15: Stored XSS in Admin Logs
function logAction(action) {
    // Storing logs in local storage without sanitization
    let logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    logs.push({
        timestamp: new Date(),
        action: action // If action contains script tags, it will execute when viewed
    });
    localStorage.setItem('adminLogs', JSON.stringify(logs));
}

function viewLogs() {
    const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    const logContainer = document.getElementById('log-container');
    
    logs.forEach(log => {
        // VULNERABILITY: Direct innerHTML injection
        logContainer.innerHTML += `<div>${log.timestamp}: ${log.action}</div>`;
    });
}

// BUG 32: Memory Leak in Real-time Monitor
function startSystemMonitor() {
    // Creating a new interval every time function is called without clearing old one
    setInterval(() => {
        console.log("Checking system status...");
        // Heavy DOM manipulation
        const status = document.createElement('div');
        status.innerText = "System OK";
        document.body.appendChild(status); // Indefinitely adding elements
    }, 1000);
}

// BUG 33: Incorrect 'this' context in event handler
class AdminPanel {
    constructor() {
        this.panelName = "Main Admin";
        document.getElementById('refresh-btn').addEventListener('click', this.refresh);
    }
    
    refresh() {
        // 'this' will refer to the button, not the AdminPanel instance
        console.log("Refreshing " + this.panelName); // undefined
    }
}

// VULNERABILITY 16: Client-side Logic for Security Check
function checkPermission(role) {
    // Security logic on client side can be bypassed easily
    if (role === 'admin' || window.location.hash === '#admin-override') {
        return true;
    }
    return false;
}

// BUG 34: Floating Point Precision in Financial Reports
function calculateRevenue(transactions) {
    let total = 0;
    transactions.forEach(t => {
        total += t.amount; // 0.1 + 0.2 !== 0.3
    });
    return total;
}