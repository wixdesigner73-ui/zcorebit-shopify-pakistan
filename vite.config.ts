import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// VITE_BASE lets GitHub Pages serve from /<repo>/ ; defaults to "/" for local dev.
export default defineConfig({ base: process.env.VITE_BASE || '/', plugins: [react()], build: { chunkSizeWarningLimit: 900 } });
