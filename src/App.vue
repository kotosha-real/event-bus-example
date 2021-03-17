<template>
  <div id="app">
    <h1>Here's for the EventBus technique</h1>
    <p>
      We use it when we want part of our code react to events that occur somewhere else without
      coupling code that reacts to event and code that produces an event
    </p>
    <p>Dive into code to find how it set up</p>
    <hr />
    <p>Here is the App component button that fire event Child component listening to</p>
    <button @click="fireAnotherEvent">Click me to trigger Child component</button>
    <br />
    <br />
    <Child />
  </div>
</template>

<script>
import EventBus from '@/EventBus'
import Child from './Child.vue'

export default {
  name: 'App',
  components: {
    Child
  },
  mounted() {
    /**
     * Here we're listening to the event someEvent that will later be emitted somewhere
     */
    EventBus.$on('someEvent', (data) => {
      console.log(`I listen to someEvent in App component, here's the data: ${data}`)
    })
  },
  methods: {
    fireAnotherEvent() {
      /**
       * Here we emit event anotherEvent on EventBus
       * Now all the attached listeners with $on will fire
       */
      EventBus.$emit('anotherEvent', 'my-another-data')
    }
  }
}
</script>

<style>
* {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
