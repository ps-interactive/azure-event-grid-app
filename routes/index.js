const uuid = require('uuid').v4;
const api = require('ms-rest-azure');
const EventGrid = require("azure-eventgrid");
const url = require('url');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  // const topic = '';
  // const endpoint = '';

  // let client = new EventGrid(new api.TopicCredentials(topic));
  // let hostname = url.parse(endpoint, true).host;

  // let events = [{
  //   id: uuid(),
  //   subject: 'Quote',
  //   dataVersion: '2.0',
  //   eventType: 'CarvedRock.Orders.NewOrder',
  //   data: { items : [{'sku': 'CRO1001GB', description: 'Grey Boots', count: '5'}] },
  //   eventTime: new Date()
  // }];

  // client.publishEvents(hostname, events)
  //       .then(result => Promise.resolve(console.log('Published events successfully.')))
  //       .catch(err => console.log('An error ocurred ' + err));
});

module.exports = router;
