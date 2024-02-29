
import axios from "axios"
import { IAccount, IBackendRes } from "../../types/backend"
import { RegisterType } from "../../app/auth/register/page"
import { LoginType } from "../../app/auth/login/page"

/**
 * Module Auth
 */

export const callLogin = (values: LoginType) => {
    return axios.post<IBackendRes<IAccount>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, values)
}

export const callRegister = (values: RegisterType) => {
    return axios.post<IBackendRes<IAccount>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, values)
}