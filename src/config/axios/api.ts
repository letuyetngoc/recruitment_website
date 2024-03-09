import { IAccount, IBackendRes, ICompany, IModelPaginate, IRole, IUser } from "../../types/backend"
import axios from "../../config/axios/axios-customize"
import { LoginType } from "../../app/(auth)/login/page"
import { RegisterType } from "../../app/(auth)/register/page"

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
 * Module User
 */

export const getAllUsers = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`api/v1/users?${query}`)
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

/**
 * Module Company
 */

export const uploadFile = (file: any, folderType: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileUpload', file);
    return axios<IBackendRes<{ fileName: string }>>({
        method: 'post',
        url: '/api/v1/files/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "folder_type": folderType
        },
    });
}

export const getAllCompanies = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ICompany>>>(`api/v1/companies?${query}`)
}

export const createCompany = (values: ICompany) => {
    return axios.post<IBackendRes<IModelPaginate<ICompany>>>(`api/v1/companies`, values)
}

export const deleteCompany = (_id: string) => {
    return axios.delete<IBackendRes<IUser>>(`api/v1/companies/${_id}`)
}

/**
 * Module Role
 */

export const getAllRoles = (current: number, pageSize: number) => {
    return axios.get<IBackendRes<IModelPaginate<IRole>>>(`api/v1/roles?current=${current}&pageSize=${pageSize}`)
}

export const getRoleById = (id: string) => {
    return axios.get<IBackendRes<IRole>>(`api/v1/roles/${id}`)
}