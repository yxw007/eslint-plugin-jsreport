import jsreportRule from '../src/rules/no-invalid-jsreport-child';
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
					'no-invalid-jsreport-child': jsreportRule,
				},
			},
		},
		rules: {
			'jsreport-eslint/no-invalid-jsreport-child': 'error',
		},
	},
];
