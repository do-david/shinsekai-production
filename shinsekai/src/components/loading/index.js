import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/zorro-logo.jpeg';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LoadingComponent = () => {
    const { t, i18n } = useTranslation()
    const [animate, setAnimate] = useState('initial');
    const animationTimeout = useRef(null);
    useEffect(() => {
        animationTimeout.current = setTimeout(() => {
            setAnimate(animate === 'initial' ? 'animated' : 'initial')
        }, 1500);
        return () => {
            clearTimeout(animationTimeout.current)
        }
    },[animate])
    return (
        <Container>
            <Image src={logo}  variants={variantImage} animate={animate}></Image><br/>
            <Label>{t('pending.loading')}</Label>
        </Container>
    );
};
const Container = styled.div`
margin-top:15%;
vertical-align: middle;
`
const variantImage = {
    animated: {
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }
};
const Image = styled(motion.img)`
height:100px;
width:100px;
border-radius:20%;
margin-bottom: 50px;
`
const Label = styled.label`
margin-bottom:50px;
width: auto;
font-size: 25px;
text-align: center;
font-weight:bold;
`
export default LoadingComponent;