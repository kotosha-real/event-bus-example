/**
 * Imagine lib-like usage so this piece of data will be held in closure and will not be accessible anywhere but subscribe/publish methods
 * Kind note: You could copy/paste this code to browser
 */
const subscriptions = {}

class EventBus {
  static instance = null

  /**
   * Implement Singleton pattern
   * https://refactoring.guru/ru/design-patterns/singleton
   */
  constructor() {
    if (EventBus.instance) return EventBus.instance
    EventBus.instance = this
  }

  /**
   * Subscribe callback to event
   * This callback fires among others when Event bus publishes this event
   * Returns object with unsubscribe function to, well, unsubscribe this callback
   *
   * @param type
   * @param listener
   * @returns function
   */
  subscribe(type, listener) {
    const callbackQueue = subscriptions[type] || new Map()
    callbackQueue.set(listener, listener)
    subscriptions[type] = callbackQueue

    return {
      /**
       * We get listener from closure so we do not have to memoize somewhere
       * Map items ordered by insertion order so we enforce FIFO-like callback invocation
       * Also we can work with anonymous functions and be able to unsubscribe them later
       */
      unsubscribe: () => {
        callbackQueue.delete(listener)
        if (callbackQueue.size === 0) delete subscriptions[type]
      }
    }
  }

  /**
   * Publish all subscribed callbacks if they exist
   *
   * @param type
   * @param payload
   */
  publish(type, payload) {
    const callbackQueue = subscriptions[type]
    if (callbackQueue) {
      const callbackArray = [...callbackQueue]
      // Array destructuring 'cause map spreads to array like Object.entries()
      // Also have in mind that every key of this map is the callback itself
      callbackArray.forEach(([callback]) => callback(payload))
    } else {
      console.log('There is no events to publish')
    }
  }
}

// Usage
const bus = new EventBus()
const meowSubscriber = bus.subscribe('meow', (name) => console.log(`${name} says meow`))
const woofSubscriber = bus.subscribe('woof', (name) => console.log(`${name} says woof`))
bus.publish('meow', 'Lucas') // Lucas says meow
bus.publish('meow', 'Grover') // Grover says meow
bus.publish('woof', 'Sandy') // Sandy says woof
meowSubscriber.unsubscribe()
woofSubscriber.unsubscribe()
bus.publish('meow', 'Grover') // There is no events to publish
bus.publish('woof', 'Sandy') // There is no events to publish
