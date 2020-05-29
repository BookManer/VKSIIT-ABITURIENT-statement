import axios from 'axios';

const apiFormData = axios.create({
    baseURL: 'http://localhost:3000/api/methods',
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})
const apiJson = axios.create({
    baseURL: 'http://localhost:3000/api/methods',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default async function sendMail(email, formData) {
    await apiFormData.post('/sendMail', formData);
    await apiJson.post('/sendMail', { email });
}