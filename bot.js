const puppeteer = require("puppeteer")
const config = require("./config.json")
const productsToOrder = require("./products.json")

// Sleep t seconds
const sleep = t => new Promise(resolve => setTimeout(resolve, t*1000))

// Add product to cart
const addToCart = async (page, product) => {
  await page.goto(config.pages.shop+product.category)

  // Get URL of product
  const url = await page.evaluate((product, selectors) => {
    const products = document.getElementsByTagName(selectors.product)
    const test = (element, selector, query) => element.querySelector(selectors.product_inner+" "+selector).innerText.toLowerCase().includes(query.toLowerCase())
    const getProductByNameAndColor = (name, color) => Array.from(products).find(e => test(e, selectors.product_name, name) && test(e, selectors.product_color, color))
    const getProductLink = article => article.querySelector(selectors.product_inner+" "+selectors.product_link).href
    const isSoldOut = article => !!article.querySelector(selectors.product_sold_out)

    productDOMElement = getProductByNameAndColor(product.name, product.color)

    if(isSoldOut(productDOMElement))
      return Promise.resolve(false)

    return Promise.resolve(getProductLink(productDOMElement))
  }, product, config.selectors)

  if(!url) return Promise.resolve(false)

  await page.goto(url)

  // Click on "add to cart"
  await page.click(config.selectors.add_to_cart)
  return Promise.resolve(true)
}

const run = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  // Setting Cookies specified in config.json
  await page.goto(config.pages.main)
  config.cookies.forEach(async cookie => await page.setCookie({name: cookie.name, value: cookie.value}))

  // Add all products to cart
  console.log("Trying to order:")
  console.table(productsToOrder)
  for(let p of productsToOrder){
    const addedToCart = await addToCart(page, p)
    if(!addedToCart) console.log(`${p.name} - ${p.color}: sold out`)
    else console.log(`${p.name} - ${p.color}: added to cart`)
    await sleep(.1)
  }

  // Checkout

}
run()