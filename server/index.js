const express = require('express');
const path = require('path');

/* FEEDBACK: the path here needs to take you to your vite-project/dist folder. Each argument you pass
to path.join() is like a step where you `cd`, starting with `__dirname` being the current folder `server/`

So, you'll need to:
- go up one level to the root of your repo
- go down into vite-project
- go down into dist

Once you do that, when you run your server, you should be able to see the built vite project
*/
const pathToDistFolder = path.join(__dirname, '..', 'path', 'to', 'frontend', 'dist')
const app = express();

const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next(); // Passes the request to the next middleware/controller
};

const serveStatic = express.static(pathToDistFolder);
//*the middleware function for serving static assets

const serveData = (req, res, next) => {
    const data = [{ name: 'Tahj' }, { age: '21' }, { favColor: 'pink' }];
    res.send(data);
}

const serveAbout = (req, res, next) => res.send('<h1>Hello Tahj</h1>')

app.use(logRoutes);
app.use(serveStatic);
app.get('/about', serveAbout);
app.get('/api/data', serveData);

const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})