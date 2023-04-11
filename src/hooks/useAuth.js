import { createContext } from "react"
import AuthContext from "../context/AuthContext"

/* {
    user,
    token,
    isAutenticated, 
    setUser,
    logout 
} */

function useAuth() {
    return createContext(AuthContext)
}

export default useAuth