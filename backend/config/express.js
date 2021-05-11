const express = require('express');
const cors = require('cors');
const expressRouter = require('../server/router');

function expressConfig() {
    const router = express.Router();
    const app = express();

    app.use(cors());
    app.use(cors({ exposedHeaders: 'Authorization' }));
    app.use(express.json());
    app.use(express.static('static'));
    app.use(express.urlencoded({ extended: true }))
    app.use(router);
    // app.use(cookieParser());

    expressRouter(router);
    return app;
}

module.exports = expressConfig