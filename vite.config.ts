import { defineConfig } from 'vite'
import {resolve} from "path";
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/shared/components'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@pages': resolve(__dirname, './src/pages'),
      '@styles': resolve(__dirname, './src/styles'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
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
    port: 3000,
    cors: true,
  },
})
