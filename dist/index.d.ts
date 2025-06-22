import * as eslint0 from "eslint";

//#region src/index.d.ts
declare const plugin: {
  rules: {
    'no-invalid-child-path': eslint0.Rule.RuleModule;
  };
};
//#endregion
export { plugin as default };