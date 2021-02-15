import React from 'react'
import {Route,
    BrowserRouter as Router,
    Redirect,
    Switch } from 'react-router-dom'
import Login from '../screens/login'
import Home from '../screens/home'
import Library from '../screens/library'
import Search from '../screens/search'
import PrivateRoute from '../tools/privateRoute'
import Header from '../components/header';
import Footer from '../components/footer'
import Detail from '../components/detail'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    transition: background-color 1s ease;
    background-color: ${props => props.theme.general.primary} ;
    color:${props => props.theme.text.common} ;
  }
  html, body {
  overflow-x: hidden;
}
`
const Routes = () => {
    return(
        <Router>
            <GlobalStyle></GlobalStyle>
            <Header></Header>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/detail/:name' component={Detail}></Route>
                <PrivateRoute path='/library' component={Library}></PrivateRoute>
                <PrivateRoute path='/search' component={Search}/>
                <Redirect to='/home'></Redirect>
            </Switch>
            <Footer></Footer>
        </Router>
    )
}
export default Routes