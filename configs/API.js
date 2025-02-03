import axios from "axios";
const HOST = 'https://pointapp.pythonanywhere.com'

export const endpoints={
    'student':'/student/',
    'register':'/user/register/',
    'login':'/o/token/',
    'current-user':'/user/current-user/',
    'criteria' : '/criteria/',
    'extract_activity': '/extract_activity/',
    'detail_activity_create': activityId =>`/extract_activity/${activityId}/detail_activity/`,
    'detail_training_point': criteriaId => `/criteria/${criteriaId}/detail_training_point/`,
    'create_extract_activity':criteriaId=>`/criteria/${criteriaId}/get_activity/`
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