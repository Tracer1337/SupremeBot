// Filling checkout form with input nodes
function fillCheckoutForm(form, data){
  data.forEach(entry => {
    const input = new Input("text", entry.name, entry.desc+"...")
    input.setAttribute("value", entry.value)
    input.appendTo(form)
  })
}

// Handling form submition
function handleCheckoutFormSubmition(form, data){
  const inputs = Array.from(form.getElementsByTagName("input"))
  data = data.map(entry => ({...entry, value: inputs.find(e => e.name == entry.name).value}))
  fs.writeFileSync(__dirname+"/../node-js-script/checkout.json", JSON.stringify(data, null, 2))
}

module.exports = {
  fillCheckoutForm,
  handleCheckoutFormSubmition
}
