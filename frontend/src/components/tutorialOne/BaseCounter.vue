<template>
  <div id="counter">
      <span>{{ counter.value }}</span>
      <base-iteration-counter :value="counter.value"
                              @onIterationCounter="counter.value = $event">
                              </base-iteration-counter>
  </div>
</template>

<script>
import BaseIterationCounter from './BaseIterationCounter.vue';

export default {
    name: 'BaseCounter',
    data() {
        return {
            counter: {
                value: 0, 
            },
        }
    },
    components: { BaseIterationCounter, },
}
</script>