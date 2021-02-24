import React, { useState, useEffect} from "react"
import {Link } from "react-router-dom";
import { createGlobalStyle } from "styled-components"
import ClearIcon from "@material-ui/icons/Clear"
import css from "../components/css/MyAccount.css"
import axios from '../utils';
import Logo from '../logo.png';
import {
  Container,
  Image,
  Divider,
  Input,
  Button,
  Grid,
  Label,
  Segment,
} from "semantic-ui-react"

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`

function MyAccount(props) {
  const [passlo, setPasswordVis] = React.useState(false)
  const [mailo, setMailVis] = React.useState(false)
  const [avatar,setAvatar] = useState([])
  const [userFullName,setUserFullName]=useState("")

  async function userAvatar () {
    const url = "detail/steamavatar"
    const response = await axios.get(url,{withCredentials:true});
    if(response.data ===""){
      setAvatar(Logo)
    }else
      setAvatar(response.data)
  }
  async function userInfo(){
    const url= "credential/find"
    const response =await axios.get(url,{withCredentials:true})
    if(response===undefined || null || ""){
      setUserFullName("No info")
    }else setUserFullName(response.data.name)

  }
  const setPasswordLink = () => {
    if (mailo) {
      setMailVis(!mailo)
    }
    setPasswordVis(!passlo)
  }

  const setMailLink = () => {
    if (passlo) {
      setPasswordVis(!passlo)
    }
    setMailVis(!mailo)
  }

  useEffect(() => {
    userAvatar();
    userInfo();
  }, []);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div className="MyAccount">
        <div className="CloseButton1">
          <ClearIcon fontSize="large" onClick={props.onClose}></ClearIcon>{" "}
        </div>
        <div className="test">
          <Container textAlign="center">
            <Grid columns={2} relaxed="very">
              <Grid.Column>
                <Grid.Row>
                  <Label className="image-label-dist" color="green">
                    {props.userName.toUpperCase()}
                  </Label>
                </Grid.Row>
                <br></br>
                <Grid.Row>
                  <Image
                    src={avatar}
                    size="small"
                    circular
                    centered
                  />
                  <br></br>
                   <Grid.Row>
                  <Label className="image-label-dist" color="green">
                    {userFullName}
                  </Label>
                 
                </Grid.Row>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column>
                {passlo ? (
                  <Segment color="red">
                    <Label attached="top" color="red">
                      Type New Password
                    </Label>
                    <Input fluid placeholder="Type New Password" />
                    <Input fluid placeholder="Re-Type New Password" />
                    <Button.Group>
                      <Button color="red" onClick={() => setPasswordLink()}>
                        Cancel
                      </Button>
                      <Button.Or />
                      <Button positive>Save</Button>
                    </Button.Group>
                  </Segment>
                ) : (
                  <Segment color="green">
                    <Label attached="top" color="green">
                      Password
                    </Label>
                    <Button
                      animated="fade"
                      fluid
                      onClick={() => setPasswordLink()}
                    >
                      <Button.Content visible>*********</Button.Content>
                      <Button.Content
                        style={{ backgroundColor: "#0b0b0b" }}
                        hidden
                      >
                        Edit
                      </Button.Content>
                    </Button>
                  </Segment>
                )}
                {mailo ? (
                  <Segment color="red">
                    <Label attached="top" color="red">
                      Type New Email
                    </Label>
                    <Input fluid placeholder="Type New Email" />
                    <Input fluid placeholder="Re-Type New Email" />
                    <Button.Group>
                      <Button color="red" onClick={() => setMailLink()}>
                        Cancel
                      </Button>
                      <Button.Or />
                      <Button positive>Save</Button>
                    </Button.Group>
                  </Segment>
                ) : (
                  <Segment color="green">
                    <Label attached="top" color="green">
                      Email
                    </Label>
                    <Button animated="fade" fluid onClick={() => setMailLink()}>
                      <Button.Content visible>{props.email}</Button.Content>
                      <Button.Content
                        style={{ backgroundColor: "#0b0b0b" }}
                        hidden
                      >
                        Edit
                      </Button.Content>
                    </Button>
                  </Segment>
                )}

                <Link to = '/wallet'><Button className="wallet-button">Wallet</Button></Link>
              </Grid.Column>
            </Grid>
            <Divider vertical />
          </Container>
        </div>
      </div>
    </>
  )
}

export default MyAccount
