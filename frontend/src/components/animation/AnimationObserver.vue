<template>
  <span class="animation-observer">
    <AnimationLogic ref="animationLogic"
                    :modeler="modeler"
                    :start="start"
                    :process="process"
                    :finish="finish"
                    :inTime="inTime">
      <slot></slot>
    </AnimationLogic>
  </span>
</template>

<script>
import AnimationLogic from './AnimationLogic.vue';

export default {
  name: 'AnimationObserver',
  data() {
    return {
      count: 0,
    };
  },
  props: ['start', 'process', 'finish', 'modeler', 'inTime'],
  async updated() {
    await this.$refs.animationLogic.activateAnimation();
  },
  async mounted() {
    await this.$refs.animationLogic.activateAnimation();
  },
  components: { AnimationLogic },
};
</script>

<style lang="scss">

</style>
