# Complete Issues Reference Guide

This document catalogs all intentional bugs, vulnerabilities, and issues in the codebase for Greptile AI code review demonstration purposes.

## 🔴 Critical Security Vulnerabilities

### server.js

1. **VULNERABILITY 1 (Line 11)**: Hardcoded Secret Key
   - `const SECRET_KEY = 'supersecret123'`
   - Secret keys should be stored in environment variables

2. **VULNERABILITY 2 (Lines 14-19)**: Exposed Database Credentials
   - Database credentials hardcoded in source code
   - Should use environment variables

3. **VULNERABILITY 3 (Lines 29-31)**: SQL Injection in Login
   - Direct string concatenation in SQL query
   - `const query = \`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'\``

4. **VULNERABILITY 4 (Line 42)**: No Authentication Middleware
   - `/user/:id` endpoint accessible without authentication

5. **VULNERABILITY 5 (Line 46)**: SQL Injection in User Retrieval
   - `const query = \`SELECT * FROM users WHERE id = ${userId}\``

6. **VULNERABILITY 6 (Lines 63-72)**: Mass Assignment Vulnerability
   - User can inject any field including `is_admin: true`

7. **VULNERABILITY 7 (Lines 90-99)**: XSS Vulnerability
   - Review text not sanitized before storage

8. **VULNERABILITY 8 (Lines 114-122)**: Insecure Direct Object Reference
   - Any user can delete any order without authorization

9. **VULNERABILITY 9 (Lines 142-150)**: Sensitive Data Exposure
   - Returns all user data including passwords without authentication

10. **VULNERABILITY 10 (Lines 169-175)**: CSRF Vulnerability
    - No CSRF token validation on sensitive operations

11. **VULNERABILITY 11 (Lines 200-209)**: Command Injection
    - User input directly used in shell command
    - `exec(\`tar -czf ${filename}.tar.gz database/\`)`

12. **VULNERABILITY 12 (Lines 234-242)**: Weak JWT Expiration
    - Tokens never expire

13. **VULNERABILITY 13 (Lines 263-271)**: Eval Usage (Code Injection)
    - Using `eval(expression)` on user input

### public/app.js

14. **VULNERABILITY 1 (Lines 8-11)**: Sensitive Data in LocalStorage
    - Storing passwords in localStorage
    - `localStorage.setItem('userPassword', 'admin123')`

15. **VULNERABILITY 2 (Lines 27-41)**: XSS via innerHTML
    - `document.getElementById('user-info').innerHTML = \`Welcome ${username}!\``

16. **VULNERABILITY 4 (Lines 64-76)**: XSS via Product Display
    - User-generated content not sanitized before insertion

17. **VULNERABILITY 5 (Line 159)**: Eval Usage
    - `const discount = eval(code)`

18. **VULNERABILITY 6 (Lines 184-188)**: Console Logging Sensitive Data
    - Exposing tokens and user data in console

19. **VULNERABILITY 7 (Lines 220-231)**: No CSRF Protection
    - Payment operations without CSRF tokens

20. **VULNERABILITY 9 (Lines 282-285)**: No Input Sanitization
    - Direct innerHTML insertion of search query

21. **VULNERABILITY 10 (Lines 311-312)**: Exposed API Keys
    - API keys hardcoded in frontend JavaScript

## 🟡 Logic Bugs

### server.js

1. **BUG 1 (Line 24)**: No Connection Error Handling
   - `db.connect()` without error handling

2. **BUG 2 (Line 33)**: Passwords Not Hashed
   - Plaintext password comparison

3. **BUG 3 (Line 48)**: No Error Handling in Query
   - Database query without error handling

4. **BUG 4 (Lines 55-61)**: Incorrect Discount Calculation
   - `const discountedPrice = price - discountPercent`
   - Should be: `price * (1 - discountPercent/100)`

5. **BUG 5 (Lines 77-88)**: Race Condition in Inventory
   - No locking mechanism for concurrent purchases

6. **BUG 6 (Lines 101-112)**: Memory Leak with Intervals
   - Intervals created but never cleared

7. **BUG 7 (Lines 124-140)**: Infinite Loop Potential
   - If weight is string or negative, infinite loop

8. **BUG 8 (Lines 152-167)**: Type Coercion Bug
   - `if (price > '1000')` - string comparison instead of number

