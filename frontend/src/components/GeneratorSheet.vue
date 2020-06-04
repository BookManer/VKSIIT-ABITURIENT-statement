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
        <div :class="getClassFormCon">
          <div v-for="field in schemas[step].fields"
            :key="field.valid_model"
            :class="{
              'form-con__field': true,
              'form-con__checkbox-block': field.folderComponent === 'FieldCheckbox'
            }">
            <component
              :is="field.folderComponent"
              :componentAttrs="field.props"
              :DOMAttrs="field.attrs"
              :checkedAllFormValid="checkedAllFormValid"
              :validators="field.validators"
              :propValidModel="field.valid_model"
              v-model="form[field.valid_model]"
              @checkValid="onCheckValidateField($event)"
            >
            {{validateObjectForm}}
              <template v-slot:default="{ validation }">
                <FieldErrorMessage
                  :validateFieldObject="validation"
                  :validators="field.validators"
                  :checkedAllFormValid="checkedAllFormValid"
                  :propValidModel="field.valid_model"
                ></FieldErrorMessage>
              </template>
            </component>
          </div>
        </div>
        <v-btn class="form-con__btn"
          v-if="step !== number_step - 1"
          @click="onNext"
          dark>Дальше</v-btn>
        <v-btn class="form-con__btn"
          v-else
          @click="onSubmit"
          :loading="isLoading"
          dark>Завершить</v-btn>
      </form>
    </v-card>

    <HomeFormBottomSheet
      :sheet="isSentMail"
      :message="submitResultText"
      @onStartStep="onNext"
    ></HomeFormBottomSheet>
    <div class="text-center">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
        <p>{{ loadingText }}</p>
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

import FieldTextField from "./form/FieldTextField.vue";
import FieldFileInput from "./form/FieldFileInput.vue";
import FieldSelect from "./form/FieldSelect.vue";
import FieldCheckbox from "./form/FieldCheckbox";

import FieldErrorMessage from "./FieldErrorMessage.vue";
import HomeFormBottomSheet from "./HomeFormBottomSheet.vue";

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
      submitResultText: "",
      loadingText: "",
      validateObjectForm: {},
      form: {}
    };
  },
  created() {
    this.isSentMail = false;
  },
  beforeMount() {
    this.setDefaultDataForm();
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
    },
    getClassFormCon() {
      const { step, number_step } = this;
      return { "form-con__fields": true, "form-con__last-step": step == number_step - 1 };
    }
  },
  methods: {
    async getDynamicComponent() {
      return await import(this.path)();
    },
    async onNext() {
      const { step, number_step, validateForm, form } = this;

      if (validateForm()) {
        this.checkedAllFormValid = false;

        store.commit("SET_DATA_FORMS", this.form);

        if (step + 1 < number_step) {
          store.commit("SET_STEP", step + 1);
        } else {
          store.commit("SET_STEP", 0);
          store.commit("RESET_DATA_FORMS");
          this.isSentMail = false;
        }

        this.validateObjectForm = {};
        this.setDefaultDataForm();
      } else {
        this.checkedAllFormValid = true;
      }
    },
    async onSubmit() {
      if (this.validateForm()) {
        this.isSentMail = false;
        this.checkedAllFormValid = false;
        this.isLoading = true;
        store.commit("SET_DATA_FORMS", this.form);

        try {
          await this.createPdfFile();
          await this.asyncSendMail();
        } catch (e) {
          console.error("Error:\n", e);
          this.isSentMail = false;
        }
      } else {
        this.checkedAllFormValid = true;
      }
    },
    async createPdfFile() {
      let payload = this.getFieldsDataForms;

      this.loadingText = "Создание документа-заявление в pdf формате...";
      const pdfBlob = await pdfCreate(payload);
      this.appendFormDataByFile();
      formDataObject.append("zayvlenie", pdfBlob, "zayvlenie.pdf");
    },
    async asyncSendMail() {
      let payload = this.getFieldsDataForms;

      this.loadingText = "Отправляем все данные на почту...";
      await sendMail(payload.email, formDataObject)
        .then(({ data }) => {
          this.submitResultText = data;
        })
        .catch(({ data }) => {
          this.submitResultText = data;
        });
      this.loadingText = "Готово!!!";

      return new Promise((res, rej) => {
        setTimeout(() => {
          this.isLoading = false;
          this.isSentMail = true;
          res();
        }, 3000);
      });
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
      const arr = Object.keys(this.validateObjectForm);
      const arrValidatObjectForm = Object.keys(this.validateObjectForm);
      const requiredFields = this.schemas[this.step].fields.filter(({validators}) => !!validators);

      return (
        arr.every(key => {
          return this.validateObjectForm[key];
        }) && arrValidatObjectForm.length >= requiredFields.length
      );
    },
    setDefaultDataForm() {
      const { step } = this;

      this.schemas[store.state.step].fields.forEach(({ valid_model }) => {
        Vue.set(this.form, valid_model, store.state.dataForms[`form${step}`][valid_model]);
      });
    },
    onCheckValidateField({ type_field, isValid }) {
      this.validateObjectForm[type_field] = isValid;
      const arr = Object.keys(this.validateObjectForm);

      console.log(
        arr.every(key => {
          return this.validateObjectForm[key];
        })
      );
    }
  },
  components: {
    HomeFormBottomSheet,
    FieldTextField,
    FieldFileInput,
    FieldErrorMessage,
    FieldSelect,
    FieldCheckbox,
  }
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
