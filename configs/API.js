import axios from "axios";

const HOST = 'https://pointapp.pythonanywhere.com/'

export const endpoints = {
    'criteria' : '/criteria',
    'extract_activity': '/extract_activity/',

}

export const authApi = () => {
    return axios.create({
        baseURL: HOST,
        headers: {
            'Authorization': 'Bearer ...'
        }
    })
}

export default axios.create({
    baseURL: HOST
})