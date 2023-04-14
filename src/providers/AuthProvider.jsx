import { useMemo, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import isEmpty from "../helpers/isEmpty"

const AuthProvider = ({ children }) => {
    const localUser = JSON.parse(localStorage.getItem('user')) || {}
    const [currentUser, setCurrentUser] = useState(localUser)

    const setUserHandler = (user) => {
        if (isEmpty(user)) return

        localStorage.setItem("user", JSON.stringify(user))
        return setCurrentUser(user)
    }

    const logoutHandler = () => {
        localStorage.removeItem('user')
        return setCurrentUser(null)
    }

    // useEffect(() => {
    //   console.log({currentUser})
    // }, [currentUser])
    

    const authValues = useMemo(() => {
        return {
            user: currentUser?.user || null,
            token: currentUser?.accessToken,
            isAuthenticated: !!currentUser?.user?.id,
            setUser: setUserHandler,
            logout: logoutHandler
        }
    })

    return <AuthContext.Provider value={authValues}>
        { children }
    </AuthContext.Provider>
}

export default AuthProvider