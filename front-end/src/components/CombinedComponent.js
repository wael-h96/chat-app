import React, { useEffect, useState } from 'react'
import LeftPane from './LeftPane'
import MainPane from './MainPane'
import { useAuth0 } from '@auth0/auth0-react'
import '../CSS/CombinedComponentsCSS.css'
import { useDispatch } from 'react-redux';
import { userLoggedOut, userLoggedIn, fetchAllUsers } from '../dataStore/users/userActions'
import io from 'socket.io-client'

export let socket;

const CombinedComponents = () => {

    const [allUsers, setUsers] = useState([])
    const { logout, user, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const ENDPOINT = "http://localhost:3001"

    useEffect(() => {

        socket = io(ENDPOINT)

        userLoggedIn(user)
            .then(user => user.json())
            .then(user => dispatch({ type: "user-loggedin", user: user[0] }))

        fetchAllUsers()
            .then(res => res.json())
            .then(res => setUsers(res)).then(() => dispatch({ type: 'fetch-users', users: allUsers }))

    }, [isAuthenticated, ENDPOINT])

    const handleLogOut = () => {
        userLoggedOut(user)
        logout({ returnTo: "http://localhost:3000/login" })
    }

    return (

        <div >
            {isAuthenticated && (
                <div className="grid-container">
                    <button className="btn btn-danger" onClick={handleLogOut}>Logout</button>

                    <div className="left-pane">
                        <LeftPane />
                    </div>

                    <div className="main-pane">
                        <MainPane user1={user.email} />
                    </div>

                </div>
            )}
            {!isAuthenticated &&
                (
                    <div>
                        <h2>You should login first </h2>
                        <button
                            className="btn btn-success"
                            onClick={event => window.location.href = '/login'}>Login!</button>
                    </div>
                )
            }
        </div>
    )
}

export default CombinedComponents;