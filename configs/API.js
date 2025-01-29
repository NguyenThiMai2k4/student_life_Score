import axios from "axios";
const HOST = 'https://pointapp.pythonanywhere.com'

export const endpoints={
    'student':'/student/',
    'register':'/user/register/',
    'login':'/o/token/',
    'current-user':'/user/current-user/'
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