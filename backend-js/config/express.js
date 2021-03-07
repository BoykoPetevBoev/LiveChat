const express = require('express');
const cors = require('cors');

function expressConfig(app, router) {

    app.use(cors({ exposedHeaders: 'Authorization' }));
    app.use(express.json());
    app.use(express.static('static'));
    app.use(express.urlencoded({ extended: true }))
    app.use(router);
    // app.use(cookieParser());
    return app;
}

module.exports = expressConfig