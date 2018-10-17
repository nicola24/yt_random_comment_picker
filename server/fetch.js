const fetch = require('node-fetch');

// const { apiKey } = require('./apiKey');
const apiKey = process.env.API_TOKEN; // heroku config var

const getOnePageComment = (videoId, pageToken) => {
  const url = [
    'https://www.googleapis.com/youtube/v3/commentThreads?',
    'part=snippet',
    'maxResults=100',
    `videoId=${videoId}`,
    `key=${apiKey}`,
    `pageToken=${pageToken}`,
  ].join('&');

  // check if status is 200
  return fetch(url).then(res => (res.status === 200 ? res.json() : null));
};

const getAllPagesComments = (videoId, pageToken) => {
  // get the comments for the first page by making simple API call
  return getOnePageComment(videoId, pageToken)
    .then((result) => {
      const comments = result.items;

      // Base case: this is the last page
      if (!result.nextPageToken) return comments;

      // Recursive step: get the rest of the pages, then concat it
      return getAllPagesComments(videoId, result.nextPageToken)
        .then(restOfVideoIds => comments.concat(restOfVideoIds));
    });
};

module.exports = getAllPagesComments;
