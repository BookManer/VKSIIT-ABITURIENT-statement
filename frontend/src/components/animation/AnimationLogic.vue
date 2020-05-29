<template>
  <span :class="state" class="animation-logic">
    <slot></slot>
  </span>
</template>

<script>
  let finished = true;
  let value = null;

  export default {
    name: 'AnimationController',
    props: ['start', 'process', 'finish', 'modeler', 'inTime'],
    data() {
      return {
        state: {},
        props: [],
      };
    },
    methods: {
      parseKeysDeepToLine(obj) {
        for(let prop in obj) {
          (typeof obj === 'object') && this.props.push(prop);

          if (typeof obj[prop] === 'object') {
            this.parseKeysDeepToLine(obj[prop]);
          } else {
            value = obj[prop];
            return;
          }
        }
      },
      async activateAnimation() {
        let { start, process, finish } = this;

        this.state = { 'animation-start': true };
        await this.waitForTime(start);

        this.state = { 'animation-process': true };
        await this.waitForTime(process);

        // Установить новое значение для элемента
        this.setStateByDynamicPropsModeler();

        this.state = { 'animation-finish': true };
        await this.waitForTime(finish);
        this.state = {};
      },
      waitForTime(time) {
        return new Promise((res, rej) => {
          setTimeout(() => {
            res(1);
          }, time);
        })
      },
      setStateByDynamicPropsModeler() {
        const { modeler, props, inTime } = this;

        this.parseKeysDeepToLine(modeler);

        let changeStateProp = props[0];
        
        // if property is CSS property
        if (props[0] === 'style') {
          const CSSprop = Object.keys(modeler[props[0]])[0];

          this.$slots.default[0].elm[changeStateProp][CSSprop] = value;
        } else {
          this.$slots.default[0].elm[changeStateProp] = modeler[changeStateProp];
        }
      },
    }
  };
</script>

<style scoped lang="scss">

</style>
