import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Trans } from 'react-i18next';
import axios from '../../axios';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

class JoinGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      joinCode: '',
      error: '',
    };

    this.setJoinCode = this.setJoinCode.bind(this);
    this.join = this.join.bind(this);
  }

  setJoinCode({ target }) {
    this.setState({ joinCode: target.value });
  }

  join() {
    const { joinCode } = this.state;
    const { history } = this.props;

    if (joinCode.length >= 7) {
      axios.post('/codes', { joinCode })
        .then(response => (response.data.valid
          ? history.push(`/games/${joinCode}`)
          : this.setState({ error: 'There are no games with that join code!' })
        ))
        .catch(() => this.setState({ error: 'There are no games with that join code!' }));
    } else {
      this.setState({ error: 'Join code must be at least 7 chars long.' });
    }
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <Trans><Input onChange={this.setJoinCode} placeholder="Join code" type="text" /></Trans>
        <Button onClick={this.join}><Trans>Play</Trans>!</Button>
        {error ? <p>{error}</p> : null}
      </div>
    );
  }
}

JoinGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default JoinGame;
