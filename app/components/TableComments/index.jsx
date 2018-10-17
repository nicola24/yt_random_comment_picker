import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

const TableComments = ({ comments }) => (
  <div className="mr-5 mt-4 mb-5 shadow p-3 rounded mr-3 bg-light">
    <table className="table table-hover table-sm">
      <thead className="thead-light">
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Comment</th>
          <th className="text-center" scope="col">Like Count</th>
          <th className="text-center" scope="col">Reply Count</th>
          <th scope="col">Posted on</th>
        </tr>
      </thead>
      <tbody>
        {comments
          .sort((a, b) => b.snippet.topLevelComment.snippet.likeCount - a.snippet.topLevelComment.snippet.likeCount)
          .map(x => (
            <tr key={x.snippet.topLevelComment.id}>
              <td style={{ maxWidth: 100 }}>
                <a href={x.snippet.topLevelComment.snippet.authorChannelUrl} target="_blank" rel="noopener noreferrer">
                  {x.snippet.topLevelComment.snippet.authorDisplayName}
                </a>
              </td>
              <td style={{ maxWidth: 450 }}>{x.snippet.topLevelComment.snippet.textOriginal}</td>
              <td className="text-center">{x.snippet.topLevelComment.snippet.likeCount}</td>
              <td className="text-center">{x.snippet.totalReplyCount}</td>
              <td>{moment.utc(x.snippet.topLevelComment.snippet.updatedAt).startOf('min').fromNow()}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

TableComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default TableComments;
