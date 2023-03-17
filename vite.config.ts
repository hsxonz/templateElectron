/// <reference types="vitest" />
import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import { writeFileSync } from 'fs-extra'
import vue from '@vitejs/plugin-vue'
import { VitePluginDoubleshot } from 'vite-plugin-doubleshot'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import {
  NaiveUiResolver,
} from 'unplugin-vue-components/resolvers'
import { compileFile } from 'bytenode'

const root = join(__dirname, 'src/render')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [
    vue(),
    WindiCSS(),
    Components({ resolvers: [NaiveUiResolver()] }),
    VitePluginDoubleshot({
      type: 'electron',
      main: 'dist/main/index.js',
      entry: 'src/main/index.ts',
      outDir: 'dist/main',
      external: ['electron'],
      electron: {
        build: {
          config: './electron-builder.config.js',
        },
        preload: {
          entry: 'src/preload/index.ts',
          outDir: 'dist/preload',
        },
      },
      afterBuild: async () => {
        await compileFile({
          filename: './dist/main/index.js',
          output: './dist/main/main.jsc',
          electron: true,
        })

        // eslint-disable-next-line @typescript-eslint/quotes
        writeFileSync('./dist/main/index.js', "require('bytenode');require('./main.jsc')")
      },
    }),
  ],
  resolve: {
    alias: {
      '@render': join(__dirname, 'src/render'),
      '@main': join(__dirname, 'src/main'),
      '@common': join(__dirname, 'src/common'),
      '@api': join(__dirname, 'src/api'),
    },
  },
  base: './',
  build: {
    outDir: join(__dirname, 'dist/render'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        splash: resolve(root, 'splash', 'index.html'),
      },
    },
  },
})
