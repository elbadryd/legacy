import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import socket from '../../../sockets';
import ChatMessage from './Message';
import {
  Container,
  WindowStyles,
  EnterMessage,
  MessageInput,
  MessageButton,
} from './styles';
import i18n from '../../../i18n';

const Window = React.forwardRef((props, ref) => (
  <div ref={ref} className={WindowStyles}>{props.children}</div>
));

class ChatBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: '',
    };

    // this.chatWindowRef = React.createRef();
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onGameJoined = this.onGameJoined.bind(this);
    this.onRoundIncorrectGuess = this.onRoundIncorrectGuess.bind(this);
    this.onRoundCorrectGuess = this.onRoundCorrectGuess.bind(this);
  }

  componentDidMount() {
    const { nickname } = this.props;

    this.onGameJoined({ nickname });

    socket.on('game:joined', this.onGameJoined);
    socket.on('round:incorrect_guess', this.onRoundIncorrectGuess);
    socket.on('round:correct_guess', this.onRoundCorrectGuess);
  }

  componentWillUnmount() {
    socket.off('game:joined', this.onGameJoined);
    socket.off('round:incorrect_guess', this.onRoundIncorrectGuess);
    socket.off('round:correct_guess', this.onRoundCorrectGuess);
  }

  onGameJoined({ nickname }) {
    const joinedMessage = `${nickname} ${i18n.t('joined the game')}`;
    this.addMessage({ message: joinedMessage, nickname: null });
  }

  onRoundIncorrectGuess(message) {
    this.props.addNotification({
      message: `INCORRECT! \n ${message.nickname} guessed ${message.message}`,
      level: 'error',
      autoDismiss: 2,
    });
    // this.addMessage(message);
  }

  onRoundCorrectGuess(message) {
    this.props.addNotification({
      message: `CORRECT! \n ${message.nickname} guessed ${message.message}`,
      level: 'error',
      autoDismiss: 2,
    });
  }

  onKeyPress({ key }) {
    if (key === 'Enter') {
      this.sendMessage();
    }
  }

  setMessage({ target }) {
    this.setState({ newMessage: target.value });
  }

  // scrollChatWindowToBottom() {
  //   const chatWindow = this.chatWindowRef.current;
  //   chatWindow.scrollTo(0, chatWindow.scrollHeight);
  // }

  addMessage(message) {
    this.setState(
      { messages: [...this.state.messages, message] },
    );
  }

  sendMessage() {
    const { nickname, joinCode } = this.props;
    const { newMessage } = this.state;

    if (!newMessage) {
      this.props.addNotification({
        message: i18n.t('Please enter a message'),
        level: 'error',
        autoDismiss: 2,
      });
    } else {
      this.setState({ newMessage: '' });
      // get this mesage to display in the window;
      socket.emit('round:guess', { message: newMessage, nickname, joinCode });
    }
  }

  render() {
    const { messages, newMessage } = this.state;
    const { canGuess } = this.props;

    return (
      <Container>
        {/* <Window ref={this.chatWindowRef}>
          {messages.map(message => (
            <ChatMessage
              key={uuid()}
              nickname={message.nickname}
              message={message.message}
            />
          ))}
        </Window> */}
        <EnterMessage>
          <div>
            {messages.map(message => <div><div>{message.nickname}</div><div>{message.message}</div></div>)}
          </div>
          <MessageInput
            onChange={this.setMessage}
            onKeyPress={this.onKeyPress}
            value={newMessage}
            disabled={!canGuess}
            placeholder={i18n.t('Make a guess')}
            type="text"
          />
          <MessageButton onClick={this.sendMessage} disabled={!canGuess}>
            <i className="far fa-paper-plane" />
          </MessageButton>
        </EnterMessage>
      </Container>
    );
  }
}

ChatBox.propTypes = {
  canGuess: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  joinCode: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default ChatBox;
