import axios from 'axios';

const hostname = 'https://integral-hold-278909.uc.r.appspot.com';

const apiFormData = axios.create({
    baseURL: `${hostname}/api/methods`,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})
const apiJson = axios.create({
    baseURL: `${hostname}/api/methods`,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default async function sendMail(email, formData) {
    await apiFormData.post('/sendMail', formData);
    const res = await apiJson.post('/sendMail', { email });
    return res;
}