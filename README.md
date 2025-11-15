# Buggy E-Commerce Application

A deliberately flawed e-commerce application created to demonstrate AI-powered code review capabilities with Greptile.

## ⚠️ WARNING

This repository contains intentional security vulnerabilities, bugs, and anti-patterns. **DO NOT use this code in production or as a reference for best practices.**

## Purpose

This project showcases various types of issues that AI code review tools like Greptile can detect:

### Security Vulnerabilities
- SQL Injection vulnerabilities
- Cross-Site Scripting (XSS) vulnerabilities
- Hardcoded credentials and API keys
- Command injection vulnerabilities
- Insecure direct object references
- Mass assignment vulnerabilities
- CSRF vulnerabilities
- Weak authentication mechanisms
- Sensitive data exposure
- Code injection via eval()

### Logic Bugs
- Race conditions
- Off-by-one errors
- Type coercion issues
- Incorrect calculations (discount logic)
- Division by zero
- Infinite loop potential
- Infinite recursion risks
- Incorrect async/await usage
- Promise handling issues
- Callback hell

### Performance Issues
- Memory leaks (event listeners, intervals)
- Inefficient DOM manipulations
- Resource leaks (unclosed streams)
- N+1 query problems
- Expensive CSS selectors
- Layout thrashing

### Code Quality Issues
- Global variable pollution
- Poor error handling
- Missing input validation
- Improper promise chains
- Deep copy issues
- String concatenation in loops
- Incorrect this binding
- Closure issues with var

### Frontend Issues
- Missing vendor prefixes
- !important overuse
- Fixed dimensions breaking responsiveness
- Z-index chaos
- Missing accessibility features
- Poor color contrast
- Missing focus states
- Broken responsive design

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The server will run on http://localhost:3000

## Database Setup

**Note**: This app has hardcoded database credentials (a security vulnerability!)

Create the database schema:

```sql
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    inventory INT
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    review_text TEXT,
    rating INT
);
```

## Issue Categories

The codebase contains approximately:
- **13 Critical Security Vulnerabilities**
- **26 Logic Bugs**
- **7 Performance Issues**
- **Multiple Accessibility Issues**
- **Dozens of Code Quality Problems**

## Testing with Greptile

Use Greptile's AI code review to:
1. Identify all security vulnerabilities
2. Detect logic errors and bugs
3. Find performance bottlenecks
4. Suggest code quality improvements
5. Detect accessibility issues

## Files to Review

- `server.js` - Backend with SQL injections, security flaws, and logic bugs
- `public/app.js` - Frontend with XSS, memory leaks, and async bugs
- `public/styles.css` - CSS with performance issues and accessibility problems

## License

MIT (for demonstration purposes only)

## Disclaimer

This code is intentionally insecure and buggy. It is meant for educational purposes only to demonstrate code review capabilities. Never use any part of this code in a real application.