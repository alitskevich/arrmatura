import { Service } from './Service';
import { Service as NedbService } from 'feathers-nedb';
import { generateHooks } from './utils';
const NeDB = require('nedb');
const path = require('path');

export class DbIndex extends Service {
    init() {
        this.parent.ensureIndex({ fieldName: this.field, unique: this.unique })
    }
}
export class CrudService extends Service {
    constructor(props, $) {
        super(props, $)
        this.hooks = generateHooks();
        this.indices = [];
    }

    ensureIndex(idx) {
        this.indices.push(idx)
    }

    addHook(key, fn) {
        const [point, method = 'all'] = key.split(':')
        this.log('add hook: ' + key)
        this.hooks[point][method].push(fn);
    }

    createModel(app) {
        const id = this.id
        const dbPath = app.get('nedb');
        return new NeDB({
            filename: path.join(dbPath, id + '.db'),
            autoload: true
        });
    }

    createRestHandler(app) {

        const Model = this.createModel(app);

        this.indices.forEach(Model.ensureIndex)
        const paginate = app.get('paginate');

        const options = {
            Model,
            paginate
        };

        return new NedbService(options, app)
    }

    configure(app) {
        const id = this.id

        // Initialize our service with any options it requires
        app.use('/' + id, this.createRestHandler(app));

        // Get our initialized service so that we can register hooks
        const service = app.service(id);

        service.hooks(this.hooks);

        this.app.log(id, 'crud')
    }
}