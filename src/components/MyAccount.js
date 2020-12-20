import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import css from '../components/css/MyAccount.css';
import {
  Container,
  Image,
  Divider,
  Input,
  Button,
  Grid,
  Label,
  Segment,
} from 'semantic-ui-react';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

function MyAccount(props) {
  const [passlo, setPasswordVis] = React.useState(false);
  const [mailo, setMailVis] = React.useState(false);

  const setPasswordLink = () => {
    if (mailo) {
      setMailVis(!mailo);
    }
    setPasswordVis(!passlo);
  };

  const setMailLink = () => {
    if (passlo) {
      setPasswordVis(!passlo);
    }
    setMailVis(!mailo);
  };

  const Test = () => {};

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div className='MyAccount'>
        <div className='CloseButton1'>
          <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon>{' '}
        </div>
        <div className='test'>
          <Container textAlign='center'>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <Grid.Row>
                  <Label className='image-label-dist' color='green'>
                    {props.userName.toUpperCase()}
                  </Label>
                </Grid.Row>
                <Grid.Row>
                  <Image
                    src='https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg'
                    size='small'
                    circular
                    centered
                  />
                </Grid.Row>
              </Grid.Column>

              <Grid.Column>
                {passlo ? (
                  <Segment color='red'>
                    <Label attached='top' color='red'>
                      Type New Password
                    </Label>
                    <Input fluid placeholder='Type New Password' />
                    <Input fluid placeholder='Re-Type New Password' />
                    <Button.Group>
                      <Button color='red' onClick={() => setPasswordLink()}>
                        Cancel
                      </Button>
                      <Button.Or />
                      <Button positive>Save</Button>
                    </Button.Group>
                  </Segment>
                ) : (
                  <Segment color='green'>
                    <Label attached='top' color='green'>
                      Password
                    </Label>
                    <Button
                      animated='fade'
                      fluid
                      onClick={() => setPasswordLink()}
                    >
                      <Button.Content visible>*********</Button.Content>
                      <Button.Content
                        onMouseEnter={() => console.log('test')}
                        style={{ backgroundColor: '#0b0b0b' }}
                        hidden
                      >
                        Edit
                      </Button.Content>
                    </Button>
                  </Segment>
                )}
                {mailo ? (
                  <Segment color='red'>
                    <Label attached='top' color='red'>
                      Type New Email
                    </Label>
                    <Input fluid placeholder='Type New Email' />
                    <Input fluid placeholder='Re-Type New Email' />
                    <Button.Group>
                      <Button color='red' onClick={() => setMailLink()}>
                        Cancel
                      </Button>
                      <Button.Or />
                      <Button positive>Save</Button>
                    </Button.Group>
                  </Segment>
                ) : (
                  <Segment color='green'>
                    <Label attached='top' color='green'>
                      Email
                    </Label>
                    <Button animated='fade' fluid onClick={() => setMailLink()}>
                      <Button.Content visible>*********</Button.Content>
                      <Button.Content
                        style={{ backgroundColor: '#0b0b0b' }}
                        hidden
                      >
                        Edit
                      </Button.Content>
                    </Button>
                  </Segment>
                )}
              </Grid.Column>
            </Grid>
            <Divider vertical />
          </Container>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
