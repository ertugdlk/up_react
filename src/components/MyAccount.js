import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import css from '../components/css/MyAccount.css';
import { Image, Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

function MyAccount(props) {
  console.log(props);
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
              />

              <Button content='Login' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </>
  );
}

export default MyAccount;
