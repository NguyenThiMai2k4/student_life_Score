import axios from "axios";
const HOST = 'https://pointapp.pythonanywhere.com'

export const endpoints = {
    'student': '/student/',
    'register': '/user/register/',
    'login': '/o/token/',
    'current-user': '/user/current-user/',
    'criteria': '/criteria',
    'extract_activity': '/extract_activity/',
    'detail_activity': (activityId) => `/extract_activity/${activityId}/detail_activity/`,
    'register_detail_activity': (detailId) => `detail_extract_activity/${detailId}/register_detail_activity/`,
}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `bearer ${accessToken}`
        }
    })
}
export default axios.create({
    baseURL: HOST
})