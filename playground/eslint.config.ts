import parser from '@html-eslint/parser';
import jsreport from "eslint-plugin-jsreport";

export default [
	{
		files: ['*.html'],
		languageOptions: {
			parser,
			ecmaVersion: 2020,
			sourceType: 'module',
		},
		plugins: {
			jsreport,
		},
		rules: {
			'jsreport/no-invalid-child-path': 'error',
		},
	},
];
