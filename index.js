const uuid = require('uuid').v4;
const api = require('ms-rest-azure');
const EventGrid = require("azure-eventgrid");
const url = require('url');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const topic = '';
  const endpoint = '';

  let client = new EventGrid(new api.TopicCredentials(topic));
  let hostname = url.parse(endpoint, true).host;

  let events = [{
    id: uuid(),
    subject: 'Quote',
    dataVersion: '2.0',
    eventType: 'CarvedRock.Form.NewEntry',
    data: { items : [{'sku': 'asdfasdfasdf', count: '5'}] },
    eventTime: new Date()
  }];

  client.publishEvents(hostname, events)
        .then(result => Promise.resolve(console.log('Published events successfully.')))
        .catch(err => console.log('An error ocurred ' + err));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));