import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    step: 3,
    number_step: 4,
    titles: [
      'О себе',
      'Аттестат',
      'Паспорт',
      'Общежитие, специальность, согласия',
    ],
    dataForms: {
      form0: {
        first_name: '',
        second_name: '',
        third_name: '',
        date_birthday: '',
        place_live: '',
        number_phone: '',
        email: '',
      },
      form1: {
        attestat_seria: '',
        attestat_number: '',
        average_mark: '',
        copy_attestat: null,
      },
      form2: {
        pasport_seria: '',
        pasport_number: '',
        by_someone_gived: '',
        date_giving: '',
        scan_pasport: null,
      },
      form3: {
        speciality: '',
        category_sirot: '',
        need_dormitory: '',
        agree_parents: '',
      }
    }
  },
  getters: {
    getFieldsDataForms(state) {
      let payload = {};
      Object.entries(state.dataForms)
      .map(([key, value]) => value)
      .forEach((dataForm) => { 
          payload = { ...payload, ...dataForm };
      });

      return payload;
    },
  },
  mutations: {
    SET_STEP(state, payload) {
      let value = payload;
      if (typeof payload === 'object') {
        value = payload.step;
      }

      state.step = value;
    },
    SET_DATA_FORMS(state, payload) {
      state.dataForms[`form${state.step}`] = payload;
    },
    RESET_DATA_FORMS(state) {
      const iterator = new Array(state.number_step).fill('');
      iterator.forEach((el, index) => {
        state.dataForms[`form${index}`] = {};
      })
    }
  },
  actions: {
  },
  modules: {
  },
});
