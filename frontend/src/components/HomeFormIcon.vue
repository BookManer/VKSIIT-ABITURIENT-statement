<template>
  <animation-observer :modeler="{ empty: step }"
                      :start="700"
                      :process="1000"
                      :finish="500">
    <svg class="header__icon"><use :xlink:href="`./step_icon_${step}.svg#layer`"></use></svg>
  </animation-observer>
</template>

<script>
import AnimationObserver from './animation/AnimationObserver.vue';

export default {
  props: ['step'],
  components: { AnimationObserver }
};
</script>

<style lang="scss">
  .header {

    &__icon {
      width: 60px;
      height: 60px;

      opacity: 1;

      @media all and (max-width: 600px) {
          display: none;
      }

      transition: all .6s ease;
    }

    .animation-start &__icon {
        transform: translateY(-50%);
        opacity: 0;
    }
    .animation-process &__icon {
        transform: translateY(50%);
        opacity: 0;
    }
    .animation-finish &__icon {
        transform: translateY(0);
        opacity: 1;
    }
  }
</style>
