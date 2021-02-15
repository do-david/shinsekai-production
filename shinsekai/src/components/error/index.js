import React from 'react';
import sorry from '../../assets/zorro-sorry.png';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ErrorNotFound = () => {
    const { t, i18n } = useTranslation()
    return (
        <Container>
            <Image src={sorry}></Image><br/>
            <Label>{t(`pending.notFound`)}</Label>
        </Container>
    );
};
const Container = styled.div`
margin-top:5%;
vertical-align: middle;

`
const Image = styled.img`
width: 200px;
height: 240px;
`
const Label = styled.label`
margin-bottom:50px;
width: auto;
font-size: 25px;
text-align: center;
font-weight:bold;
color: ${props => props.theme.text};
`
export default ErrorNotFound;