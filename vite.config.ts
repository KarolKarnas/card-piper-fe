import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
