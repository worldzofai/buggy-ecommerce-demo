// BUG 1: Global variable pollution
var cart = [];
var products = [];
var userToken;
var intervals = [];

// VULNERABILITY 1: LocalStorage storing sensitive data
function saveToken(token) {
    localStorage.setItem('token', token);
    localStorage.setItem('userPassword', 'admin123'); // Never store passwords!
}

// BUG 2: No input validation
function showLogin() {
    const html = `
        <div class="login-form">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username">
            <input type="password" id="password" placeholder="Password">
            <button onclick="login()">Login</button>
        </div>
    `;
    document.getElementById('main-content').innerHTML = html;
}

// VULNERABILITY 2: XSS vulnerability
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // BUG 3: No error handling for fetch
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.token) {
        userToken = data.token;
        saveToken(data.token);
        
        // VULNERABILITY 3: XSS - directly inserting user input
        document.getElementById('user-info').innerHTML = `Welcome ${username}!`;
    }
}

// BUG 4: Memory leak - intervals never cleared
function startAutoRefresh() {
    const interval = setInterval(() => {
        loadProducts();
    }, 5000);
    intervals.push(interval);
    // Intervals never cleared!
}

// BUG 5: Race condition
let isLoading = false;
async function loadProducts() {
    // No proper loading state management
    if (isLoading) return;
    
    isLoading = true;
    const response = await fetch('/products');
    products = await response.json();
    isLoading = false;
    
    displayProducts();
}

// VULNERABILITY 4: innerHTML with user content (XSS)
function displayProducts() {
    let html = '<div class="products">';
    
    products.forEach(product => {
        // User-generated content not sanitized!
        html += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
    
    html += '</div>';
    document.getElementById('main-content').innerHTML = html;
    
    // BUG 6: Memory leak - event listeners not cleaned up
    startAutoRefresh();
}

// BUG 7: Array mutation causing bugs
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // BUG: Pushing reference, not copy
    cart.push(product);
    
    // BUG 8: DOM manipulation inside loop
    updateCartCount();
    
    // BUG 9: Not checking if product exists
    alert(`Added ${product.name} to cart`);
}

// BUG 10: Inefficient DOM updates
function updateCartCount() {
    let count = 0;
    // Inefficient loop
    for (let i = 0; i < cart.length; i++) {
        count = count + 1;
    }
    document.getElementById('cart-count').innerHTML = count;
}

// BUG 11: Null pointer exception potential
function showCart() {
    let total = 0;
    let html = '<div class="cart"><h2>Shopping Cart</h2>';
    
    cart.forEach(item => {
        // Item could be null or undefined
        total += item.price;
        html += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });
    
    html += `<div class="total">Total: $${total}</div>`;
    html += '<button onclick="checkout()">Checkout</button></div>';
    
    document.getElementById('main-content').innerHTML = html;
}

// BUG 12: Logic error in array removal
function removeFromCart(productId) {
    // Wrong logic: only removes first occurrence
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    showCart(); // Inefficient: reloads entire cart
}

// BUG 13: Async/await misuse
async function checkout() {
    // No loading state
    // No error handling
    const response = fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, token: userToken })
    });
    
    // BUG: Not awaiting promise!
    alert('Order placed successfully!');
    cart = [];
    updateCartCount();
}

// VULNERABILITY 5: Eval usage (code injection)
function applyPromoCode(code) {
    // Dangerous: evaluating user input!
    const discount = eval(code);
    return discount;
}

// BUG 14: Infinite recursion potential
function calculateDiscount(price, level) {
    if (level > 10) {
        return price * 0.5;
    }
    // Missing base case for some inputs
    return calculateDiscount(price, level + 1);
}

// BUG 15: Type coercion issues
function compareNumbers(a, b) {
    // Bug: using == instead of ===
    if (a == b) {
        return true;
    }
    return false;
}

// BUG 16: Closure issue
function createButtons() {
    const buttons = [];
    for (var i = 0; i < 5; i++) {
        // BUG: var instead of let, closure captures wrong i
        buttons.push(() => {
            console.log('Button ' + i + ' clicked');
        });
    }
    return buttons;
}

// VULNERABILITY 6: Exposing sensitive data in console
function debugUserData() {
    console.log('User token:', userToken);
    console.log('Cart data:', cart);
    console.log('Local storage:', localStorage);
}

// BUG 17: Off-by-one error
function loadPage(pageNumber) {
    const itemsPerPage = 10;
    // Bug: should be < instead of <=
    for (let i = 0; i <= itemsPerPage; i++) {
        // This loads 11 items instead of 10
        const index = pageNumber * itemsPerPage + i;
        console.log(`Loading item ${index}`);
    }
}

// BUG 18: Memory leak with event listeners
function attachEventListeners() {
    // No cleanup, keeps adding listeners
    document.addEventListener('click', function() {
        console.log('Clicked');
    });
}

// BUG 19: Improper promise chain
function fetchUserData(userId) {
    return fetch(`/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            // Not returning the data!
            console.log(data);
        });
    // Promise doesn't resolve with data
}

// BUG 20: Date manipulation error
function formatDate(date) {
    // Bug: months are 0-indexed but not handled properly
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`; // Shows wrong month!
}

// VULNERABILITY 7: No CSRF protection
function makePayment(amount) {
    fetch('/transfer-funds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fromAccount: 'user123',
            toAccount: 'merchant',
            amount: amount
        })
    });
}

// BUG 21: Improper error handling
function processOrder(order) {
    try {
        if (!order.items) {
            throw new Error('No items in order');
        }
        // Processing...
    } catch (e) {
        // Swallowing error without proper handling
        console.log('Error occurred');
    }
    // Continues execution even after error
    return { success: true };
}

// BUG 22: Deep copy issue
function cloneCart() {
    // Shallow copy - nested objects still referenced
    const clonedCart = [...cart];
    return clonedCart;
}

// VULNERABILITY 8: localStorage never cleared
function logout() {
    userToken = null;
    // Bug: not clearing localStorage
    document.getElementById('user-info').innerHTML = '';
    cart = [];
    updateCartCount();
}

// BUG 23: Floating point arithmetic
function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        // Floating point precision issues
        total = total + item.price;
    });
    return total; // Could be like 10.000000000001
}

// BUG 24: String concatenation in loop
function generateProductList() {
    let html = '';
    for (let i = 0; i < products.length; i++) {
        // Inefficient string concatenation
        html = html + '<div>' + products[i].name + '</div>';
    }
    return html;
}

// VULNERABILITY 9: No input sanitization
function searchProducts(query) {
    // Direct use of user input without validation
    document.getElementById('search-results').innerHTML = 
        `<h3>Results for: ${query}</h3>`;
}

// BUG 25: Incorrect this binding
const productManager = {
    products: [],
    loadProducts: function() {
        setTimeout(function() {
            // Bug: 'this' is undefined here
            this.products = ['Product 1', 'Product 2'];
        }, 1000);
    }
};

// Initialize bugs on load
window.onload = function() {
    // BUG: Multiple event handlers attached
    attachEventListeners();
    attachEventListeners();
    
    // Memory leak start
    startAutoRefresh();
    
    // Debug info exposed
    debugUserData();
    
    showProducts();
};

// VULNERABILITY 10: Exposed API keys
const API_KEY = 'sk_live_12345abcdef67890';
const STRIPE_KEY = 'pk_test_abcdefghijklmnop';