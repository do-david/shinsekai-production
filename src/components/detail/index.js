import React, {useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../stories/Button';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import LoadingComponent from '../loading';

const Detail = (props) => {
    const [manga, setManga] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()
    const {t, i18n} = useTranslation()
    const urlBuild = `${process.env.REACT_APP_GET_MANGA_URL}${props.match.params.name}`
    const options = {
        method: 'GET',
        url: urlBuild
      }
      const getManga = () => {
        axios.request(options)
            .then(res=>{
              setIsLoaded(true)
              setManga(res.data.results[0])
            })
            .catch(err=>{
                  setIsLoaded(true)
                  setError(err)
                  console.log(error)
            });
      }
      const handleLibrary = library =>{
        console.log("handleLibrary -> library",library)
        const currentLibrary = localStorage.getItem('library') 
          ? JSON.parse(localStorage.getItem('library'))
          :[]

        const isPresent = currentLibrary?.map(e => e.name).indexOf(library.name)
        console.log('isPresent',isPresent)
        
        console.log(isPresent)

        if(isPresent === -1){
            currentLibrary.push(library)
            localStorage.setItem('library',JSON.stringify(currentLibrary))

            return
        }else{
            const filteredCharacters=currentLibrary.filter(
                character => character.name !== library.name
            )
            console.log('filteredCharacters',filteredCharacters)
            localStorage.setItem('library',JSON.stringify(filteredCharacters))
        }
      }
    useEffect(()=> {
        getManga();
    },{})
    if(!isLoaded){
        return(
          <LoadingComponent></LoadingComponent>
        )
    }
    return (
      
        <Container>
            <SubContainer>
            <Image src={manga.image_url}></Image> 
                <Block>
                <Row>
                 <Button primary={true} backgroundColor="#ff0000" size="large" label={t('detail.back')} onClick={()=>history.push('/home')}></Button>
                 <Button primary={true} backgroundColor="#00b894" size="large" label={t('home.library')} onClick={()=>history.push('/library')}></Button>
                </Row>
                <h1>Manga Detail</h1>

                <h2>{manga.title}</h2>
                <br></br>
                    <p>Synopsis : {manga.synopsis} </p>
                    <br></br>
                    <br></br>
                       <Button primary={true} backgroundColor="#000fff" size='large' label={t('detail.add')} onClick={() => handleLibrary({img: manga.image_url, name:manga.title})}></Button>
                </Block>
            </SubContainer>
        </Container>
    );
};
const Container = styled.div`
display:flex;
flex-direction:column;
background-color: ${props => props.theme.general.primary};
margin: 5% 25%;
background: rgba( 0, 184, 148, 0.55 );
box-shadow: 0 8px 32px 0 rgba( 0, 184, 148, 0.57 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`
const Row = styled.div`
width:100%;
padding-top: 15px;
display: flex;
justify-content: space-around;
`

const SubContainer = styled.div`
display:flex;
flex-direction:row;
`
const Image = styled.img`
position:left;
width:35%;
height:50%;
border-radius:25px;

margin-left:-150px;
margin-top:50px;
margin-bottom:50px;
`
const Block = styled.div`
height:20%;
width:80%;
margin:5px;
text-align:center;
font-size:20px;
margin-top:50px;
`

export default Detail;