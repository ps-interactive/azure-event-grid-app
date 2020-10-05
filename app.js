const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");
const express = require('express');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index', { title: ""}));

const randomID = () => '_' + Math.random().toString(36).substr(2, 9);

app.get('/store', (req, res) =>  res.render('store'));
app.post('/store', (req, res) => {
  const OrderID = randomID();
  const UserID = randomID();
  const ProductID = randomID();

  /**************
   Send Messages
  **************/
  async function main() {
    const endpoint = "";
    const accessKey = "";
    const client = new EventGridPublisherClient(endpoint, new AzureKeyCredential(accessKey));
    await client.sendEvents([
      {
        eventType: "CR.Orders.NewOrder",
        subject: "orders/new/online",
        dataVersion: "1.0",
        data: {
          message: `OrderID: ${OrderID}, UserID: ${UserID}, SKU: ${ProductID}`,
        }
      }
    ]);
  }

  main().then((data) => {
    res.render('store', { message: "Your order has been placed." });
  }).catch((err) => {
    res.render('store', { message: `An error was encountered: ${err}` });
  });
  /*************/

});

module.exports = app;
