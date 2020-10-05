const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  async function main() {
    const accessKey = "";
    const client = new EventGridPublisherClient(endpoint, new AzureKeyCredential(accessKey));
    await client.sendEvents([
      {
        eventType: "CR.Orders.NewOrder",
        subject: "orders/new/online",
        dataVersion: "1.0",
        data: {
          message: "Order: Grey Boots, Count: 5, SKU: CR1001ONL38",
        }
      }
    ]);
  }

  main().catch((err) => {
    res.render('index', { title: `An error was encountered: ${err}` });
  });

});

module.exports = router;
