const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://AlbanTchik:<aqwzsxedc>@clearfashion.eba8d.mongodb.net/ClearFashion?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';


async function Connect (MONGODB_URI, MONGODB_DB_NAME) {
    try{
        //const client = await mongoose.connect(MONGODB_URI, {'useNewUrlParser': true}).then(() => console.log('DB connected ! ')).catch(err => console.error(err));

        const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, {'useNewUrlParser': true} );
        const db =  client.db(MONGODB_DB_NAME)
    }
    catch{

    };


};

const products = [];

function insertProducts (products){
    const collection = db.collection('products');
    const result = collection.insertMany(products);
    
console.log(result);
}




Connect(MONGODB_URI, MONGODB_DB_NAME);
//insertProducts(products);
