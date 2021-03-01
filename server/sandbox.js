/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');

async function sandbox (eshop) {
  try {
    const pages = await dedicatedbrand.getPages();

    console.log(`${pages.length} found`);

    if(!eshop){
      eshop = pages[Math.floor(Math.random() * pages.length)];
    }

    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
