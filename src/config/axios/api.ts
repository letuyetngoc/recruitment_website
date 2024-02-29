import { IAccount, IBackendRes } from "../../types/backend"
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
