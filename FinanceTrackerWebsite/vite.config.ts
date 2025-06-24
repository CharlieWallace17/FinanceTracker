import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

import react from '@vitejs/plugin-react'

import { Plugin, defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true
    }),
    react(),
    tailwindcss() as Plugin[]
  ],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'utility': path.resolve(__dirname, './src/components/utility'),
      'routes': path.resolve(__dirname, './src/routes'),
      'types': path.resolve(__dirname, './src/types'),
      'api': path.resolve(__dirname, './src/api')
    }
  }
})
