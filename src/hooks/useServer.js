import { toast } from "sonner"
import httpService from "../services/httpService"
import useAuth from "./useAuth"

function useServer() {
    const { token, setUser } = useAuth()

    const handleResponse = ({ data, loading, error }) => {
        if (data?.user && data?.accessToken) { 
            setUser({...data})
        }

        if (error && error.status === 401)  {
            toast.error('El usuario o contraseña es incorrecto')
        } else {
            if (error) {
                toast.error(error.message)
            }
        }

        return {data, loading, error}
    }

    return {
        get: ({ url }) => httpService({ url, method: 'GET', token }),
        post: ({ url, body }) => httpService({ url, method: 'POST', token, body }).then(handleResponse),
        put: ({ url, body }) => httpService({ url, method: 'PUT', token, body }).then(handleResponse),
        delete: ({ url }) => httpService({ url, method: 'DELETE', token })
    }
}

export default useServer
