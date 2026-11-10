import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   server:{
//     proxy:{
//        '/api':'http://localhost:3000'
//      },
//   },
//   plugins: [react()],
// })
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // backend ka local port
    },
    allowedHosts: true,
  },
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     allowedHosts: [
//       'https://tinkling-crimson-renounce.ngrok-free.dev'
//     ],
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true
//       }
//     }
//   }
// })
