const chalk = require("chalk")
const addToCart = require("./addToCart.js")
const sleep = require("./sleep.js")

// Orders products
const run = async (page, productsToOrder, checkout_autofill, config) => {
  // Initializing timer
  console.time("Excecution time")

  console.log("Trying to order:")
  console.table(productsToOrder)

  // Add all products to cart
  for(let p of productsToOrder){
    const addedToCart = await addToCart(page, p, config)
    if(!addedToCart) console.log(chalk.red(`${p.name} - ${p.color}: sold out`))
    else console.log(chalk.green(`${p.name} - ${p.color}: added to cart`))
    await sleep(.1)
  }

  // Checkout autofill
  await page.goto(config.pages.checkout)
  console.log("Checkout loaded")
  await page.evaluate((data) => {
    for(let field of data)
      document.getElementsByName(field.name)[0].value = field.value
  }, checkout_autofill)
  page.$(config.selectors.checkout_terms).then(async e => await e.click())
  console.timeEnd("Excecution time")

  return Promise.resolve()
}

module.exports = run
