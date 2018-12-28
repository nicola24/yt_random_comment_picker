const express = require('express');
const client = require('twilio');

const {
  accountSid, authToken, twilioFrom, twilioTo,
} = require('../apiKey');

const getAllPagesComments = require('./helper/fetch');

const router = express.Router();

// GET: retreive all the comments
router.route('/getcomments/:videoid').get((req, res) => {
  const { videoid } = req.params;

  getAllPagesComments(videoid, '').then(ytData => res.send(ytData));
});

// POST: send text message to admin phone number including winner infor
router.route('/sms').post((req, res) => {
  client(accountSid, authToken).messages
    .create({
      body: req.body.textMessage,
      from: twilioFrom,
      to: twilioTo,
    })
    .done(() => res.send());
});

module.exports = router;
