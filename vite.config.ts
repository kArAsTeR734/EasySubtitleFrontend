import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@ui': path.resolve(__dirname, 'src/shared/ui'),
      '@lib': path.resolve(__dirname, 'src/shared/lib'),
      '@types': path.resolve(__dirname, 'src/shared/types'),
      '@api': path.resolve(__dirname, 'src/shared/api'),
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      globalModulePaths: [],
      generateScopedName: undefined,
      hashPrefix: '',
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/helpers" as *;
        @use "@/styles/variables" as *;
      `,
      },
      less: {},
      stylus: {},
    },
  },
  server: {
    port: 3031,
    cors: false,
  },
})