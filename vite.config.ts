import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		viteCompression(),
		viteImagemin({
			gifsicle: { optimizationLevel: 7 },
			optipng: { optimizationLevel: 7 },
			mozjpeg: { quality: 75 },
			svgo: {
				plugins: [{ name: "removeViewBox", active: false }],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			treeshake: true,
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						const dirs = id.split("node_modules/")[1].split("/");
						if (dirs[0].startsWith("@")) {
							return `${dirs[0]}/${dirs[1]}`;
						}
						return dirs[0];
					}
				},
			},
		},
	},
});
