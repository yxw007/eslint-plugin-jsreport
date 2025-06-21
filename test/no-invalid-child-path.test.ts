import { RuleTester } from "eslint";
import noInvalidChildPathRule from "../src/rules/no-invalid-child-path";
import parser from '@html-eslint/parser';

const ruleTester = new RuleTester({
	languageOptions: {
		parser,
		ecmaVersion: 2020,
		sourceType: 'module',
	},
});

ruleTester.run(
	"no-invalid-child-path",
	noInvalidChildPathRule,
	{
		valid: [
			{
				code: "<div>{#child sub_page_path}</div>",
			},
		],
		invalid: [
			{
				code: "<div>{#child  sub_page_path}</div>",
				output: '<div>{#child sub_page_path}</div>',
				errors: 1,
			},
			{
				code: "<div>{#child sub_page_path }</div>",
				output: '<div>{#child sub_page_path}</div>',
				errors: 1,
			},
			{
				code: "<div>{#child  sub_page_path  }</div>",
				output: '<div>{#child sub_page_path}</div>',
				errors: 1,
			},
		],
	},
);

