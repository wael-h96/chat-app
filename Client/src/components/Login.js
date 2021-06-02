import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import '../CSS/LoginCSS.css'

const Login = () => {

    const { loginWithRedirect, logout } = useAuth0();

    return (
        <div className="main-div">

            <div>
                <h1>Welcome To <br /> WaChat-App!</h1>
            </div>
            <div className="input-div">
                <h1>Welcome to Our CHAT APP !!</h1>
                <button className="btn btn-danger" onClick={() => loginWithRedirect()}>Login</button>
                <h3>New here ? Just press the Sign Up Button!</h3>
                <button className="btn btn-danger" onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Sign up</button>
            </div>
        </div>
    )
}

export default Login;