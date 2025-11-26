import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    port: 5001,
    cors: true,
    strictPort: true, // 포트 충돌 시 에러
  },
  base: process.env.NODE_ENV === 'production' ? '/game/bini-puzzle/' : '/',
  build: {
    outDir: resolve(__dirname, '../../../dist/game/bini-puzzle'),
    emptyOutDir: true,
  },
});