9. **BUG 9 (Lines 177-198)**: Callback Hell
   - Nested callbacks without error handling

10. **BUG 10 (Lines 211-216)**: Improper Promise Handling
    - Promise not awaited, sends Promise object instead of data

11. **BUG 11 (Lines 218-228)**: Resource Not Closed
    - File stream not properly closed

12. **BUG 12 (Lines 230-240)**: Division by Zero
    - No check for `count === 0`

13. **BUG 13 (Lines 244-255)**: Incorrect Async/Await
    - Try-catch doesn't prevent sending response twice

14. **BUG 14 (Line 261)**: Unhandled Promise Rejection
    - `Promise.reject('Unhandled rejection')`

### public/app.js

1. **BUG 1 (Lines 2-5)**: Global Variable Pollution
   - Using `var` and polluting global scope

2. **BUG 2 (Lines 14-24)**: No Input Validation
   - No validation of username/password input

3. **BUG 3 (Lines 27-41)**: No Error Handling for Fetch
   - Fetch without try-catch or .catch()

4. **BUG 4 (Lines 43-51)**: Memory Leak with Intervals
   - Intervals never cleared

5. **BUG 5 (Lines 54-64)**: Race Condition
   - isLoading flag not properly managed

6. **BUG 6 (Lines 78-80)**: Memory Leak Event Listeners
   - Event listeners not cleaned up

7. **BUG 7 (Lines 83-92)**: Array Mutation
   - Pushing reference instead of copy

8. **BUG 8 (Line 86)**: Inefficient DOM Manipulation
   - Updating cart count inside loop

9. **BUG 9 (Line 89)**: Not Checking if Product Exists
   - Could cause null reference error

10. **BUG 10 (Lines 94-101)**: Inefficient Loop
    - Unnecessary loop to count items

11. **BUG 11 (Lines 104-123)**: Null Pointer Exception
    - Item could be null or undefined

12. **BUG 12 (Lines 126-134)**: Wrong Array Removal Logic
    - Only removes first occurrence

13. **BUG 13 (Lines 137-148)**: Not Awaiting Promise
    - Fetch not awaited before showing success

14. **BUG 14 (Lines 167-174)**: Infinite Recursion
    - Missing base case for some inputs

15. **BUG 15 (Lines 177-183)**: Type Coercion with ==
    - Using == instead of ===

16. **BUG 16 (Lines 186-195)**: Closure Issue
    - Using `var` in loop, captures wrong `i`

17. **BUG 17 (Lines 197-207)**: Off-by-One Error
    - Using `<=` instead of `<`, loads 11 items instead of 10

18. **BUG 18 (Lines 210-216)**: Memory Leak
    - Adding event listeners without cleanup

19. **BUG 19 (Lines 219-227)**: Promise Chain Not Returning
    - Not returning data from promise chain

20. **BUG 20 (Lines 230-238)**: Date Manipulation Error
    - Month is 0-indexed but not handled properly

21. **BUG 21 (Lines 240-252)**: Improper Error Handling
    - Swallowing errors and continuing execution

22. **BUG 22 (Lines 255-259)**: Shallow Copy Issue
    - Nested objects still referenced

23. **BUG 23 (Lines 262-269)**: LocalStorage Not Cleared
    - Auth data remains after logout

24. **BUG 24 (Lines 272-279)**: Floating Point Arithmetic
    - Precision issues with money calculations

25. **BUG 25 (Lines 287-294)**: String Concatenation in Loop
    - Inefficient string building

26. **BUG 26 (Lines 296-306)**: Incorrect `this` Binding
    - `this` is undefined in setTimeout callback

27. **BUG 27 (Line 316)**: Unhandled Promise Rejection
    - Fetch without error handling

## ⚡ Performance Issues

### server.js

1. **PERF 1**: No connection pooling for database
2. **PERF 2**: No query optimization or indexing
3. **PERF 3**: Synchronous operations blocking event loop
4. **PERF 4**: No caching layer
5. **PERF 5**: Loading all data without pagination

### public/app.js

1. **PERF 1 (Lines 43-51)**: Memory leak with auto-refresh
2. **PERF 2 (Lines 66-77)**: Rebuilding entire product list on every update
3. **PERF 3 (Lines 94-101)**: Inefficient counting loop
4. **PERF 4 (Line 132)**: Reloading entire cart for single removal
5. **PERF 5 (Lines 287-294)**: String concatenation in loop
6. **PERF 6 (Lines 308-316)**: Multiple duplicate event listeners

