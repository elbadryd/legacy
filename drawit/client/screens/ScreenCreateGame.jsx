import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import CreateGameForm from '../components/CreateGameForm';
import Container from '../components/Utils/Centered';
import { Trans } from 'react-i18next';

const ScreenCreateGame = ({ history }) => (
  <Container>
    <h1><Trans>Create Game</Trans></h1>
    <CreateGameForm history={history} />
  </Container>
);

ScreenCreateGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenCreateGame;
