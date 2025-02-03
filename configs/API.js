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
    'list_register': (studentId) => `student/${studentId}/list_register/`,
    'list_point': (studentId) => `student/${studentId}/list_point/`,
    'missing_detail_activity': (detailActivityId) =>`detail_extract_activity/${detailActivityId}/missing_detail_activity/`,
    'stats_class': '/stats/stats_class/',
    'stats_rank': '/stats/stats_rank/',
    'stats_faculty': '/stats/stats_faculty/',
    'comments' :(activityId) => `/extract_activity/${activityId}/comments/`,
    'likes': (activityId) => `/extract_activity/${activityId}/likes/`,
    'profile': (userId) => `/user/${userId}/profile/`,
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