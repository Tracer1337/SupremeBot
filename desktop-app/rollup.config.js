import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import json from "rollup-plugin-json"
import commonjs from "rollup-plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import {uglify} from "rollup-plugin-uglify"

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife"
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    }),
    json(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/react/index.js": ["React", "Component"]
      }
    }),
    postcss({
      minimize: true
    }),
    uglify()
  ]
}
