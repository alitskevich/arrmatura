import { Service } from '../core';
const memory = require('feathers-memory');
const PushNotifications = require('node-pushnotifications');


export class PubSubService extends Service {

  get subscriptionService() {
    return this.app.service('subscriptions');
  }

  async push(data, params) {
    this.log('Sending push notifications to all known subscriptions');

    try {
      const subscriptions = await this.subscriptionService.find();
      const results = await this.pushImpl.send(subscriptions, 'Push is working! :)');
      this.log('Push results', results);
      return results;
    } catch (err) {
      this.error('Unexpected error while sending web push notifications', err);
    }
  }
  configure(app) {

    this.pushImpl = new PushNotifications(this.settings);

    app.use('subscriptions', memory({}));

    app.use('push', {
      find: (data, params) => this.push(data, params)
    });
  }
}
