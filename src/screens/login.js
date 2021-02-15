import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import {useHistory } from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { toggleAuthentication } from '../actions/authentication'
import { motion } from 'framer-motion'
import zorro from '../assets/zorro-cutting.png'
import wanted from '../assets/zorro-wanted2.png'
import { useTranslation } from 'react-i18next'

const Login = () => {
    const [formState,setFormState] = useState({username:'',password:''})
    const [isSended, setIsSended] = useState(false)
    const [errorMessage,setErrorMessage]=useState('')
    const { t, i18n} = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()
    const isAuthenticationState = useSelector(state => state.toggleAuthentication.isAuthenticatedValue)
    const submit = e => {
        e.preventDefault()
        if(!formState.username || !formState.password){
            setErrorMessage(t(`login.errorFields`))
            return
        }
        axios( {
            method:'POST',
            url:process.env.REACT_APP_LOGIN_URL,
            data: {
                username:formState.username,
                password:formState.password
            }
        })
        .then(res => {
            localStorage.setItem('token',res.headers['x-access-token'])
            dispatch(toggleAuthentication())
            setIsSended(true)
        })
        .catch(err => {
            setErrorMessage(t(`login.errorServor`))
            console.log(err)
        })
    }
    useEffect(()=> {
            if(isSended){
                const timer = setTimeout(()=>{
                history.push('/home')            
                },3000)
                return ()=>clearTimeout(timer)
            }
        },[isSended])
    return (
        <MainContainer>
            {(isAuthenticationState) ?
            (
            <>
            <Square variants={variantSquare} animate="animated">
                <HalfSquareLeft variants={variantLeft} initial="initial" animate="animated"/>
                <HalfSquareRight variants={variantRight} initial="initial" animate="animated"/>
            </Square>
            <Image src={zorro} alt="Picture of Zorro"></Image>
            </>
            ) : 
            (
            <>
            <Container>
                <StyledForm onSubmit={(e) =>submit(e)}>
                <CustomedDiv>
                <StyledInput type='text' placeholder={t('login.username')} onChange={e =>setFormState({...formState, username:e.target.value})}></StyledInput>
                <StyledInput type='password' placeholder={t('login.password')} onChange={e =>setFormState({...formState, password:e.target.value})}></StyledInput>
                <StyledButton type='submit'>{t('login.submit')}</StyledButton>
                </CustomedDiv>
                </StyledForm>
            </Container>
            <StyledLabelError>{errorMessage}</StyledLabelError>
            </>
            )   
            }
           
        </MainContainer>
    )
}
const MainContainer = styled.div`
margin-top:5%;
vertical-align: middle;
`
const Image = styled.img`
margin-left:40%;
height:295px;
width:170px;
`
const Container = styled.div`
margin-right: auto;
margin-left: auto;
margin-bottom: 50px;
border: 1px solid #888;
width:180px;
height:260px;
box-shadow:0 4px 2px -2px gray;
background-image: url(${wanted});
`
const CustomedDiv = styled.div`
margin-top:177px;
`
const variantSquare = {
    animated: {
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
    }
}
const Square = styled(motion.div)`
width:180px;
height:260px;
margin-right: auto;
margin-left: auto;
display:flex;
flex-direction:row;
`
const variantLeft = {
    initial: {x: 0},
    animated: {x: -20, transition: {delay: 2}}
}
const HalfSquareLeft = styled(Square)`
background-color:black;
margin:0;
width:50%;
`
const variantRight = {
    initial: {x: 0},
    animated: {x: 20, transition: {delay: 2}}
}
const HalfSquareRight = styled(Square)`
background-color:black;
margin:0;
width:50%;
`
const StyledForm = styled.form`
display:flex;
flex-direction: column;
align-items: center;
justify-content:center;
`
const StyledTitle = styled.label`
margin-bottom:50px;
width: auto;
font-size: 25px;
text-align: center;
font-weight:bold;
`
const StyledLabelError = styled.label`
margin-top:100px;
width: auto;
text-align: justify;
font-weight:bold;
color:red;
`
const StyledInput = styled.input`
margin: 6px 0px;
border-radius: 12px;
border: none;
background-color:#00b894;
height:30px;
width:auto;
color:white;
`
const StyledButton = styled.button`
margin-top:15px;
background-color:rgba(209,201,180);
width: 175px;
height:30px;
border-radius: 20px;
`
export default Login;