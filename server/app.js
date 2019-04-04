const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 420;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = express();
    const router = express.Router();
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' })
    });
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use('/api', router);
    server.get('*', (req, res) => {
        return handle(req, res)
    });
    server.listen(port, err => {
        if (err) throw err;
        console.log(`🚀 Ready on http://localhost:${port} 🚀`)
    })
})