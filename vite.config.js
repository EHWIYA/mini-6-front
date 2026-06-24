import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const backendUrl = 'http://team-14-backend-alb-256967163.ap-southeast-1.elb.amazonaws.com'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_DEV_PROXY_TARGET || backendUrl

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
