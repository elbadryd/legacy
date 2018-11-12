import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Trans } from 'react-i18next';
import StartGame from './StartGame';
import Flex from '../Utils/Flex';
import Button from '../Utils/Button';
import { BorderStyles } from '../../styles';

const Container = styled(Flex)`
  ${BorderStyles}
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
  justify-content: space-between;
`;

const Word = styled('div')`
  width: fit-content;
  margin: auto 0;
  font-size: 20px;
`;

const ToggleScoreBoard = styled(Button)`
  transition: color 300ms ease-out;
  background: transparent !important;
  margin: 0;
  padding: 0;
  width: unset;
  color: ${props => (props.active ? '#000' : '#ccc')};
  :hover {
    color: #000;
  }
`;

const TweetButton = styled(Button)`
  transition: color 300ms ease-out;
  background: transparent !important;
  margin: 0;
  padding: 0;
  width: unset;
  color: ${props => (props.active ? '#000' : '#ccc')};
  :hover {
    color: #000;
  }
`;

const ImgCapture = styled(Button)`
  transition: color 300ms ease-out;
  background: transparent !important;
  margin: 0;
  padding: 0;
  width: unset;
  color: ${props => (props.active ? '#000' : '#ccc')};
  :hover {
    color: #000;
  }
  `;

const JoinCode = styled('div')`
  width: fit-content;
  margin: auto 0;
  cursor: pointer;
  span {
    font-size: 18px;
  }
`;

const TopBar = props => (
  <Container>
    {props.isAdmin && !props.started ? <StartGame addNotification={props.addNotification} /> : null}
    {props.word ? <Word><Trans>{props.word}</Trans></Word> : null}
    <ToggleScoreBoard onClick={props.toggleScoreBoard} active={props.showingScoreBoard}>
      <i className="fas fa-trophy" />
    </ToggleScoreBoard>
    <ImgCapture > <a href={props.saveImg()} download="My Drawing"> <i className="far fa-save" /> </a></ImgCapture>
    <TweetButton onClick={props.twitterCall}>
      Tweet
    </TweetButton>
    <JoinCode>
      <span>{props.joinCode}</span>
    </JoinCode>
  </Container>
);

TopBar.defaultProps = {
  word: false,
};

TopBar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired,
  word: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  joinCode: PropTypes.string.isRequired,
  showingScoreBoard: PropTypes.bool.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleScoreBoard: PropTypes.func.isRequired,
  saveImg: PropTypes.func.isRequired, // added
  twitterCall: PropTypes.func.isRequired,
};

export default TopBar;

