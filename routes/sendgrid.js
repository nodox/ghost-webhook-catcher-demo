var express = require('express');
var router = express.Router();
const axios = require('axios')
const logger = require('../logger')

const addContactToSendgridList = async (email) => {
  const SENDGRID_ENDPOINT = "https://api.sendgrid.com/v3/marketing/contacts"
  const SENDGRID_TOKEN = process.env.SENDGRID_TOKEN
  const SENDGRID_LIST = process.env.SENDGRID_LIST

  const token = SENDGRID_TOKEN
  const options = { 
    headers: { 
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }

  var data = JSON.stringify({
    "list_ids": [
      // list: members
      SENDGRID_LIST,
    ],
    "contacts": [{
      "email": email,
    }]
  })

  let response = undefined
  
  try {
    response = await axios.put(SENDGRID_ENDPOINT, data, options)

    logger.info(response)
  } catch (e) {
    throw e
  }
  
}

/* GET users listing. */
router.post('/members/new', async function(req, res, next) {
  logger.info(req.body)

  const { 
    email
  } = req.body.member.current

  try {
    await addContactToSendgridList(email)

  } catch (e) {
    logger.error(e)

    return res.status(500).json({
      message: "bad"
    });
  }


  return res.status(200).json({
    message: "ok"
  });

});

module.exports = router;

