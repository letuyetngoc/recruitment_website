"use client"
import { createContext, useContext, useState } from "react";

interface IStates {
    isAuthenticated: boolean;
}
interface IContext {
    initStates: IStates,
    setInitStates: (value: IStates) => void
}
export const Context = createContext<IContext>({
    initStates: {
        isAuthenticated: false
    },
    setInitStates: () => { }
})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initVal = {
        isAuthenticated: false
    }
    const [initStates, setInitStates] = useState<IStates>(initVal)

    return (
        <Context.Provider value={{ initStates, setInitStates }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider