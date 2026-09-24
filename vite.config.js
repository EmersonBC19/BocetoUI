import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Modo de compilación de la LIBRERÍA (para publicar en npm)
  if (mode === 'lib') {
    return {
      plugins: [react()],
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
          entry: resolve(import.meta.dirname, 'src/components/sketch/index.js'),
          name: 'BocetoUI',
          fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          // No incluir React dentro de la librería para evitar hooks duplicados
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime'
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                return 'styles.css';
              }
              return assetInfo.name || '[name][extname]';
            }
          }
        }
      }
    };
  }

  // Modo estándar para la aplicación web de Showcase / Documentación (compatible con GitHub Pages / subrutas)
  return {
    base: './',
    plugins: [react()],
    build: {
      outDir: 'dist-demo'
    }
  };
});
