<template>
    <div>
        <VFileInput v-bind="{...componentAttrs, ...DOMAttrs}"
                    @change="onChange"></VFileInput>
        <slot v-bind:validation="$v"></slot>
    </div>
</template>

<script>
import VFileInput from "vuetify/lib/components/VFileInput/VFileInput.js";
import {validationMixin} from '../../mixins/validationFieldForm.mixin.js';


export default {
    model: {
        prop: 'valid_model',
        event: 'change',
    },
    mixins: [validationMixin],
    name: 'FieldFileInput',
    methods: {
        onChange($event) {
            const {propValidModel} = this;

            this.form[propValidModel] = $event;
            this.$emit('change', $event);
            this.$emit('checkValid', {type_field:propValidModel, isValid: this.isValid});
        },
    },
    components: {VFileInput},
}
</script>

<style>

</style>