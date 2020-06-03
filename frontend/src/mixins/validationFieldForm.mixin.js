import Vue from 'vue';

export const validationMixin = {
    props: ['componentAttrs', 'DOMAttrs', 'valid_model', 'propValidModel', 'validators', 'checkedAllFormValid'],
    data() {
        return {
            form: {},
        }
    },
    beforeMount() {
        const { propValidModel, valid_model = '' } = this;
        Vue.set(this.form, propValidModel, valid_model);
    },
    computed: {
        getValidators() {
            if(!this.validators) {
                return [];
            }
            
            const arr_validators = Object.keys(this.validators);
            const validators = arr_validators.map(key => {
                return this.validators[key].valid;
            })

            return validators;
        },
        isValid() {
            const {validators,propValidModel} = this;
            if (!validators) {
                return true;
            }
            const arr = Object.keys(validators);
            return arr.every((key, index) => this.$v.form[propValidModel][index]);
        }
    },
    validations() {
        return {
            form: {
                [this.propValidModel]: { ...this.getValidators },
            }
        }
    },
}