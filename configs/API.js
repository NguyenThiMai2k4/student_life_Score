import axios from "axios";
const HOST = 'https://pointapp.pythonanywhere.com'

export const endpoints={
    'student':'/student/',
    'register':'/user/register/',
    'login':'/o/token/',
    'current-user':'/user/current-user/',
    'criteria' : '/criteria',
    'extract_activity': '/extract_activity/',
    'detail_training_point': criteriaId => '/criteria/${criteriaId}/detail_training_point/'
}

export const authApi=(accessToken)=>{
    return axios.create({
        baseURL:HOST,
        headers:{
            Authorization:`bearer ${accessToken}`
        }
    })
}
export default  axios.create({
    baseURL: HOST
})