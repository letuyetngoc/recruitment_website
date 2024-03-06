import { useEffect, useState } from "react"

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])
    return hasMounted
}

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay ?? 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}