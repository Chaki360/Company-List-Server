const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a4ebrxa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const companyCollection = client.db('Notary-Company-List').collection('company-List');
        app.get('/mock', async (req, res) => {
            const query = {};
            const cursor = companyCollection.find(query);
            const companies = await cursor.toArray();
            res.send(companies)
        });
        app.post('/mock', async (req, res) => {
            const company = req.body;
            const result = await companyCollection.insertOne(company);
            res.send(result);

        });

    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Notary Company List!')
})

app.listen(port, () => {
    console.log(`Hello from Notary Company List ${port}`)
})