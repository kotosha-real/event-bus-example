<template>
  <div class="hello">
    <p>
      Here is the Child component button that fire event both App and Child components listening to
    </p>
    <button @click="fireSomeEvent">Click me to trigger us both</button>
  </div>
</template>

<script>
import EventBus from '@/EventBus'

export default {
  name: 'Child',
  mounted() {
    /**
     * Here we're listening to both our custom events that will later be emitted somewhere
     */
    EventBus.$on('someEvent', (data) => {
      console.log(`I listen to someEvent in Child component, here's the data: ${data}`)
    })
    EventBus.$on('anotherEvent', (data) => {
      console.log(`I listen to anotherEvent in Child component, here's the data: ${data}`)
    })
  },
  methods: {
    fireSomeEvent() {
      /**
       * Here we emit event someEvent on EventBus
       * Now all the attached listeners with $on will fire
       */
      EventBus.$emit('someEvent', 'my-data')
    }
  }
}
</script>
