import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
    ],
    runtimeCompiler: true,
    build: {
      outDir: '../dist',
      lib: {
        entry: './packages/index.js',
        name: 'StardustUI',
        fileName: 'stardust-ui',
        formats: ['es']
      },
      rollupOptions: {
        external: [
          'vue',
          'element-plus',
          'vant',
          'axios',
        ],
        plugins: [
          commonjs(),
          externalGlobals({
            'vue': 'Vue',
            'element-plus': 'ElementPlus',
            'vant': 'vant',
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
