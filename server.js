const Sentry = require('@sentry/node');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Initialize Sentry for error monitoring
Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
});

// VULNERABILITY 1: Hardcoded secret key
const SECRET_KEY = 'supersecret123';

// VULNERABILITY 2: Database credentials exposed
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'ecommerce_db'
});

// Sentry request handler must be the first middleware
app.use(Sentry.Handlers.requestHandler());
// Sentry tracing handler for performance monitoring
app.use(Sentry.Handlers.tracingHandler());

app.use(bodyParser.json());
app.use(express.static('public'));

// BUG 1: No connection error handling
db.connect();

// Fixed: Use parameterized query to prevent SQL injection
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Use parameterized query to prevent SQL injection
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      // BUG 2: Passwords not hashed (still needs to be fixed)
      const token = jwt.sign({ userId: results[0].id }, SECRET_KEY);
      res.json({ token, message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// VULNERABILITY 4: No authentication middleware
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  
  // VULNERABILITY 5: Another SQL injection
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  db.query(query, (err, results) => {
    // BUG 3: No error handling
    res.json(results[0]);
  });
});

// BUG 4: Logic error in discount calculation
app.post('/apply-discount', (req, res) => {
  const { price, discountPercent } = req.body;
  
  // Logic error: discount calculation is wrong!
  const discountedPrice = price - discountPercent;
  
  res.json({ originalPrice: price, discountedPrice });
});

// VULNERABILITY 6: Mass assignment vulnerability
app.post('/create-user', async (req, res) => {
  const userData = req.body;
  
  // User can set themselves as admin!
  const query = 'INSERT INTO users SET ?';
  
  db.query(query, userData, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ userId: result.insertId });
    }
  });
});

// BUG 5: Race condition in inventory management
let inventory = {};

app.post('/purchase', (req, res) => {
  const { productId, quantity } = req.body;
  
  // Race condition: no locking mechanism
  if (inventory[productId] >= quantity) {
    inventory[productId] -= quantity;
    res.json({ success: true, remaining: inventory[productId] });
  } else {
    res.status(400).json({ error: 'Insufficient inventory' });
  }
});

// VULNERABILITY 7: XSS vulnerability
app.post('/add-review', (req, res) => {
  const { productId, review } = req.body;
  
  // No input sanitization!
  const query = 'INSERT INTO reviews (product_id, review_text) VALUES (?, ?)';
  
  db.query(query, [productId, review], (err, result) => {
    res.json({ message: 'Review added' });
  });
});

// BUG 6: Memory leak - event listeners not removed
app.get('/subscribe', (req, res) => {
  const email = req.query.email;
  
  setInterval(() => {
    console.log(`Sending newsletter to ${email}`);
  }, 60000);
  
  res.json({ message: 'Subscribed' });
});

// VULNERABILITY 8: Insecure direct object reference
app.delete('/order/:id', (req, res) => {
  const orderId = req.params.id;
  
  // No authorization check!
  const query = `DELETE FROM orders WHERE id = ${orderId}`;
  
  db.query(query, (err, result) => {
    res.json({ message: 'Order deleted' });
  });
});

// BUG 7: Infinite loop potential
app.get('/calculate-shipping', (req, res) => {
  let weight = req.query.weight;
  let cost = 0;
  
  // Bug: if weight is string or negative, infinite loop!
  while (weight > 0) {
    cost += 5;
    weight--;
  }
  
  res.json({ shippingCost: cost });
});

// VULNERABILITY 9: Sensitive data exposure
app.get('/admin/users', (req, res) => {
  // No authentication, returns all user data including passwords!
  const query = 'SELECT * FROM users';
  
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// BUG 8: Type coercion bug
app.post('/update-price', (req, res) => {
  const { productId, price } = req.body;
  
  // Bug: price comparison with string
  if (price > '1000') {
    res.status(400).json({ error: 'Price too high' });
  } else {
    const query = 'UPDATE products SET price = ? WHERE id = ?';
    db.query(query, [price, productId], (err) => {
      res.json({ message: 'Price updated' });
    });
  }
});

// VULNERABILITY 10: CSRF vulnerability - no CSRF protection
app.post('/transfer-funds', (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;
  
  // No CSRF token validation!
  res.json({ message: 'Funds transferred' });
});

// BUG 9: Callback hell and poor error handling
app.get('/complex-operation/:id', (req, res) => {
  const id = req.params.id;
  
  db.query(`SELECT * FROM users WHERE id = ${id}`, (err1, user) => {
    db.query(`SELECT * FROM orders WHERE user_id = ${id}`, (err2, orders) => {
      db.query(`SELECT * FROM products`, (err3, products) => {
        db.query(`SELECT * FROM reviews WHERE user_id = ${id}`, (err4, reviews) => {
          // No error handling for any of these!
          res.json({ user, orders, products, reviews });
        });
      });
    });
  });
});

// BUG 10: Improper promise handling
app.get('/async-bug', async (req, res) => {
  // Promise not awaited properly
  const result = Promise.resolve({ data: 'test' });
  res.json(result); // Sends Promise object instead of data!
});

// VULNERABILITY 11: Command injection
app.post('/backup', (req, res) => {
  const { filename } = req.body;
  const exec = require('child_process').exec;
  
  // Command injection vulnerability!
  exec(`tar -czf ${filename}.tar.gz database/`, (error, stdout, stderr) => {
    res.json({ message: 'Backup created' });
  });
});

// BUG 11: Resource not closed
app.get('/read-file', (req, res) => {
  const fs = require('fs');
  const filename = req.query.file;
  
  // File stream not closed properly
  const stream = fs.createReadStream(filename);
  stream.on('data', (chunk) => {
    res.write(chunk);
  });
  // Missing stream.on('end') and res.end()
});

// BUG 12: Division by zero
app.get('/calculate-average/:total/:count', (req, res) => {
  const total = parseFloat(req.params.total);
  const count = parseFloat(req.params.count);
  
  // No check for count === 0
  const average = total / count;
  
  res.json({ average });
});

// VULNERABILITY 12: Weak JWT expiration
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  
  // Token never expires!
  const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY);
  
  res.json({ token });
});

// BUG 13: Incorrect async/await usage
app.get('/bad-async', async (req, res) => {
  try {
    const data = await fetchData(); // function doesn't exist
    res.json(data);
  } catch (err) {
    // Error not properly handled
    console.log(err);
  }
  // Response sent even if error occurs
  res.json({ status: 'ok' });
});

// Sentry error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// BUG 14: Unhandled promise rejection
Promise.reject('Unhandled rejection');

// VULNERABILITY 13: Eval usage
app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  
  // Using eval - code injection!
  const result = eval(expression);
  
  res.json({ result });
});