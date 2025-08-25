// dev-server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from root directory
app.use(express.static(__dirname));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

// Handle dynamic routes for individual pages
app.get('/page/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', `page-${req.params.id}.html`));
});

app.listen(PORT, () => {
    console.log(`Development server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop');
});
