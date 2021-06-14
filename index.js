const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const uri = `mongodb://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0-shard-00-00.bkfhf.mongodb.net:27017,cluster0-shard-00-01.bkfhf.mongodb.net:27017,cluster0-shard-00-02.bkfhf.mongodb.net:27017/${process.env.DB_USER}?ssl=true&replicaSet=atlas-loqoji-shard-0&authSource=admin&retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 5001;

app.get('/', (req, res) =>{
    res.send("Hello I am form DB");
    
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const userDataCollection = client.db("userOrder").collection("userData");
  const userPhoneCollection = client.db("userOrder").collection("userPhone");
  
  
  
  

  app.post('/orders', (req, res) => {
      const orders = req.body;
      console.log(orders);
      userDataCollection.insertOne(orders)
      .then(userResult =>{
          res.send(userResult.insertedCount > 0)
      })
  })
  app.get('/order', (req, res) => {
    userDataCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});


app.post('/phones', (req, res) => {
    const phone = req.body;
    console.log(phone);
    userPhoneCollection.insertOne(phone)
    .then(userResults =>{
        res.send(userResults.insertedCount > 0)
    })
})
app.get('/phone', (req, res) => {
    userPhoneCollection.find({})
      .toArray((err, document) => {
          res.send(document);
      })
});

});






app.listen(process.env.PORT || port);