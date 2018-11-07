import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import Button from '../Utils/Button';

const Container = styled('div')`
  text-align: center;
  a {
    color: #f8f8f8;
    text-decoration: none;
  }
`;

const CreateGame = () => (
  <Container>
    <Button color="primary">
      <Link to="/create_game"><Trans>Create a game</Trans></Link>
    </Button>
  </Container>
);

export default CreateGame;
