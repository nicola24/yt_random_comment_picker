import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import SMS from '../SMS';

const Winner = ({ comment }) => (
  <div className="shadow p-3 rounded w-auto h-auto bg-light">
    <p className="border-bottom h6 pb-2 text-primary">And The Winner Is ...</p>
    <a href={comment.authorChannelUrl} target="_blank" rel="noopener noreferrer" className="d-flex justify-content-center">
      <img className="rounded-circle" src={comment.authorProfileImageUrl} alt="avatar" width="70" height="70" />
    </a>
    <p className="d-flex justify-content-center mt-2">
      {comment.authorDisplayName}
    </p>
    <p className="d-flex justify-content-center">
      {comment.textOriginal}
    </p>
    <p className="d-flex justify-content-center">
      {`👍 ${comment.likeCount}`}
    </p>
    <p className="d-flex justify-content-center">
      {`posted ${moment.utc(comment.updatedAt).startOf('min').fromNow()}`}
    </p>
    <SMS comment={comment} />
  </div>
);

Winner.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Winner;
