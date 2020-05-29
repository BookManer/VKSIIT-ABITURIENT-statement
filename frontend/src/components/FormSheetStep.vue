<template>
    <div>
        <GeneratorSheet :schemas="sheet" ref="generatedSheet"></GeneratorSheet>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import sheets from '../config/sheets.js';

import GeneratorSheet from './GeneratorSheet.vue';

export default {
    name: 'FormSheetStep',
    computed: {
        ...mapState(['step', 'titles']),
        sheet() {
            return sheets;
        }
    },
    methods: {
        next() {
            this.$refs.generatedSheet.next();
        }
    },
    components: { GeneratorSheet }
}
</script>

<style>

</style>