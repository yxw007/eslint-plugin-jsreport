import parser from '@html-eslint/parser';
import jsReportPlugin from "../src";
import rule from '../src/rules/no-invalid-child-path';

console.log(JSON.stringify(jsReportPlugin, null, 2));


export default [
	{
		files: ['*.html'],
		languageOptions: {
			parser,
			ecmaVersion: 2020,
			sourceType: 'module',
		},
		plugins: {
			'jsreport-eslint': {
				rules: {
					'no-invalid-child-path': rule,
				}
			},
		},
		rules: {
			'jsreport-eslint/no-invalid-child-path': 'error',
		},
	},
];
