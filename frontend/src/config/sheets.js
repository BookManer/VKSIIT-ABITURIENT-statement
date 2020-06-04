import { required, maxLength, minLength, email } from 'vuelidate/lib/validators';
import decimal from 'vuelidate/lib/validators/decimal';

const limitAverageMark = (value) => {
    return value >= 2 && value <= 5;
};

export const $v = {
    required: {
        error_message: 'Обязательно для заполнения',
        valid: required,
    },
    maxLength(value) {
        return {
            error_message: `Превышен лимит в ${value} символов`,
            valid: maxLength(value),
        }    
    },
    minLength(value) {
        return {
            error_message: `Недостаточно символов, нужно как минимум ${value}`,
            valid: minLength(value),
        }
    },
    email: {
        error_message: 'Некорректно введена почта',
        valid: email,
    },
    decimal: {
        error_message: 'Число должно быть десятичным',
        valid: decimal,
    },
    limitAverageMark: {
        error_message: 'Допустымый диапазон значений [от 2 до 5]',
        valid: limitAverageMark,
    }
};

export default [
    // Model's a form for sheet 
    {
        id: 0,
        name: 'About me',
        fields: [
            {
                attrs: {
                    name: 'second_name',
                    type: 'text',
                },
                props: {
                    label: 'Фамилия',
                },           
                valid_model: 'second_name',
                validators: {
                    required: $v.required,
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'first_name',
                    type: 'text',
                },
                props: {
                    label: 'Имя',
                },                
                valid_model: 'first_name',
                validators: {
                    required: $v.required,
                    
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'third_name',
                    type: 'text',
                },
                props: {
                    label: 'Отчество',
                },                
                valid_model: 'third_name',
                validators: {
                    required: $v.required,
                }, 
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'date_birthday',
                    type: 'date',
                },
                props: {
                    label: 'Дата рождения',
                },                
                valid_model: 'date_birthday',
                validators: {
                    required: $v.required,
                },
                folderComponent: 'FieldTextField',  
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'place_live',
                    type: 'text',
                },
                props: {
                    label: 'Адрес проживания',
                    placeholder: "160000, г. Вологда, ул. Некрасова 86 - 26"
                },                
                valid_model: 'place_live',
                validators: {
                    required: $v.required,
                },
                folderComponent: 'FieldTextField',  
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'number_phone',
                    type: 'text',
                },  
                props: {
                    label: 'Номер телефона',
                },              
                valid_model: 'number_phone',
                validators: {
                    required: $v.required,
                    minLength: $v.minLength(11),
                    maxLength: $v.maxLength(12),
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'email',
                    type: 'email',
                },
                props: {
                    label: 'E-mail',
                },               
                valid_model: 'email',  
                validators: {
                    required: $v.required,
                    email: $v.email,
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            }
        ]
    }, {
        id: 1,
        name: 'Atestat',
        fields: [
            {
                attrs: {
                    name: 'attestat_seria',
                    type: 'text',
                },
                props: {
                    label: 'Серия',
                },           
                valid_model: 'attestat_seria',
                validators: {
                    required: $v.required,
                    minLength: $v.minLength(3),
                    maxLength: $v.maxLength(3)
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'attestat_number',
                    type: 'text',
                },
                props: {
                    label: 'Номер',
                },                
                valid_model: 'attestat_number',  
                validators: {
                    required: $v.required,
                    minLength: $v.minLength(9),
                    maxLength: $v.maxLength(9)
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'average_mark',
                    type: 'text',
                },
                props: {
                    label: 'Средний балл',
                },                
                valid_model: 'average_mark',
                validators: {
                    required: $v.required,
                    decimal: $v.decimal,
                    limitAverageMark: $v.limitAverageMark,
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'copy_attestat',
                },
                props: {
                    label: 'Копия аттестата',
                    flat: true,
                },
                folderComponent: 'FieldFileInput',              
                valid_model: 'copy_attestat',  
                validators: {
                    required: $v.required,
                },
                component: 'v-file-input',
            }
        ]
    }, {
        id: 2,
        name: 'Pasport',
        fields: [
            {
                attrs: {
                    name: 'pasport_seria',
                    type: 'text',
                },
                props: {
                    label: 'Серия',
                },           
                valid_model: 'pasport_seria',
                validators: {
                    required: $v.required,
                    minLength: $v.minLength(4),
                    maxLength: $v.maxLength(4)
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'pasport_number',
                    type: 'text',
                },
                props: {
                    label: 'Номер',
                },                
                valid_model: 'pasport_number',
                validators: {
                    required: $v.required,
                    minLength: $v.minLength(6),
                    maxLength: $v.maxLength(6)
                },
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'by_someone_gived',
                    type: 'text',
                },
                props: {
                    label: 'Кем выдан',
                },                
                valid_model: 'by_someone_gived',
                validators: {
                    required: $v.required,
                },  
                folderComponent: 'FieldTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'date_giving',
                    type: 'date',
                },
                props: {
                    label: 'Дата выдачи',
                },
                folderComponent: 'FieldTextField',              
                valid_model: 'date_giving',
                validators: {
                    required: $v.required,
                },  
                component: 'v-text-field',
            }, {
                attrs: {
                    name: 'scan_pasport'
                },
                props: {
                    label: 'Скан паспорта',
                    flat: true,
                },
                valid_model: 'scan_pasport',
                validators: {
                    required: $v.required,
                },
                folderComponent: 'FieldFileInput',
                component: 'v-file-input',
            }
        ]
    }, {
        id: 3,
        name: 'Dormitory, specialty, consent',
        fields: [
            {
                attrs: {
                    name: 'specialty',
                },
                props: {
                    label: 'Специальность',
                    items: ['item1', 'item2'],
                },           
                valid_model: 'specialty',
                validators: {
                    required: $v.required,
                },
                folderComponent: 'FieldSelect', 
                component: 'v-select',
            }, {
                attrs: {
                    name: 'category_sirot',
                },
                props: {
                    label: 'Категория сирот',
                    items: [{
                        type: 'инвалид',
                        accepted_document: [{
                            id: 0,
                            name: 'Подтверждение инвалидности',
                        }],
                    }, {
                        type: 'сирота',
                        accepted_document: [{
                            id: 0,
                            name: 'Подтверждение сиротства',
                        }]
                    }, {
                        type: 'многодетная семья',
                        accepted_document: [{
                            id: 0,
                            name: 'Подтверждение многодества, хах',
                        }]
                    }],
                },           
                valid_model: 'category_sirot',
                validators: {
                    required: $v.required,
                }, 
                folderComponent: 'FieldSelect', 
                component: 'v-select',
            }, {
                attrs: {
                    name: 'accepted_document',
                },
                props: {
                    label: 'Подтверждающий документ',
                },
                valid_model: 'accepted_document',
                folderComponent: 'FieldFileInput',
            }, {
                attrs: {
                    name: 'need_dormitory',
                },
                props: {
                    label: 'Нуждаюсь в общежитии',
                },           
                valid_model: 'need_dormitory',
                folderComponent: 'FieldCheckbox', 
                component: 'v-checkbox',
            }, {
                attrs: {
                    name: 'agree_parents',
                },
                props: {
                    label: 'Согласие родителей',
                },           
                valid_model: 'agree_parents',
                folderComponent: 'FieldCheckbox', 
                component: 'v-checkbox',
            }, {
                attrs: {
                    name: 'agree_personal_data',
                },
                props: {
                    label: 'Согласие на обработку персональных данных',
                },           
                valid_model: 'agree_personal_data',
                validators: {
                    required: $v.required,
                },
                folderComponent: 'FieldCheckbox', 
                component: 'v-checkbox',
            }
        ]
    }
]