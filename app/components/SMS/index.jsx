import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }

  sendMessage() {
    const { comment } = this.props;

    fetch('/api/sms', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        textMessage: `The winner is: ${comment.authorDisplayName}, Channel URL: ${comment.authorChannelUrl}`,
      }),
    })
      .then(res => res.json())
      .then(message => this.setState({ status: message.status }))
      .catch(err => console.log(err));
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <button onClick={() => this.sendMessage()} type="button" className="btn btn-primary btn-sm">
          Send a Text Message
        </button>
        {status.length === 0 ? '' : <p>{status}</p>}
      </div>
    );
  }
}

SMS.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SMS;
