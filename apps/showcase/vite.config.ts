import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@april/ui': path.resolve(dir, '../../packages/ui/src/index.ts'),
      '@april/tokens': path.resolve(dir, '../../packages/tokens/src/index.ts')
    }
  }
});
