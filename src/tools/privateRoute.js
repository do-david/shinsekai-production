import React, { useState } from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthentificationState = useSelector(state=>state.toggleAuthentication.isAuthenticatedValue)
    return (
        <Route
        {...rest}
        render={props => 
            (isAuthentificationState) ? (
            <Component {...props}/>) : (
            <Redirect to='/'></Redirect>)
        }
        >
            
        </Route>
    )
}

export default PrivateRoute