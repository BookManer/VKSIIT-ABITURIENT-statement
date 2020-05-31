require('dotenv').config(); // local access to env

const express = require('express');
const server = express();
const path = require('path');
const cors = require('cors');
let multiparty = require('multiparty');
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'borshblack@gmail.com',
        pass: 'noangokeq2021',
    }
})

server.use(cors());
server.use(express.json()) // for parsing application/json
server.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const API = "api/methods";

server.listen(process.env.PORT || 3000, () => {
    console.log("Server has been listened!");
});

let formDataObject = {};

<<<<<<< HEAD
=======
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
})

>>>>>>> 55f0e32... changed
server.post(`/${API}/sendMail`, (req, res) => {
    if (req.headers['content-type'].indexOf('multipart') != -1) {
        let form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            formDataObject = [
                files.copy_attestat[0],
                files.scan_pasport[0],
                files.zayvlenie[0],
            ];
            res.send('ok');
        });
    } else if (req.headers['content-type'].indexOf('json') != -1) {
        if (Object.entries(formDataObject).length != 0) {
            let mailOptions = {
                from: req.body.email,
                to: process.env.TO_MAIL,
                subject: 'Заявление абитуриента',
                text: `Почта отправителя: ${req.body.email}`,
                attachments: formDataObject,
            }
            transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Не удалось отправить сообщение, попробуйте ещё раз');
                } else {
                    const message = `Ваша заявка отправлена успешно. Благодарим,
                    что выбрали нашу учебное заведение.
                    Письмо было отправлено на почту ${mailOptions.to}`;
                    res.status(200).send(message);
                }
            })
        }
    }
})
