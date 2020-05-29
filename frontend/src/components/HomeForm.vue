<template>
    <div class="form">
        <FormHeader></FormHeader>
        <FormSheetStep></FormSheetStep>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

// import AnimationObserver from './animation/AnimationObserver.vue';

import FormHeader from './FormHeader.vue';
import FormSheetStep from './FormSheetStep';

export default {
    name: 'HomeForm',
    data() {
        return {
            items: [1,2,3,4,5,6,7,8,9,10],
        }
    },
    computed: {
        ...mapState(['step']),
    },
    methods: {
        ...mapMutations(['SET_STEP']),
    },
    components: { FormHeader, FormSheetStep }
}
</script>

<style lang="scss">
    .form {
        position: relative;
        width: 100%;
        
        overflow: hidden;
    }

    .transition-block {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;

            background-color: rgba(240, 240, 240, .9);

            transition: all 1s ease;
            
            z-index: 99;
        }

    .animation-start .transition-block {
        left: 0;
        background-color: white;
    }
    .animation-process .transition-block {
        left: 0;
        background-color: white;
    }
    .animation-finish .transition-block {
        left: -100%;
        background-color: rgba(240, 240, 240, .9);
    }
</style>