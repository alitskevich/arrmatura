import { Service } from './Service'

export class ServiceWorker extends Service {
  get api () {
    return navigator.serviceWorker
  }

  init () {
    try {
      Function.assert(this.api, 'Service Workers are not supported')

      const { source = '/service-worker.js', scope = '/', push } = this

      this.api.register(source, { scope })
        .then((registration) => this.registered(registration))
        .then(() => this.ready(() => this.log('Service Worker Ready')))

      this.api.addEventListener('message', ev => this.onMessage(ev))

      if (push) {
        this.subscribe()
      }
    } catch (error) {
      this.fallback(error)
    }
  }

  // ensures that `fn` executed when api is ready
  ready (fn) {
    return this.api.ready.then(fn)
  }

  fallback (error) {
    this.log(error)
  }

  // hook on registered
  registered (registration) {
    this.log('Service Worker Registered')
    return registration
  }
  /**
     * Push
     */

  withPushManager (fn) {
    return this.ready(({ pushManager }) => pushManager).then(fn)
  }

  unsubscribe () {
    this.withPushManager(pushManager => pushManager.getSubscription())
      .then((ss) => ss && ss.unsubscribe())
      .then(() => this.saveSubscription())
      .catch(function (e) {
        console.log('Error thrown while unsubscribing from  push messaging.', e)
      })
  }

  subscribe () {
    function urlBase64ToUint8Array (base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4)
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')

      const rawData = window.atob(base64)
      return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
    }
    if (Notification.permission === 'granted') {
      /* do our magic */
    } else if (Notification.permission === 'blocked') {
      /* the user has previously denied push. Can't reprompt. */
    } else {
      /* show a prompt to the user */
    }
    const applicationServerKey = urlBase64ToUint8Array(this.vapidPublicKey)
    this.withPushManager(pushManager => pushManager.getSubscription()
    // .then((ss) => ss && ss.unsubscribe())
      .then(ss => ss || pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      }))
      .then((subscription) => this.saveSubscription(subscription.toJSON()))
      .catch((err) => {
        if (Notification.permission === 'denied') {
          this.log('The user has blocked notifications.')
        }
        this.handleError(err)
      })
    )
  }

  // to be overriden from props
  saveSubscription (ss) {
    this.subscription = ss
  }

  /**
     * Intercommunication between service worker.
     */

  // handles a message posted from Service worker.
  onMessage (payload) {
    this.log('onMessage', payload)
  }
}
