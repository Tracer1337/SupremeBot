const puppeteer = require("puppeteer")
const chalk = require("chalk")
const schedule = require("node-schedule")

const config = require("./config.json")
const checkout_autofill = require("./checkout.json")
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

  // Set size if neccessary
  if(product.size) await page.evaluate(size => {
    const selectElement = document.getElementById("size")
    const match = Array.from(selectElement.getElementsByTagName("option")).filter(e => e.innerText.toLowerCase().includes(size.toLowerCase()))[0]
    if(match)
      selectElement.value = match.value
  }, product.size)

  // Click on "add to cart"
  await page.click(config.selectors.add_to_cart)
  return Promise.resolve(true)
}

// Main function
const setup = async () => {
  // Setting up puppeteer
  const browser = await puppeteer.launch({headless: false, args: ["--start-maximized"]})
  const page = await browser.newPage()
  await page.setViewport({width: 1920, height: 800})

  // Setting Cookies specified in config.json
  await page.goto(config.pages.main)
  config.cookies.forEach(async cookie => await page.setCookie({name: cookie.name, value: cookie.value}))

  const run = async () => {
    // Initializing timer
    console.time("Excecution took")

    console.log("Trying to order:")
    console.table(productsToOrder)

    // Add all products to cart
    for(let p of productsToOrder){
      const addedToCart = await addToCart(page, p)
      if(!addedToCart) console.log(chalk.red(`${p.name} - ${p.color}: sold out`))
      else console.log(chalk.green(`${p.name} - ${p.color}: added to cart`))
      await sleep(.1)
    }

    // Checkout autofill
    await page.goto(config.pages.checkout)
    await page.evaluate((data) => {
      for(let field of data)
        document.getElementsByName(field.name)[0].value = field.value
    }, checkout_autofill)
    page.$(config.selectors.checkout_terms).then(async e => await e.click())
    console.timeEnd("Excecution took")
  }

  schedule.scheduleJob("30 15 22 * * *", run)
}
setup()
