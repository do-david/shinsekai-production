import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';
import Select from 'react-dropdown-select';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';


const WithAnimation = ({ options }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [open, setOpen] = useState(null);
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [searchManga, setSearchManga] = useState({});
  const urlBuild = `${process.env.REACT_APP_GET_MANGA_URL}${query}`
  const option = {
    method: 'GET',
    url: urlBuild
  }
  const getManga = () => {
    axios.request(option)
        .then(res=>{
          setIsLoading(true)
          setSearchManga(res.data.results[0])
        })
        .catch(err=>{
          setIsLoading(true)
          setError(err)
        });
  }
  useEffect(()=> {
    getManga()
  })

  return (
    <React.Fragment>
      <StyledSelect
        options={options}
        values={[]}
        isOpen={open}
        backgroundColor="#00b894"
        color="#00b894"
        onDropdownCloseRequest={({ close }) => {
          setOpen(true);
          sleep(300).then(() => {
            close();
            setOpen(false);
          });
        }}
        onChange={(value) => value ? setQuery(value[0]?.label) : null
        }
      />
      {query && error !==''?
      <Container>
                <StyledChild>
                <LibraryLink>
                <ImgContainer>
                <StyledImage variants={variantImg} whileHover="whileHover" whileTap="whileTap"
                onClick={() => history.push(`/detail/${searchManga.title}`)} src={searchManga.image_url}>
                </StyledImage>
                  </ImgContainer>  
                  <StyledText>{searchManga.title}</StyledText>
                </LibraryLink>
              </StyledChild>
              </Container>     
      : null
      }
    </React.Fragment>
  );
};


const Container = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
`
const StyledText = styled.span`
text-align:center;
font-weight:bold;

width:180px;
padding: 0 5px;
`
const ImgContainer = styled.div`
position: relative;
clip-path: polygon(0 0,100% 0, 100% 85%, 0 100%);
padding:0;
margin: 0;
`

const StyledImage = styled(motion.img)`
height:230px;
width:180px;
border-radius:25px;
box-shadow:0 4px 2px -2px gray;

`
const StyledChild = styled.div`
  width: 180px;
  margin: 2%;
  height: 320px;
  background: rgba( 200, 200, 200, 0.25 );
box-shadow: 0 8px 32px 0 rgba(0, 184, 148, 0.47 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 25px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`

export const LibraryLink = styled.a`
  text-align: center;

`;

const variantImg = {
  whileHover: { scale: 1.1 },
  whileTap:{ scale: 0.9 }
}
const hide = keyframes`
  from {
    transition: height 310ms ease;
  }
  to {
    transition: height 310ms ease;
    height: 0;
    opacity: 0;
  }
`;

const show = keyframes`
  from {
    transition: height 310ms ease;
    height: 0;
    opacity: 0;
  }
  to {
    transition: height 310ms ease;
  }
`;

const StyledSelect = styled(Select)`
  transition: all 0.3s ease-out;
  
  .react-dropdown-select-dropdown {
    height: 310px;
    ${({ isOpen }) =>
      isOpen
        ? css`
            animation: ${hide} 310ms ease-in-out;
          `
        : css`
            animation: ${show} 310ms ease-in-out;
            background-color:#00b894;
          `};
  }
  .react-dropdown-select-option {
    transition: all 0.3s ease-out;
  }
`;

WithAnimation.propTypes = {};

export default WithAnimation;