const express = require('express');
const path = require('path');

const pathToDistFolder = path.join(__dirname, '..','path', 'to', 'frontend', 'dist')

const app = express();

const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next(); // Passes the request to the next middleware/controller
};

const serveStatic = express.static(pathToDistFolder);
//*the middleware function for seving static assets 

const serveData = (req, res, next) => {
    const data = [{ name: 'Tahj' }, { age: '21' }, { favColor: 'pink' }];
    res.send(data);
} 

const serveAbout = (req,res,next) => res.send('<h1>Hello Tahj</h1>')

app.use(logRoutes);
app.use(serveStatic);
app.get('/about',serveAbout);
app.get('/api/data', serveData);

const port = 8081;
app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`)
})