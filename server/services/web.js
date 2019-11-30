import { Service } from '../core';

const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const logger = require('../core/logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// const appHooks = require('./app.hooks');
// const channels = require('./channels');

export class BasicMiddleware extends Service {

    hookBeforeAll(context) {
        this.log(
            `Request to path ${context.path} with method ${context.method} ${
            context.data ? 'and data ' + JSON.stringify(context.data) : ''
            }`
        );
    }
    hookError(context) {
        this.error(
            `Error in ${context.path} calling ${context.method} method`,
            context.error
        );
    }
    configure(app) {

        app.hooks({
            before: {
                all: context => this.hookBeforeAll(context)
            },
            error: context => this.hookError(context)
        });

        app
            .use(helmet())
            .use(cors())
            .use(compress())
            .use(express.json())
            .use(express.urlencoded({ extended: true }));
    }
}

export class StaticMiddleware extends Service {
    configure(app) {
        const dir = app.get(this.path || 'public')
        app
            .use(favicon(path.join(dir, 'favicon.ico')))
            .use(this.base || '/', express.static(dir));
    }
}

export class RestMiddleware extends Service {
    configure(app) {
        app.configure(express.rest());
    }
}

export class SocketMiddleware extends Service {
    configure(app) {
        app.configure(socketio());
    }
}

export class NotFoundMiddleware extends Service {
    configure(app) {
        app.use(express.notFound());
    }
}

export class ErrorMiddleware extends Service {
    configure(app) {
        app.use(express.errorHandler({ logger }));
    }
}

export class Express extends Service {

    constructor(props, $) {
        super(props, $)
        this.expressApp = express(feathers())
        this.configure(configuration());
    }
    configure(...args) {
        this.expressApp.configure(...args)
        return this
    }
    use(...args) {
        this.expressApp.use(...args)
        return this
    }
    get(...args) {
        return this.expressApp.get(...args)
    }
    set(...args) {
        return this.expressApp.set(...args)
    }
    service(...args) {
        return this.expressApp.service(...args)
    }
    hooks(...args) {
        this.expressApp.hooks(...args)
        return this
    }
    start() {
        const host = this.get('host');
        const port = this.get('port');
        const server = this.expressApp.listen(port);

        process.on('unhandledRejection', (reason, p) =>
            this.error('Unhandled Rejection at: Promise ', p, reason)
        );

        server.on('listening', () =>
            this.log('Application started on http://%s:%d', host, port)
        );
    }
    init() {

        // app.configure(authentication);
        // // Set up our services (see `services/index.js`)
        // app.configure(services);
        // // Set up event channels (see channels.js)
        // app.configure(channels);

        // app.hooks(appHooks);
    }

};
