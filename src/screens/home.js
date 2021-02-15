import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '../components/loading';
import ErrorNotFound from '../components/error';
import { motion } from 'framer-motion';
import WithAnimation from '../components/search/WithAnimation';

const Home = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [mangas, setMangas] = useState([])
    const history = useHistory()
    const { t, i18n } = useTranslation()
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_GET_MANGAS_URL
      }
      const optionValues = mangas.map(d => ({
        "label" : d.title,
      }))
    const getMangas = () => {
      axios.request(options)
          .then(res=>{
            setIsLoaded(true)
            setMangas(res.data.top)
          })
          .catch(err=>{
            setError(err)
            setIsLoaded(true)
          });
    }
    useEffect(()=> {
      getMangas();
    },[])
    if(!isLoaded){
      return(
        <LoadingComponent></LoadingComponent>
      )
    }
    else{
      if(!mangas[0]){
        return(
          <>
          <ErrorNotFound></ErrorNotFound>
          <button onClick={getMangas()}>Retry</button>
          </>
        )
      }
      else{
        return (
            <Container>
              <SearchContainer>
              <h1>Search</h1>
              <WithAnimation options={optionValues} onChange={(e) => this.onChange(e)}></WithAnimation>
              </SearchContainer>
              <h1>{t('home.popular')}</h1>
              <StyledParent>
              {mangas.map(topM => (
                <StyledChild>
                  <LibraryLink>
                  <ImgContainer>
                  <StyledImage variants={variantImg} whileHover="whileHover" whileTap="whileTap"
                  onClick={() => history.push(`/detail/${topM.title}`)} src={topM.image_url}></StyledImage>
                  </ImgContainer>
                  <StyledText>{topM.title}</StyledText> 
                  </LibraryLink>
                </StyledChild>
              ))}
              </StyledParent>
            </Container>
        )
      }
    }
}



const Container = styled.div`
width:100%;
`
const SearchContainer = styled.div`
padding:2%;
display:flex;
flex-direction:column;
`
const ImgContainer = styled.div`
position: relative;
clip-path: polygon(0 0,100% 0, 100% 85%, 0 100%);
padding:0;
margin: 0;
`
const StyledImage = styled(motion.img)`
height:300px;
width:240px;
border-radius:25px;
box-shadow:0 4px 2px -2px gray;

`
const StyledParent = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: -10px;
margin-left: -10px;
`

const StyledChild = styled.div`
  width: 240px;
  margin: 2%;
  height: 380px;
  background: rgba( 200, 200, 200, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 0, 184, 148, 0.47 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 25px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`

const StyledText = styled.span`
text-align:center;
font-weight:bold;
color:${props => props.theme.text.common} ;
width:180px;
padding: 0 5px;
`
export const LibraryLink = styled.a`
  text-align: center;

`;

const variantImg = {
    whileHover: { scale: 1.1 },
    whileTap:{ scale: 0.9 }
  }
export default Home;