import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SMS extends Component {
  sendMessage() {
    const { comment } = this.props;

    fetch('/api/sms', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        textMessage: `The winner is: ${comment.authorDisplayName}, Channel URL: ${comment.authorChannelUrl}`,
      }),
    })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <button onClick={() => this.sendMessage()} type="button" className="btn btn-primary btn-sm">
        Send a Text Message
      </button>
    );
  }
}

SMS.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SMS;
