# 🚨 Sentry Setup & Error Generation Guide

To see issues appear in your Sentry dashboard (and thus in Continue.dev), you must **run the application** and **trigger the errors**.

## Step 1: Add Your Sentry DSN

1.  Open `server.js`.
2.  Find line 10: `dsn: "YOUR_SENTRY_DSN_HERE",`
3.  Replace `YOUR_SENTRY_DSN_HERE` with your actual Client Key (DSN) from Sentry.
    *   *Find this in Sentry: Settings > Projects > [Your Project] > Client Keys (DSN)*

## Step 2: Add Your Sentry Loader Script (Optional but Recommended)

1.  Open `public/index.html`.
2.  Find the `<script>` tag with `YOUR_SENTRY_LOADER_SCRIPT_URL`.
3.  Replace it with your actual Loader Script URL.
    *   *Find this in Sentry: Settings > Projects > [Your Project] > Client Keys (DSN) > "Configure" button next to DSN*

## Step 3: Run the Server

Open a terminal in the `buggy-ecommerce` directory and run:

```bash
npm start
```

## Step 4: Generate Errors

While the server is running, open a **new terminal** and run the helper script:

```bash
# Make it executable (Mac/Linux)
chmod +x generate_errors.sh

# Run it
./generate_errors.sh
```

**Or manually trigger them in your browser:**

1.  Go to `http://localhost:3000`
2.  Click around!
    *   Click "Login" (triggers XSS & API errors)
    *   Click "Products" (triggers memory leaks)
    *   Open the Console (F12) to see the chaos.
3.  Visit `http://localhost:3000/crash` to crash the server.

## Step 5: Check Sentry

Go back to your Sentry Dashboard. You should now see a flood of new issues!