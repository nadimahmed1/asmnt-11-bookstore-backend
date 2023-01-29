const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello BookStore')
})

app.listen(port, () => {
    console.log('BookStore is Running');
})

// 


const uri = `mongodb+srv://${process.env.DB_USER_BOOK}:${process.env.DB_PASS_BOOK}@cluster0.chw5ad1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('db connected');


async function run() {
    try {
        await client.connect()

        const bicycleCollection = client.db('bicycle').collection('store')
        const bicycleCollection2 = client.db('bicycle2').collection('store2')

        app.get('/bicycle', async (req, res) => {
            const query = {};
            const cursor = bicycleCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/bicycle2', async (req, res) => {
            const query = {};
            const cursor = bicycleCollection2.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // 
        app.get('/bicycle/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const server = await bicycleCollection.findOne(query);
            res.send(server);

        })
        // post

        app.post('/bicycle', async (req, res) => {
            const newServer = req.body;
            const result = await bicycleCollection.insertOne(newServer);
            res.send(result);
        });

        // Delete
        app.delete('/bicycle/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await bicycleCollection.deleteOne(query);
            res.send(result);
        })
    }
    catch {

    }
}
run().catch(console.dir);
