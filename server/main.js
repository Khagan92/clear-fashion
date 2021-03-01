const dedicatedbrand = require('./dedicatedbrand.js');

const products = await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/news');
console.log(products);
/*
products.forEach(product => {
  console.log(products.name);
})
*/