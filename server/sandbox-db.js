/* eslint-disable no-console, no-process-exit */
<<<<<<< HEAD
const dedicatedbrand = require('./sources/dedicatedbrand');
const loom = require('./sources/loom');
=======
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74
const db = require('./db');

async function sandbox () {
  try {
    let products = [];
    let pages = [
      'https://www.dedicatedbrand.com/en/men/basics',
      'https://www.dedicatedbrand.com/en/men/sale'
    ];

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page
    for (let page of pages) {
      console.log(`🕵️‍♀️  scraping ${page}`);

      let results = await dedicatedbrand.scrape(page);

      console.log(`👕 ${results.length} products found`);

      products.push(results);
    }

    pages = [
      'https://www.loom.fr/collections/hauts',
      'https://www.loom.fr/collections/bas'
    ];

    console.log('\n');

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

<<<<<<< HEAD
    const promises = pages.map(loom.scrape);
=======
    const promises = pages.map(page => loom.scrape(page));
>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

<<<<<<< HEAD
=======
    console.log(results);
    console.log(results.flat());

>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74
    products.push(results.flat());
    products = products.flat();

    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log('💽  Find Loom products only');

    const loomOnly = await db.find({'brand': 'loom'});

<<<<<<< HEAD
=======
    console.log(`👕 ${loomOnly.length} total of products found for Loom`);
>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74
    console.log(loomOnly);

    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();
