import { defineConfig } from "vite";
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [viteTsconfigPaths()],
	build: {
		lib: {
			entry: ["src/index.ts"],
			fileName: (format, entryName) => `${entryName}.${format}.js`
		},
		minify: "esbuild"
	}
});
