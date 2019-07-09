# Supreme Bot
* [System Requirements](#anchor-requirements)
* [Configuration](#anchor-configuration)
* [Usage](#anchor-usage)

<a name="anchor-requirements"></a>
# System Requirements
In order to run the bot, you have to have the latest version of [Node.js](https://nodejs.org/en/download/) installed.
It is recommended to have a fast internet connection, since it is all about speed.

<a name="anchor-configuration"></a>
# Configuration
There are two files you have to change for the bot to work proberly.
1. [products.json](#anchor-configuration-products)
1. [checkout.json](#anchor-configuration-checkout)
<a name="anchor-configuration-products"></a>
### products.json
This file stores data about the products you want to order. The bot will try to order everything listed in this file with the specifications defined. The scheme is:
```JSON
[
  {
    "name": "A keyword that will be contained in the products name (e.g. the name is 'Supreme®/Nike®/NBA Headband' your keyword could be 'Headband')",

    "category": "The category the product will be in (e.g. accessories, tshirts, hats, ...)",

    "color": "The color which you want the product to be (e.g. red, black, yellow, ...)",

    "size": "This argument is optional, that means the bot will take the smallest available size if nothing is specified here. (e.g. small, medium, large, ...)"
  }
]
```
The file is already filled with some data, so you only have to change the fields existing or delete some.

<a name="anchor-configuration-checkout"></a>
### checkout.json
This file contains the checkout details which will be auto-filled by the bot. This file does not exist already, but there is a template file with blank fields which you have to fill out with you personal data. It is pretty much self explaining.

<a name="anchor-usage"></a>
# Usage
Before you can use the bot, you have to run ``npm install`` inside the root directory of the bot. It will install all dependencies needed and with them the chromium browser, that's why it may take a while to run this command. This command is only neccessary once.

To start the bot you have to run ``node index.js`` in the terminal inside the root folder of the bot.

Once the bot is running it will create an instance of chromium in which it will excecute the order. The bot will finish on the checkout page on which you only have to accept the order.

&copy; 2019 Merlin Moelter
