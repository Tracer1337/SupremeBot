// Add product to cart
const addToCart = async (page, product, config) => {
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

module.exports = addToCart
