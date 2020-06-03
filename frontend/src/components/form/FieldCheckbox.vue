<template>
    <div>
        <VCheckbox v-bind="{...componentAttrs, ...DOMAttrs}"
                    @change="onChange"></VCheckbox>
        <slot v-bind:validation="$v"></slot>
    </div>
</template>

<script>
import VCheckbox from "vuetify/lib/components/VCheckbox/VCheckbox.js"
import {validationMixin} from '../../mixins/validationFieldForm.mixin.js';


export default {
    model: {
        prop: 'valid_model',
        event: 'change',
    },
    mixins: [validationMixin],
    name: 'FieldCheckbox',
    methods: {
        onChange($event) {
            const {propValidModel} = this;

            this.form[propValidModel] = $event;
            this.$emit('change', $event);
            this.$emit('checkValid', {type_field:propValidModel, isValid: this.isValid});
        },
    },
    components: {VCheckbox},
}
</script>

<style>

</style>