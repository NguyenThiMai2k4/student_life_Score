import axios from "axios";

const HOST = 'https://pointapp.pythonanywhere.com/'

export const endpoints = {
    'criteria' : '/criteria',
    'extract_activity': '/extract_activity/',
    'detail_training_point': criteriaId => '/criteria/${criteriaId}/detail_training_point/'
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