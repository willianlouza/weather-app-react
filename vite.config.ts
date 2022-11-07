import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default ({mode}) => {
  dotenv.config()
  return defineConfig({
    plugins: [react()],
    base: "/weather-app-react/"
  })
}

