import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      buffer: 'buffer',
      util: 'util',
      'readable-stream': 'readable-stream',
      events: 'events',
    },
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  optimizeDeps: {
    include: ['buffer', 'crypto-browserify', 'stream-browserify', 'assert', 'util', 'readable-stream', 'events'],
    esbuildOptions: {
      target: 'esnext',
      supported: { bigint: true },
    },
  },
})