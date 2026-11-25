import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/pdfjs-dist') || id.includes('node_modules/react-pdf')) {
                        return 'pdf-viewer';
                    }
                    if (id.includes('node_modules/react-icons')) {
                        return 'icons';
                    }
                    if (id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
                        return 'react-vendor';
                    }
                },
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
