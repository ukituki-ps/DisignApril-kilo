import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.js' };
  },
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@mantine/core',
    '@emotion/react',
    '@emotion/styled',
    'lucide-react',
    '@xyflow/react',
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
    '@april/tokens'
  ]
});
