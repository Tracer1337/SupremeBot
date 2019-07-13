import React from "react"
import ReactDOM from "react-dom"

import "./assets/sass/styles.scss"

import Component1 from "./components/Component1.js"

const {setup_bot, start_bot} = require("./node-scripts/index.js")
window.setup_bot = setup_bot
window.start_bot = start_bot

const App = () => (
  <div>
    <h1>React works with JSX!</h1>
    <Component1/>
  </div>
)

ReactDOM.render(<App/>, document.getElementById("root"))
