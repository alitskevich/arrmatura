
import { Service } from '../core';

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('../../../aimd-dma-client/webpack.config');

export class WebpackService extends Service {

    configure(app) {
        app.use(middleware(webpack(config), config.devServer));
    }
}