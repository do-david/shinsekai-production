import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

const Library = () => {
    const history = useHistory()
    const currentLibrary = localStorage.getItem('library') 
    ? JSON.parse(localStorage.getItem('library'))
    :[]
    const [lib,setLibrarys] = useState(currentLibrary)
    useEffect(() => {
        console.log('Library -> Lib', lib)
    },[lib])
    const deleteLibrary = title => {
        const newLibrarys = lib.filter(tibrary => tibrary.name !== title)
        setLibrarys(newLibrarys)
      }     
    return (
        <div>
            <Link to='/search'>Manga</Link>
            <h1>Library Page</h1>
            
            {lib.map(topM => (      

            <div key={topM.name}>
              <StyledChild>
              <LibraryLink>
              <ImgContainer>
                <StyledImage variants={variantImg} whileHover="whileHover" whileTap="whileTap"
                  onClick={() => history.push(`/detail/${topM.title}`)}src={topM.img}>
                </StyledImage>
                </ImgContainer>
                <StyledText>{topM.title}</StyledText> 
                <button onClick={() => deleteLibrary(topM.name)}>supprimer</button>
              </LibraryLink>
              </StyledChild>
            </div>
            ))}
        </div>
    );
};


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
color:${props => props.theme.text.common} ;;
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
export default Library;