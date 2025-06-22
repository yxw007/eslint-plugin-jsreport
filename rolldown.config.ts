import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts'

export default defineConfig([
	{
		input: 'src/index.ts',
		output: [
			{
				format: 'esm',
				file: 'dist/index.js',
			},
			{
				format: 'cjs',
				file: "dist/index.cjs",
			}
		],
	},
	{
		input: 'src/index.ts',
		plugins: [dts()],
		output:
		{
			dir: 'dist',
			format: 'es',
		},
	}
]);
