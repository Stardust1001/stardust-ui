import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import commonjs from '@rollup/plugin-commonjs'
import externalGlobals from 'rollup-plugin-external-globals'

import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

const resolve = dir => path.join(process.cwd(), dir)

export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [
      vue(),
      vueJsx(),
      createStyleImportPlugin({
        resolves: [VantResolve()]
      }),
      legacy({
        targets: ['defaults'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    ],
    runtimeCompiler: true,
    build: {
      outDir: 'dist',
      rollupOptions: {
        external: [
          'vue',
          'axios',
        ],
        plugins: [
          commonjs(),
          externalGlobals({
            'vue': 'Vue',
            'axios': 'axios',
          })
        ],
        output: {
          manualChunks (id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        'vue': 'vue/dist/vue.esm-bundler.js'
      }
    }
  }

  return config
})
