<template>
  <v-app class="form-con">
    <v-card class="form-con__wrap" flat :loading="isLoading">
      <v-progress-linear
        class="form-con__progressbar"
        buffer-value="100"
        :value="((step + 1) / number_step) * 100"
        :color="`rgb(${240 - (step + 1) * 35}, ${(step + 1) * 55}, ${240 - (step + 1) * 35})`"
        stream
        opacity="0.2"
        height="10"
      ></v-progress-linear>
      <form @submit="() => false" ref="customForm">
        <div :class="{ 'form-con__fields': true, 'form-con__last-step': step == number_step - 1 }">
          <div
            v-for="field in schemas[step].fields"
            :key="field.valid_model"
            :class="{
              'form-con__field': true,
              'form-con__checkbox-block': field.folderComponent === 'VCheckbox'
            }"
          >
            <component
              :is="field.component"
              color="success"
              v-bind="field.props"
              :label="
                `${field.props.label} ${
                  !$v.form[field.valid_model].required && checkedAllFormValid ? '*' : ''
                }`
              "
              :name="field.attrs.name"
              :type="field.attrs.type"
              :ref="
                `${
                  field.folderComponent === 'VFileInput' ? `inputFile_${field.attrs.name}` : false
                }`
              "
              v-model="$v.form[field.valid_model].$model"
            ></component>
            <div
              class="form-con__error-message"
              v-if="$v.form[field.valid_model].$error && checkedAllFormValid"
            >
              <div v-if="!$v.form[field.valid_model].required && checkedAllFormValid">
                Поле обязательно для заполнения
              </div>
              <div v-if="$v.form[field.valid_model].email && checkedAllFormValid">
                Такой почты не существует
              </div>
              <div v-if="$v.form[field.valid_model].minLength && checkedAllFormValid">
                Значение содержит недостаточное количество символов
              </div>
              <div v-if="$v.form[field.valid_model].maxLength && checkedAllFormValid">
                Значение содержит недостаточное количество символов
              </div>
            </div>
          </div>
        </div>
        <v-btn class="form-con__btn" v-if="step !== number_step - 1" @click="onNext" dark
          >Дальше</v-btn
        >
        <v-btn class="form-con__btn" v-else @click="onSubmit" :loading="isLoading" dark>Завершить</v-btn>
      </form>
    </v-card>
    <HomeFormBottomSheet :sheet="isSentMail" @onStartStep="onNext"></HomeFormBottomSheet>
    <div class="text-center">
        <v-overlay :value="isLoading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
          <p>{{loadingText}}</p>
        </v-overlay>
    </div>
  </v-app>
</template>

<script>
import pdfCreate from "../helpers/pdf.js";
import sendMail from "../helpers/api.js";

import Vue from "vue";
import store from "../store/index.js";
import { mapState, mapGetters } from "vuex";

import VTextField from "vuetify/lib/components/VTextField/VTextField.js";
import VFileInput from "vuetify/lib/components/VFileInput/VFileInput.js";
import VCheckbox from "vuetify/lib/components/VCheckbox/VCheckbox.js";
import VSelect from "vuetify/es5/components/VSelect/index.js";
import VMenu from "vuetify/lib/components/VMenu/VMenu.js";
import HomeFormBottomSheet from "./HomeFormBottomSheet.vue";

const vuetifyComponents = {
  VTextField,
  VFileInput,
  VCheckbox,
  VSelect
};

let validationObject = {
  form: {}
};

var formDataObject = new FormData();

