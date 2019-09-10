const puppeteer = require("puppeteer")

// Starts browser and sets it up
const setup = async (config) => {
  // Setting up puppeteer
  const browser = await puppeteer.launch({headless: false, args: ["--start-maximized"]})
  page = await browser.newPage()
  await page.setViewport({width: 1920, height: 800})

  // Setting Cookies specified in config.json
  await page.goto(config.pages.main)
  config.cookies.forEach(async cookie => await page.setCookie({name: cookie.name, value: cookie.value}))

  return Promise.resolve(page)
}

module.exports = setup
