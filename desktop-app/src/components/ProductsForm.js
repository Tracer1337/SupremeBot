// Filling checkout form with input nodes
function fillProductsForm(form, template){
  for(let key in template){
    new Input("text", key, `${key} (${template[key]})`).appendTo(form)
  }
}

// Get header for products list
function productsHeader(){
  const row = document.createElement("tr")
  for(let key in config.productsTemplate){
    const cell = document.createElement("th")
    cell.innerHTML = key
    row.appendChild(cell)
  }
  return row
}

// Show all products which are queued to order#
function showProducts(list, products){
  while(list.firstChild)
    list.removeChild(list.firstChild)

  list.appendChild(productsHeader())

  products.forEach((product, i) => {
    const row = document.createElement("tr")
    for(let key in product){
      const cell = document.createElement("td")
      cell.innerHTML = product[key]
      row.appendChild(cell)
    }
    list.appendChild(row)
  })
}
// Handling form submition
function handleProductsFormSubmition(form, products){
  const inputs = Array.from(form.getElementsByTagName("input"))
  const product = {}
  inputs.forEach(input => {
    product[input.name] = input.value
    input.value = null
  })
  products.push(product)
  fs.writeFileSync(__dirname+"/../node-js-script/products.json", JSON.stringify(products, null, 2))
}

module.exports = {
  fillProductsForm,
  showProducts,
  handleProductsFormSubmition
}
