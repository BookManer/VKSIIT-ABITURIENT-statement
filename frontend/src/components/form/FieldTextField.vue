<template>
    <div>
        <VTextField v-bind="{...componentAttrs, ...DOMAttrs}"
                    @input="onInput"></VTextField>
        <slot v-bind:validation="$v"></slot>
    </div>
</template>

<script>
import VTextField from "vuetify/lib/components/VTextField/VTextField.js";
import {validationMixin} from '../../mixins/validationFieldForm.mixin.js';


export default {
    model: {
        prop: 'valid_model',
        event: 'input',
    },
    mixins: [validationMixin],
    name: 'FieldTextField',
    methods: {
        onInput($event) {
            const {propValidModel} = this;

            this.form[propValidModel] = $event;
            this.$emit('input', $event);
            this.$emit('checkValid', {type_field:propValidModel, isValid: this.isValid});
        },
    },
    components: {VTextField},
}
</script>

<style>

</style>