import React from 'react'
import CombinedComponents from './components/CombinedComponent'
import Login from './components/Login'
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


export const MainPage = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const path = window.location.pathname
    return (
        <div>
            <Router>

                {!isLoading && !isAuthenticated && path.endsWith('/chat-app') &&
                    <Redirect to='/login' />
                }

                {!isLoading && isAuthenticated &&
                    <Redirect to='/chat-app' />

                }

                {!isLoading && !isAuthenticated &&
                    <Redirect to='/login' />
                }

                <Switch>
                    <Route path="/chat-app" component={CombinedComponents} />
                    <Route path="/login" component={Login} />
                </Switch>

            </Router>
        </div>
    )
}
