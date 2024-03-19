import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import * as path from "path";

export default defineConfig({
	css: {
		preprocessorOptions: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: `@import "@/assets/index.scss";`,
					},
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				secure: false,
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
});
