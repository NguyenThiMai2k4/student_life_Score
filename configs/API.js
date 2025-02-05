import axios from "axios";
const HOST = 'https://pointapp.pythonanywhere.com'

export const endpoints = {
    'student': '/student/',
    'list_missing': (studentId)=>`student/${studentId}/get_list_missing/`,
    'register': '/user/register/',
    'login': '/o/token/',
    'user':'/user/',
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
    'create_extract_activity':criteriaId=>`/criteria/${criteriaId}/get_activity/`,
    'detail_activity_create': activityId =>`/extract_activity/${activityId}/detail_activity/`,
    'faculty' : '/faculty/',
    'get_list_missing' : (facultyId) => `faculty/${facultyId}/get_list_missing/`,
    'confirm_register_detail_activity': (registerId) =>`register_extract_activity/${registerId}/confirm_register_detail_activity/`,
    'cancel_register_detail_activity': (registerId) =>`register_extract_activity/${registerId}/cancel_register_detail_activity/`,
    'activity_delete': activityId =>`/extract_activity/${activityId}/`,
    'detail_activity_delete': detailActivityId =>`/detail_extract_activity/${detailActivityId}/`,
    'patch_role':  (userId) => `/user/${userId}/update/`,
    // 'get_register_detail_activity': (detailId) => `/detail_extract_activity/${detailId}/get_register_detail_activity/`,
    'get_register_detail_activity': (extractActivityId) => `extract_activity/${extractActivityId}/get_register_detail_activity/`,
    'update_status_register_detail_activity' : '/register_detail_activity'
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