### public/styles.css

1. **PERF 1 (Lines 6-12)**: Universal selector used multiple times
2. **PERF 2 (Lines 49-57)**: Complex animation with multiple transforms
3. **PERF 3 (Lines 68-74)**: Layout thrashing with calc()
4. **PERF 4 (Lines 112-118)**: Multiple background images
5. **PERF 5 (Lines 151-157)**: Multiple expensive box shadows
6. **PERF 6 (Line 212)**: Deep nested selector
7. **PERF 7 (Lines 251-258)**: Hover causing re-paint

## ♿ Accessibility Issues

### public/styles.css

1. **A11Y 1 (Lines 87-90)**: Missing focus states on inputs
2. **A11Y 2 (Lines 93-97)**: Poor color contrast (light on white)
3. **A11Y 3 (Lines 189-191)**: Text too small (8px)
4. **A11Y 4 (Lines 228-232)**: Hidden improperly (multiple conflicting methods)

### public/index.html

1. **A11Y 1**: No aria-labels on interactive elements
2. **A11Y 2**: No alt text on images (if any were added)
3. **A11Y 3**: No keyboard navigation support

## 🎨 Code Quality Issues

### server.js

1. **QUALITY 1**: No input validation middleware
2. **QUALITY 2**: No request logging
3. **QUALITY 3**: No rate limiting
4. **QUALITY 4**: No CORS configuration
5. **QUALITY 5**: Inconsistent error responses
6. **QUALITY 6**: No API versioning
7. **QUALITY 7**: Magic numbers and strings throughout
8. **QUALITY 8**: No code comments or documentation

### public/app.js

1. **QUALITY 1**: Global namespace pollution
2. **QUALITY 2**: No module pattern or encapsulation
3. **QUALITY 3**: Inconsistent naming conventions
4. **QUALITY 4**: No JSDoc comments
5. **QUALITY 5**: Mixed promise and async/await patterns
6. **QUALITY 6**: No error boundaries
7. **QUALITY 7**: Tight coupling between functions
8. **QUALITY 8**: No unit tests

### public/styles.css

1. **QUALITY 1 (Lines 18-23)**: !important overuse
2. **QUALITY 2 (Lines 59-63)**: Overly specific selectors
3. **QUALITY 3 (Lines 132-145)**: Conflicting styles
4. **QUALITY 4 (Lines 193-203)**: Orphaned unused classes
5. **QUALITY 5 (Lines 205-215)**: Magic numbers everywhere
6. **QUALITY 6**: No CSS variables for theming
7. **QUALITY 7**: No responsive design strategy
8. **QUALITY 8**: No CSS organization (BEM, SMACSS, etc.)

## Summary Statistics

- **Total Critical Security Vulnerabilities**: 21
- **Total Logic Bugs**: 41
- **Total Performance Issues**: 13
- **Total Accessibility Issues**: 7
- **Total Code Quality Issues**: 24

**Grand Total**: 106+ Issues

## Testing with Greptile

Use Greptile to:

1. **Security Analysis**: Ask it to identify all SQL injection points, XSS vulnerabilities, and authentication issues
2. **Bug Detection**: Have it find race conditions, memory leaks, and logic errors
3. **Performance Review**: Identify performance bottlenecks and optimization opportunities
4. **Code Quality**: Review for best practices, code smells, and maintainability issues
5. **Accessibility**: Check for WCAG compliance issues

## Greptile Integration

To use this repo with Greptile:

1. Index your repository: `https://github.com/worldzofai/buggy-ecommerce-demo`
2. Use Greptile's API or web interface to analyze the code
3. Ask specific questions like:
   - "Find all SQL injection vulnerabilities"
   - "Identify memory leaks in the frontend"
   - "What security issues exist in the authentication flow?"
   - "Find all instances where user input is not sanitized"
   - "What performance optimizations can be made?"

## Expected Outcomes

Greptile should be able to:
- Identify security vulnerabilities with severity levels
- Explain the impact of each issue
- Suggest fixes with code examples
- Prioritize issues by criticality
- Provide context about best practices