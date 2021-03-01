const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://<Alban Tchikladzé>:<Sevra_07>@<cluster-url>?retryWrites=true&writeConcern=majority';
const MONGODB_DB_NAME = 'clearfashion';


async function Connect (MONGODB_URI, MONGODB_DB_NAME) {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME)
};

Connect(MONGODB_URI, MONGODB_DB_NAME)
