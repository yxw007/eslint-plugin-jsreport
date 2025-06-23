import { Rule } from 'eslint';

const CHILD_SYNTAX = /\{#child\s+(.+)\s*\}/g;
interface HtmlTextNode {
	type: string;
	value: string;
	range: [number, number];
}

const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: '{#child sub_page_path} Syntax check',
			category: 'Possible Errors',
			recommended: true,
		},

		fixable: 'code',
		schema: [],
		messages: {
			invalid: '{#child sub_page_path}, No extra space before and after the parameter',
		},
	},
	create(context) {
		return {
			Text(node: HtmlTextNode) {
				const value: string = node.value;
				let match: RegExpExecArray | null;
				while ((match = CHILD_SYNTAX.exec(value)) !== null) {
					const full = (match[0] ?? "").trim();
					const param = (match[1] ?? "").trim();
					if (!/\{#child [^\s]+\}$/.test(full)) {
						const start = node.range[0] + match.index;
						context.report({
							node,
							messageId: 'invalid',
							loc: {
								start: context.sourceCode.getLocFromIndex(start),
								end: context.sourceCode.getLocFromIndex(start + full.length),
							},
							fix(fixer) {
								const fixed = `{#child ${param}}`;
								return fixer.replaceTextRange([start, start + full.length], fixed);
							},
						});
					}
				}
			},
		};
	},
};

export default rule;
