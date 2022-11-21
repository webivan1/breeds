import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: '$1',
      },
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    css: true,
  },
})
