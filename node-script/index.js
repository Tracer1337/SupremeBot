const puppeteer = require("puppeteer")
const chalk = require("chalk")
const schedule = require("node-schedule")

const config = require("./config/config.json")
const checkout_autofill = require("./config/checkout.json")
const productsToOrder = require("./config/products.json")

const setup = require("./functions/setup.js")
const run = require("./functions/run.js")
const addToCart = require("./functions/addToCart.js")

setup(config).then(page => {
    run(page, productsToOrder, checkout_autofill, config)
})

module.exports = {setup_bot: setup, start_bot: run}
