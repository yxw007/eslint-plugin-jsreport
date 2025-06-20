import { Rule } from 'eslint';

const CHILD_SYNTAX = /\{#child\s+([^\s\}]+)\s*\}/g;

const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'jsreport {#child sub_page_path} 语法校验',
			category: 'Possible Errors',
			recommended: true,
		},
		
		fixable: 'code',
		schema: [],
		messages: {
			invalid: 'jsreport {#child sub_page_path} 语法不规范，参数前后不能有多余空格',
		},
	},
	create(context) {
		return {
			// @ts-ignore: Text 节点类型由 @html-eslint/parser 提供
			Text(node: any) {
				const value: string = node.value;
				let match: RegExpExecArray | null;
				while ((match = CHILD_SYNTAX.exec(value)) !== null) {
					const full = match[0];
					const param = match[1];
					if (!/^\{#child [^\s\}]+\}$/.test(full)) {
						debugger
						const start = node.range[0] + match.index;
						context.report({
							node,
							messageId: 'invalid',
							loc: {
								start: context.sourceCode.getLocFromIndex(start),
								end: context.sourceCode.getLocFromIndex(start + full.length),
							},
							fix(fixer) {
								debugger
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
