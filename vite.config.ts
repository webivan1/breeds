import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: '$1',
      },
      {
        find: '@',
        replacement: '/src',
      },
    ],
    // alias: {
    //   '@': '/src',
    //   '~': '/node_modules',
    // },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    css: true,
  },
})
