import jsreportRule from '../src/rules/no-invalid-child-path';
import parser from '@html-eslint/parser';

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
					'no-invalid-child-path': jsreportRule,
				},
			},
		},
		rules: {
			'jsreport-eslint/no-invalid-jsreport-child': 'error',
		},
	},
];
