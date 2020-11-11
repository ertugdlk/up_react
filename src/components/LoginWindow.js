import React, {useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import { useHistory } from "react-router-dom";  
const Axios = require('axios')
const Cookie = require('js-cookie')

//const URL = ''


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`

function LoginWindow() 
{
  const [nickname , setNickname] = useState("")
  const [password , setPassword] = useState("")
  const history = useHistory();
  const [games, setGames] = useState([]);
    /*
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let url = `URL${id}`
        const response = await axios.get(URL) 
        setGames(response.data)
    }

    const JoinRoom = (id) => {
        //
        })
    }
*/
    const Header = () => {
        let headerElement = ['Game', 'Timestamp', 'Mode', 'Host', 'Map', 'Fee', 'Reward']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const Body = () => {
        return games && games.map(({ Game, Timestamp, Mode, Host, Map, Fee, Reward }) => {
            return (
                <tr>
                    <td>{Game}</td>
                    <td>{Timestamp}</td>
                    <td>{Mode}</td>
                    <td>{Host}</td>
                    <td>{Map}</td>
                    <td>{Fee}</td>
                    <td>{Reward}</td>
                    <td className='opration'>
                        <button className='button' /*onClick={() => JoinRoom()}*/>Join Game</button>
                    </td>
                </tr>
            )
        })
    }


  const handleSteam = async () => {
    //Steam login kısmı
  }


  const handleLogin = async () => {
    try
    {
      const url = "http://localhost:5000/auth/login"
      const response = await Axios.post(url , {nickname , password} , {withCredentials: true})

      if(response.status == 200){
        history.push("/dashboard");
      }
      else{
        console.log('invalid login')
      }
    }
    catch(err)
    {
      console.log(err)
    }

  }

    return(
        <>
        <GlobalStyle></GlobalStyle>
        <Window>
        <Modal>
        <Title>
          <b>LOGIN</b>
        </Title>
        <label>Username</label>
            <StyledInput
              onChange={e => setNickname(e.target.value)}
              type="text"
              name="username"
              required
            />
            <label>Password</label>
            <StyledInput
              onChange={e => setPassword(e.target.value )}
              type="password"
              name="password"
              required
            />
            <Button onClick={handleLogin}>Login</Button>
        </Modal>  

        <table id='game'>
                <thead>
                    <tr>{Header()}</tr>
                </thead>
                <tbody>
                    {Body()}
                </tbody>
            </table>
        </Window>  
        </>
    )
}


//İçeriklerin cssi
const Modal = styled.div`
  color: #fff;
  box-sizing: content-box;
  font-size: 14px;
  width: 50px;
  margin: 5% 25%;
  position: relative;
  justify-content:center;
  line-height: 1.5715;
  list-style: none;
`;

//Popup'ın cssi
const Window = styled.div`  
    position: absolute;
    width: 300px;
    height: fit-content;
    top: 200px;
    left: 40%;
    background: #0b0b0b;
    border-radius: 12px;
    z-index: 3;
`;


const StyledInput = styled.input`
  margin-bottom: auto;
  padding: 0.5em; //Boyut
  color: #fff;
  background-color: #1b1c23;
  border: none;
  border-radius: 8px;
  width: auto;
  justify-self: center;
`;


const Title = styled.h2`
color: #fff;
font-size: 1Sem;
margin: 0.5em 1.5em;
padding-bottom:0.5em;
`;


const Button = styled.button`
  color: #000;
  background-color: #00FF60;
  font-size: 1em;
  margin-top:1.5em;
  padding: 0.75em ;
  border: 2px solid #00ff60;
  border-radius: 8px;
  width: fit-content;
  margin-left:50px;

  &:hover {
      background-color: #16161b;
      color: #f1f1f1;
      border-color: #f1f1f1;
  }
`;

export default LoginWindow