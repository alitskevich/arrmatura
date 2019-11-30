import 'utils';
import resources from 'res';
import { launch } from 'armatura';

import { Service, CrudService } from './core';
import { WebServerApp } from "./core/Server";
import * as services from './services';
import modules from './modules';

const types = [
  CrudService,
  ...modules,
  ...Object.values(services)
];

class Element extends Service {
}

export class App extends WebServerApp {
}

App.template = require('./app.html');
App.Element = Element;

launch({ types, App, resources });

