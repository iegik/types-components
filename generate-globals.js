#!/usr/bin/env node
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const typesFile = path.resolve('src/types.ts');
const globalsFile = path.resolve('src/globals.d.ts');

const source = ts.createSourceFile(
  typesFile,
  fs.readFileSync(typesFile, 'utf8'),
  ts.ScriptTarget.Latest,
  true
);

const declarations = [];

source.forEachChild((node) => {
  if (
    (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
    node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
  ) {
    const name = node.name.text;
    declarations.push(`  type ${name}${getTypeParameters(node)} = ComponentTypes.${name}${getTypeParameters(node, true)};`);
  }
});

function getTypeParameters(node, justNames = false) {
  if (!node.typeParameters || node.typeParameters.length === 0) return '';
  const params = node.typeParameters.map(param => justNames ? param.name.text : param.getText());
  return `<${params.join(', ')}>`;
}

const content = [
  `import type * as ComponentTypes from './types';`,
  ``,
  `declare global {`,
  ...declarations,
  `}`,
  ``,
  `export {};`,
].join('\n');

fs.writeFileSync(globalsFile, content);
console.log(`✅ Generated globals.d.ts with ${declarations.length} types.`);