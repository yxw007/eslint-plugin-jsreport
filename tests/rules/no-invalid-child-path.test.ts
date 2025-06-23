import { RuleTester } from "eslint";
import plugin from "../../dist";
import parser from '@html-eslint/parser';

const ruleTester = new RuleTester({
	languageOptions: {
		parser,
		ecmaVersion: 2020,
		sourceType: 'module',
	},
});

let name = "no-invalid-child-path";

ruleTester.run(
	name,
	plugin.rules[name],
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
			{
				code: "<div>{#child AA{{:language}} }</div>",
				output: '<div>{#child AA{{:language}}}</div>',
				errors: 1,
			},
		],
	},
);

