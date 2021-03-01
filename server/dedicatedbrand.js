const axios = require('axios');
const { load } = require('cheerio');
const cheerio = require('cheerio');

const DEDIDACTED_BRAND = 'https://www.dedicatedbrand.com/';

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');

      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      const link = $(element)
      .find('.productList-link')
      .attr('href');

      const photo = $(element)
      .find('.productList-image img')
      .first()
      .attr('src');

      return {name, price, link, photo, brand : "dedicated"};
    })
    .get();
};

function parseHomepage (data) {
  const $ = cheerio.load(data);

  const $('.mainNavigation-link-subMenu-link')
  .map((i,element) => {
    const href = $(element).find('a').attr('href');
    return `${DEDIDACTED_BRAND}`;
  })
  .get();
}

module.exports.getPages = async (url = DEDIDACTED_BRAND) => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300){
    return parseHomepage(data);
  }

  console.error(status);

  return null;
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape_products = async url => {
  const response = await axios(url);
  
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse(data);
  }
  
  console.error(status);

  return null;
};

module.exports.scrape_links = async url => {
  const response = await axios(url);
  const {data,status} = response;
  
  if (status >= 200 && status < 300){
    return parse_links(data);
  }

  console.error(status);

  return null;
};

const parse_links = data => {
  const $ = cheerio.load(data);

  return $('.mainNavigation-fixedContainer ?mainNavigation-link-subMenu-link')
  .map((i, element) => {
    const link = $(element)
      .find('.mainNavigation-link-subMenu-link > a[href]')
      .attr('href')
    return link;
  })
  .get();
}