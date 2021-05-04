import axios from "@/utils/axios";

export const login = async (email, password) => {
    return axios.post(`/users/login/`, {email, password})
};

export const signup = async (name, email, password) => {
    return axios.post(`/users/register/`, {name, email, password})
};

export const getCurrent = async () => {
    return axios.get(`/users/current/`)
};

