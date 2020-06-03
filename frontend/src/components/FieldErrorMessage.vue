<template>
    <div>
        <div v-for="{validator, error_message} in getValidators" :key="validator">
            <div v-if="!validateFieldObject.form[propValidModel][validator] && checkedAllFormValid"
                 class="form-con__error-message">{{error_message}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['validateFieldObject', 'validators', 'propValidModel', 'checkedAllFormValid'],
    name: 'FieldErrorMessage',
    computed: {
        getValidators() {
            if(!this.validators) {
                return [];
            }

            const {validateFieldObject, propValidModel} = this;
            const arr = Object.keys(this.validators);
            const validators = arr.map((key, index) => {
                return {
                    validator: index,
                    error_message: this.validators[key].error_message,
                }
            })

            return validators;
        }
    },
}
</script>

<style>

</style>