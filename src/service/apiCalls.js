import axios from "axios"

const baseUrl = 'http://localhost:7000'

export const saveUser = async (values) => {
    const result = await axios({
        url: baseUrl + '/api/admin/saveUser',
        method: 'POST',
        data: values
    });
    return result;
}

export const authenticateUser = async (values) => {
    const result = await axios({
        url: baseUrl + '/api/admin/verifyUser',
        method: 'POST',
        data: values,
    });
    return result;
}

export const saveTask = async (values, token) => {
    const result = await axios({
        url: baseUrl + '/api/admin/saveTask',
        method: 'POST',
        data: values,
        headers: {
            "authorization": "bearer " + token
        },
    });
    return result;
}

export const fetchTaskList = async (id, token) => {
    const result = await axios({
        url: baseUrl + '/api/admin/fetchTaskList',
        method: 'GET',
        params: {
            userid: id
        },
        headers: {
            "authorization": "bearer " + token
        },
    });
    return result;
}

export const deleteTaskById = async (taskid, user_id, token) => {
    const result = await axios({
        url: baseUrl + '/api/admin/deleteTask',
        method: 'DELETE',
        params: {
            taskid: taskid,
            user_id: user_id
        },
        headers: {
            "authorization": "bearer " + token
        },
    });
    return result;
}

export const updateTask = async (values, token) => {
    const result = await axios({
        url: baseUrl + '/api/admin/updateTask',
        method: 'POST',
        data: values,
        headers: {
            "authorization": "bearer " + token
        },
    });
    return result;
}

export const uploadFile = async (values, token) => {
    const result = await axios({
        url: baseUrl + '/api/admin/uploadFile',
        method: 'POST',
        data: values,
        headers: {
            "authorization": "bearer " + token
        },
    });
    return result;
}