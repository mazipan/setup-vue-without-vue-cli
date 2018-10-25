import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import pkg from './package.json'

const isProduction = !process.env.ROLLUP_WATCH // eslint-disable-line

export default {
  input: 'src/index.js',
  output: {
    globals: { 
      vue: 'Vue' 
    },
    file: 'dist/bundle.js',
    format: 'umd'
  },
  external: Object.keys(pkg.dependencies),
  plugins: [
    resolve(),
    css(),
    vue({
      css: false,
      template: {
        isProduction,
        compilerOptions: { 
          preserveWhitespace: false 
        }
      }
    }),
    buble(),
    bundleSize(),
  ]
}
