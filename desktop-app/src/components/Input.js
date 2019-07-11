class Input{
  constructor(type, name, placeholder){
    this.DOMNode = document.createElement("input")
    this.DOMNode.type = type
    this.DOMNode.name = name
    this.DOMNode.placeholder = placeholder
  }

  appendTo(parent){
    parent.appendChild(this.DOMNode)
  }

  setAttribute(name, value){
    this.DOMNode[name] = value
  }
}

module.exports = Input
