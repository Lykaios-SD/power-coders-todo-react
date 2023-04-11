import { useContext } from "react"
import AuthContext from "../context/AuthContext"

/* {
    user,
    token,
    isAutenticated, 
    setUser,
    logout 
} */

function useAuth() {
    return useContext(AuthContext)
}

export default useAuth