import React from 'react';
import PropTypes from 'prop-types';

const Warning = ({ error }) => {
  const warning = () => {
    switch (error) {
      case 'error':
        return <div className="text-danger">Ooops... Did you enter the right url?</div>;
      case 'success':
        return <div className="text-success">Looks good!</div>;
      default:
        return <div className="text-muted">Enter a youtube video url containing a video id.</div>;
    }
  };

  return (
    <div className="mt-1">
      {warning()}
    </div>
  );
};

Warning.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Warning;
