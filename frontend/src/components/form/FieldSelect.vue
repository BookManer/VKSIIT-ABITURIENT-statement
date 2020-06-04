<template>
    <div>
        <VSelect v-bind="{...componentAttrs, ...DOMAttrs}"
                    @change="onChange"
                    :items="getSelectItems()"></VSelect>
        <slot v-bind:validation="$v"></slot>
    </div>
</template>

<script>
import VSelect from "vuetify/lib/components/VSelect/VSelect.js";
import {validationMixin} from '../../mixins/validationFieldForm.mixin.js';


export default {
    model: {
        prop: 'valid_model',
        event: 'change',
    },
    mixins: [validationMixin],
    name: 'FieldSelect',
    computed: {
        hasCategorySirot() {
            return this.DOMAttrs.name === 'category_sirot';
        }
    },
    methods: {
        onChange($event) {
            const {propValidModel} = this;

            this.form[propValidModel] = $event;
            
            this.$emit('change', $event);
            this.$emit('checkValid', {type_field:propValidModel, isValid: this.isValid});
        },
        getSelectItems() {
            if (this.hasCategorySirot) {
                return this.componentAttrs.items.map(({type}) => type); 
            }
            
            return this.componentAttrs.items;
        }
    },
    components: {VSelect},
}
</script>

<style>

</style>