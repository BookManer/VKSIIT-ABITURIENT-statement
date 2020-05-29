import { required, maxLength, minLength, email, decimal, } from 'vuelidate/lib/validators';

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
                    required,
                },
                folderComponent: 'VTextField', 
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
                    required,
                    
                },
                folderComponent: 'VTextField', 
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
                    required,
                    
                }, 
                folderComponent: 'VTextField', 
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
                    required,
                },
                folderComponent: 'VTextField',  
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
                    required,
                },
                folderComponent: 'VTextField',  
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
                    required,
                    minLength: minLength(11),
                    maxLength: maxLength(12),
                },
                folderComponent: 'VTextField', 
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
                    required,
                    email,
                },
                folderComponent: 'VTextField', 
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
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(3)
                },
                folderComponent: 'VTextField', 
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
                    required,
                    minLength: minLength(9),
                    maxLength: maxLength(9)
                },
                folderComponent: 'VTextField', 
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
                    required,
                    decimal,
                },
                folderComponent: 'VTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'copy_attestat',
                },
                props: {
                    label: 'Копия аттестата',
                    flat: true,
                },
                folderComponent: 'VFileInput',              
                valid_model: 'copy_attestat',  
                validators: {
                    required,
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
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(4)
                },
                folderComponent: 'VTextField', 
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
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(6)
                },
                folderComponent: 'VTextField', 
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
                    required,
                },  
                folderComponent: 'VTextField', 
                component: 'v-text-field',
            },  {
                attrs: {
                    name: 'date_giving',
                    type: 'date',
                },
                props: {
                    label: 'Дата выдачи',
                },
                folderComponent: 'VTextField',              
                valid_model: 'date_giving',
                validators: {
                    required,
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
                    required,
                },
                folderComponent: 'VFileInput',
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
                    required,
                },
                folderComponent: 'VSelect', 
                component: 'v-select',
            }, {
                attrs: {
                    name: 'category_sirot',
                },
                props: {
                    label: 'Категория сирот',
                    items: ['item1', 'item2'],
                },           
                valid_model: 'category_sirot',
                validators: {
                    required,
                }, 
                folderComponent: 'VSelect', 
                component: 'v-select',
            }, {
                attrs: {
                    name: 'need_dormitory',
                },
                props: {
                    label: 'Нуждаюсь в общежитии',
                },           
                valid_model: 'need_dormitory',
                validators: {
                    required,
                },
                folderComponent: 'VCheckbox', 
                component: 'v-checkbox',
            }, {
                attrs: {
                    name: 'agree_parents',
                },
                props: {
                    label: 'Согласие родителей',
                },           
                valid_model: 'agree_parents',
                folderComponent: 'VCheckbox', 
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
                    required,
                },
                folderComponent: 'VCheckbox', 
                component: 'v-checkbox',
            }
        ]
    }
]