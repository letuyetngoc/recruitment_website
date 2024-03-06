import { IAccount, IBackendRes, ICompany, IModelPaginate, IRole, IUser } from "../../types/backend"
import { RegisterType } from "../../app/auth/register/page"
import { LoginType } from "../../app/auth/login/page"
import axios from "../../config/axios/axios-customize"

/**
 * Module Auth
 */

export const callLogin = (values: LoginType) => {
    return axios.post<IBackendRes<IAccount>>(`/api/v1/auth/login`, values)
}

export const callRegister = (values: RegisterType) => {
    return axios.post<IBackendRes<IAccount>>(`/api/v1/auth/register`, values)
}

export const handleRefreshToken = async () => {
    const res = await axios.get<IBackendRes<IAccount>>(`/api/v1/auth/refresh`);
    if (res && res.data) return res.data.data?.access_token;
    else return null;
}

/**
 * Module Admin
 */

export const getAllUsers = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`api/v1/users?${query}`)
}

export const getAllCompanies = (current: number, pageSize: number) => {
    return axios.get<IBackendRes<IModelPaginate<ICompany>>>(`api/v1/companies?current=${current}&pageSize=${pageSize}`)
}

export const getAllRoles = (current: number, pageSize: number) => {
    return axios.get<IBackendRes<IModelPaginate<IRole>>>(`api/v1/roles?current=${current}&pageSize=${pageSize}`)
}

export const getRoleById = (id: string) => {
    return axios.get<IBackendRes<IRole>>(`api/v1/roles/${id}`)
}

export const createUser = (user: IUser) => {
    return axios.post<IBackendRes<IUser>>(`api/v1/users`, user)
}

export const updateUser = (user: IUser) => {
    return axios.patch<IBackendRes<IUser>>(`api/v1/users`, user)
}

export const deleteUser = (_id: string) => {
    return axios.delete<IBackendRes<IUser>>(`api/v1/users/${_id}`)
}

export const getUserById = (_id: string) => {
    return axios.get<IBackendRes<IUser>>(`api/v1/users/${_id}`)
}
