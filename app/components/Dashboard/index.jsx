import React, { Component } from 'react';

import Display from '../Display';
import Navbar from '../Navbar';
import Warning from '../Warning';
import TableComments from '../TableComments';
import Loading from '../Loading';

import getAllPagesComments from '../../helper/fetch';
import randomIndex from '../../helper/randomIndex';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      videoUrl: '',
      error: '',
      commentPicked: undefined,
      fetchInProgress: false,
    };
    this.fetchVideo = this.fetchVideo.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.pickComment = this.pickComment.bind(this);
  }

  handleInput(e) {
    if (e.target.value.includes('https://www.youtube.com/watch?v=')) {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ error: 'success' });
    } else if (e.target.value === '') {
      this.setState({ error: '' });
    } else {
      this.setState({ error: 'error' });
    }
  }

  fetchVideo(e) {
    const { videoUrl } = this.state;

    // if videoUrl doesnt match requirement and user
    // has submited some text then disable submit fetch
    if (videoUrl.length > 0) {
      const videoId = videoUrl.substring(32);
      this.setState({ fetchInProgress: true, comments: [] });

      getAllPagesComments(videoId, '')
        .then(ytData => this.setState({
          comments: ytData,
          commentPicked: undefined,
          fetchInProgress: false,
        }))
        .catch(() => this.setState({ error: 'error', fetchInProgress: false })); // if response if not 200 then error
    }

    e.preventDefault();
  }

  pickComment() {
    const { comments } = this.state;

    this.setState({ commentPicked: comments[randomIndex(comments)] });
  }

  render() {
    const {
      comments,
      error,
      commentPicked,
      fetchInProgress,
    } = this.state;

    return (
      <div>
        <Navbar />
        <div className="ml-5">
          <form onSubmit={this.fetchVideo} className="form-row">
            <div className="input-group col-6">
              <div className="input-group-prepend">
                <div className="input-group-text">URL</div>
              </div>
              <input
                onChange={this.handleInput}
                placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                name="videoUrl"
                className="form-control form-control-lg mr-2"
                required
              />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary btn-lg" />
          </form>
          <Warning error={error} />
          {fetchInProgress ? (
            <Loading />
          ) : (
            <div className="d-flex mt-5">
              {comments.length === 0 ? '' : (
                <div className="flex-fill shadow p-3 rounded mr-3 bg-light">
                  <p className="h3 text-primary mb-4">{comments.length === 0 ? '' : `Complete: Loaded ${comments.length} Comments!`}</p>
                  <button onClick={this.pickComment} type="button" className="btn btn-success btn-lg">
                    Pick A Winner
                  </button>
                </div>
              )}
              <div className="mr-5 w-50 flex-fill">
                {commentPicked === undefined ? '' : (
                  <Display comment={commentPicked.snippet.topLevelComment.snippet} />
                )}
              </div>
            </div>
          )}
          {comments.length === 0 ? '' : (
            <TableComments comments={comments} />
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
