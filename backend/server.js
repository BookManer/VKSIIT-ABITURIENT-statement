require('dotenv').config(); // local access to env

const express = require('express');
const server = express();
const cors = require('cors');
let multiparty = require('multiparty');
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'borshblack@gmail.com',
        pass: "noangokeq2020",
    }
})

server.use(cors());
server.use(express.json()) // for parsing application/json
server.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const API = "api/methods";

server.listen(process.env.PORT || 3000, () => {
    console.log("Server has been listened");
});

let formDataObject = {};

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
                to: 'borshblack@gmail.com',
                subject: 'Заявление абитуриента',
                text: `Почта отправителя: ${req.body.email}`,
                attachments: formDataObject,
            }

            transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email resent: ', info.response);
                    res.send('ok');
                }
            })
        }
    }
})