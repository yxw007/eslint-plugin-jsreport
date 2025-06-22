//#region src/rules/no-invalid-child-path.ts
const CHILD_SYNTAX = /\{#child\s+(.+)\s*\}/g;
const rule = {
	meta: {
		type: "problem",
		docs: {
			description: "{#child sub_page_path} Syntax check",
			category: "Possible Errors",
			recommended: true
		},
		fixable: "code",
		schema: [],
		messages: { invalid: "{#child sub_page_path}, No extra space before and after the parameter" }
	},
	create(context) {
		return { Text(node) {
			const value = node.value;
			let match;
			while ((match = CHILD_SYNTAX.exec(value)) !== null) {
				const full = match[0];
				const param = (match[1] ?? "").trim();
				if (!/\{#child [^\s]+\}/.test(full)) {
					const start = node.range[0] + match.index;
					context.report({
						node,
						messageId: "invalid",
						loc: {
							start: context.sourceCode.getLocFromIndex(start),
							end: context.sourceCode.getLocFromIndex(start + full.length)
						},
						fix(fixer) {
							const fixed = `{#child ${param}}`;
							return fixer.replaceTextRange([start, start + full.length], fixed);
						}
					});
				}
			}
		} };
	}
};
var no_invalid_child_path_default = rule;

//#endregion
//#region src/index.ts
const plugin = { rules: { "no-invalid-child-path": no_invalid_child_path_default } };
var src_default = plugin;

//#endregion
export { src_default as default };