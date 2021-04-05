require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = process.env.MONGODB_URI;

let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, {'ordered': false});

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};




/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};

// Find all products related to a given brands
module.exports.ProductByBrand = async (brand)=>{
  try{
    const db = await getDB();
    const collection = db.collection('products');
    const query = await collection.find({'brand':brand}).toArray();
    console.log(query)
    return query
  }
  catch(error){
    console.error("error with query : ProductByBrand",error);
    process.exit(1);
  }
}

// Find all products less than a price
module.exports.ProductLessThanPrice = async (Price) => {
  try{
    const db = await getDB();
    const collection = db.collection('products');
    const query = await collection.find({'price': {$lt : Price}}).toArray();     
    console.log(query)
    return query
}
catch(error){
  console.error("error with query : ProductLessThanPrice",error);
  process.exit(1);
  }
}

// Find all products sorted by price
module.exports.ProductByPrice = async (Price) => {
  try{
    const db = await getDB();
    const collection = db.collection('products');
    const query = await collection.find().sort({ price : -1}).toArray();     
    console.log(query)
    return query
}
catch(error){
  console.error("error with query : ProductByPrice",error);
  process.exit(1);
  }
}

module.exports.getMeta = async(page, size,query=null ) => {
  const db = await getDB();
  const collection = db.collection(MONGODB_COLLECTION);
  let count;
  if (query==null){
    count = await collection.count();
  }
  else{
    count = await collection.find(query).count();
  }
  
  const pageCount = Math.ceil(count/size);
  return {"currentPage" : page,"pageCount":pageCount,"pageSize":size,"count":count} 
}

module.exports.findPage = async (page,size,query=null) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const offset = page ? page * size : 0;
    let result;
    if(query==undefined){
      result = await collection.find({}).skip(offset)
                  .limit(size).toArray(); 
    }else{
      result = await collection.find(query).skip(offset)
                  .limit(size).toArray(); 
    }
    
    return result;
  } catch (error) {
    console.error('🚨 collection.findPage...', error);
    return null;
  }
};