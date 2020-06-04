import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../plugins/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const countPixelsInSm = 37.938105;
const pageMargins = [
  1.25 * countPixelsInSm, // left margin
  0.5 * countPixelsInSm, // top margin
  0.5 * countPixelsInSm, // right margin
  1.5 * countPixelsInSm // bottom margin
];

const monthByNumber = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]

pdfMake.fonts = {
  timesNewRoman: {
    normal: "timesNewRoman.ttf"
  }
};

const pdfCreate = async payload => {
  // Array: 0 - year, 1 - month, 2 - day
  const dateGiving = payload.date_giving.split('-');
  const dateBirthday = payload.date_birthday.split('-');
  console.log(payload);

  let docDefinition = {
    pageMargins,
    defaultStyle: {
      font: "timesNewRoman"
    },
    content: [
      {
        columns: [
          {
            width: "50%",
            text: ""
          },
          {
            width: "auto",
            text: [
              {
                text: `Приложение 1 к Правилам приема граждан в автономное профессиональное
                    образовательное учреждение Вологодской области «Вологодский колледж связи
                    и информационных технологий» на 2019 -2020 учебный год\n\n`,
                fontSize: 7,
                color: "#8db3e2",
              }
            ],
            margin: [-22, 0, 0, 0],
          }
        ]
      },
      {
        columns: [
          {
            width: "50%",
            text: ""
          },
          {
            width: "auto",
            text: [
              {
                text: 'Директору АПОУ ВО «ВКСиИТ» И.В. Дарманской\n',
                fontSize: 11,
                lineHeight: 1.15,
              },
              {
                  text: `${payload.second_name} ${payload.first_name} ${payload.third_name}\n`,
                  fontSize: 11,
                  alignment: "center",
              },
              {
                  text: '(фамилия, имя, отчество полностью)',
                  fontSize: 8,
                  alignment: "center",
              },
              {
                  text: '\n\n',
                  fontSize: 11,
              },
              {
                text: `паспорт ${payload.pasport_seria}, № ${payload.pasport_number}
                выдан ${payload.by_someone_gived}
                дата выдачи «${dateGiving[2]}» ${monthByNumber[dateGiving[1] - 1]} ${dateGiving[0]}\n\n\n`,
                fontSize: 11,
                alignment: "left",
            },
            ],
            margin: [0, 11, 0, 0]
          }
        ]
      },
      {
          text: 'заявление',
          alignment: "center",
          lineHeight: 1.15,
      },
      {
          text: 'Прошу зачислить меня на очную форму обучения по специальности ' + `«${payload.specialty}» в рамках цифр\n`,
          margin: [11*3, 0, 0, 0],
          lineHeight: 1.15,
      },
      {
          text: `контрольного приема.
          О себе сообщаю следующее: родился(ась) (дата, место рождения) ${payload.date_birthday.split("-").reverse().join('.')}, ${payload.place_live}
          Окончил(а) в 201.. году  (название учебного учреждения)
          Документ об образовании №  (серия и номер) ${payload.attestat_seria} ${payload.attestat_number}
          СПО получаю впервые ______________(подпись) _______________________(расшифровка)
          В общежитии нуждаюсь / не нуждаюсь ${payload.need_dormitory ? '[нуждаюсь]' : '[не нуждаюсь]'}(подпись) ____________________(расшифровка)
          `,
          lineHeight: 1.15,
      },
      {
          text: 'К заявлению прилагаю следующие документы: аттестат \ копия аттестата, 4 фотографии, копию\n',
          margin: [11*3, 0, 0, 0],
          lineHeight: 1.15,
      },
      {
          text: 'паспорта, договор о целевом обучении, сертификаты, дипломы.\n\n',
          lineHeight: 1.15,
      },
      {
          text: 'С датой предоставления оригинала документа государственного образца ознакомлен (а):',
          margin: [11*3, 0, 0, 0],
          lineHeight: 1.15,
      },
      {
          text: '_____________(подпись)_____________________________(расшифровка) «____»___________2020г.\n\n',
          lineHeight: 1.15,
      },
      {
          text: 'С Уставом образовательного учреждения, лицензией на право осуществления образовательной\n',
          margin: [11*3, 0, 0, 0],
          lineHeight: 1.15,
      },
      {
          text: 'деятельности и приложениями, свидетельством о государственной аккредитации образовательного учреждения, аккредитацией образовательной программы по каждой специальности, дающим право на выдачу документа государственного образца о среднем профессиональном образовании. С Положением об обработке и защите персональных данных субъектов образовательного процесса (обучающихся, студентов, слушателей и их законных представителей) автономного профессионального образовательного учреждения Вологодской области  «Вологодский колледж связи и информационных технологий» (далее Положение) и другими документами, регламентирующими организацию образовательного процесса ознакомлен(а). Достоверность представленных сведений о себе подтверждаю\n\n',
          lineHeight: 1.15,
      },
      {
        columns: [
            {
                width: "45%",
                text: [{
                    text: 'Абитуриент:_______________________/\n',
                    margin: [11*3, 0, 0, 0],
                    alignment: "right",
                    lineHeight: 1,
                }, {
                    text: '(Подпись/ расшифровка)',
                    fontSize: 6,
                    alignment: "right",
                }]
            },
            {
                width: "55%",
                text: '_____________________________________________',
                lineHeight: 1,
            }
        ]
      },
      {
          text: `\n\n\n\n\n\n\nПодпись ответственного лица приемной комиссии:_____________________________________
          «______»___________________ 2019г.
          `
      }
    ]
  };

  // const pdf = await pdfMake.createPdf(docDefinition);

  const pdf = await pdfMake.createPdf(docDefinition);
  return new Promise((res, rej) => {
    pdf.getBlob((blob) => {
      setTimeout(() => {
        res(blob);
      }, 1500);
    });
  })
};

export default pdfCreate;
