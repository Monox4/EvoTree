import { tree } from './treeData.js';
import fs from 'fs';

const flat = [];

function walk(node, parentId) {
  const { children, ...rest } = node;
  flat.push({ ...rest, parentId });
  if (children && children.length) {
    for (const child of children) {
      walk(child, node.id);
    }
  }
}

walk(tree, null);

fs.writeFileSync('/home/claude/flat_nodes.json', JSON.stringify(flat, null, 2));
console.log('Flattened', flat.length, 'nodes');