export default {
  name: "GeneratorSheet",
  props: {
    schemas: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      isLoading: false,
      checkedAllFormValid: false,
      isSentMail: undefined,
      loadingText: '',
      form: {}
    };
  },
  created() {
    this.setDefaultDataForm();
    this.isSentMail = false;
  },
  beforeMount() {
    this.schemas.forEach(model => {
      model.fields.forEach(field => {
        const { valid_model, validators } = field;
        validationObject.form[valid_model] = { ...validators };
      });
    });
    this.isSentMail = false;
  },
  destroyed() {
    store.commit("RESET_DATA_FORMS");
    this.form = {};
  },
  computed: {
    ...mapState(["step", "number_step"]),
    ...mapGetters(["getFieldsDataForms"]),
    isDisabled() {
      return this.checkedAllFormValid;
    }
  },
  methods: {
    async getDynamicComponent() {
      return await import(this.path)();
    },
    async onNext() {
      const { step, number_step, validateForm, form } = this;
      
      if (!validateForm()) {
        this.checkedAllFormValid = false;

        store.commit("SET_DATA_FORMS", this.form);

        if (step + 1 < number_step) {
          store.commit("SET_STEP", step + 1);
        } else {
          store.commit("SET_STEP", 0);
          store.commit('RESET_DATA_FORMS');
          this.isSentMail = false;
        }

        this.setDefaultDataForm();
      } else {
        this.checkedAllFormValid = true;
      }
    },
    async onSubmit() {
      if (!this.validateForm()) {
        this.isSentMail = false;
        this.checkedAllFormValid = false;
        this.isLoading = true;
        store.commit("SET_DATA_FORMS", this.form);

        try {
          let payload = this.getFieldsDataForms;

          this.loadingText = 'Создание документа-заявление в pdf формате...';
          const pdfBlob = await pdfCreate(payload);
          this.appendFormDataByFile();
          formDataObject.append("zayvlenie", pdfBlob, "zayvlenie.pdf");

          this.loadingText = 'Отправляем все данные на почту...';
          await sendMail(payload.email, formDataObject);
          this.loadingText = 'Готово!!!';
          setTimeout(() => {
            this.isLoading = false;
            this.isSentMail = true;
          }, 2000);
        } catch (e) {
          console.error("Error:\n", e);
          this.isSentMail = false;
        }
      } else {
        this.checkedAllFormValid = true;
      }
    },
    appendFormDataByFile() {
      const fields = this.getFieldsDataForms;
      Object.keys(fields).forEach(key => {
        const field = fields[key];

        if (field instanceof File) {
          console.log(key, field);
          formDataObject.append(key, field);
        }
      });

      return false;
    },
    validateForm() {
      this.schemas[store.state.step].fields.forEach(({ valid_model }) => {
        this.$v.form[valid_model].$touch();
      });
      const isInvalidCurrentFields = this.schemas[store.state.step].fields.some(
        ({ valid_model }) => {
          return this.$v.form[valid_model].$invalid;
        }
      );

      return isInvalidCurrentFields;
    },
    setDefaultDataForm() {
      const { step } = this;

      this.schemas[store.state.step].fields.forEach(({ valid_model }) => {
        Vue.set(this.form, valid_model, store.state.dataForms[`form${step}`][valid_model]);
      });
    }
  },
  validations: { ...validationObject },
  components: { VTextField, VFileInput, VCheckbox, VSelect, VMenu, HomeFormBottomSheet }
};
</script>

<style lang="scss">
.v-application--wrap {
  min-height: auto !important;
}

.form-con {
  &__wrap {
    display: flex;
    flex-flow: column nowrap;
    padding-bottom: 60px;

    background-color: rgba(250, 250, 250, 0.9);
  }

  &__progressbar {
    margin-bottom: 60px;
  }

  &__fields {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(1fr, 283px));
    grid-template-areas:
      "field field field"
      "field field field"
      "field field field"
      "checkbox checkbox checkbox"
      "checkbox checkbox checkbox";
    grid-column-gap: 31px;
    margin-left: 90px;
    margin-right: 90px;
    grid-area: fields;

    @media all and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "field field"
        "field field"
        "checkbox checkbox"
        "checkbox checkbox";
    }
    @media all and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        "field"
        "field"
        "checkbox"
        "checkbox"
        "checkbox";
      margin-left: 40px;
      margin-right: 40px;
    }
    @media all and (max-width: 425px) {
      grid-template-columns: 1fr;
      margin-left: 15px;
      margin-right: 15px;
    }
  }

  &__last-step {
    display: flex;
    flex-flow: column nowrap;
  }

  &__field {
    position: relative;
  }

  &__checkbox-block {
    margin-left: -90px;
    margin-right: -90px;
    padding-left: 90px;
    background-color: rgba(159, 199, 222, 23%);

    @media all and (max-width: 600px) {
      padding-left: 40px;
      margin-left: -40px;
      margin-right: -40px;
    }
    @media all and (max-width: 425px) {
      padding-left: 15px;
      margin-left: -15px;
      margin-right: -15px;
    }
  }

  &__error-message {
    color: tomato;
  }

  &__btn {
    font-size: 24px;

    width: 140px;
    margin-top: 60px;
    margin-left: 90px;

    background-color: #64c898 !important;

    @media all and (max-width: 600px) {
      margin-top: 40px;
      margin-left: 40px;
    }
    @media all and (max-width: 425px) {
      margin-left: 15px;
    }
  }
}
</style>
