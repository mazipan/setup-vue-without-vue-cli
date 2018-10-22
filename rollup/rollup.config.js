import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import pkg from './package.json'

const external = Object.keys(pkg.dependencies)
const isProduction = !process.env.ROLLUP_WATCH // eslint-disable-line
const globals = { vue: 'Vue' }

const plugins = [
  resolve(),
  css(),
  vue({
    css: false,
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    }
  }),
  buble(),
  bundleSize(),
]

export default {
  external,
  plugins,
  input: 'src/index.js',
  output: {
    globals,
    file: 'dist/bundle.js',
    format: 'umd'
  }
}
