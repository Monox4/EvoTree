export const NODE_W = 180;
export const NODE_H = 64;
export const X_GAP = 100;
export const Y_GAP = 20;

// Deterministic wobble so branches feel hand-drawn, not mechanical.
export function seedWobble(id, range) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000;
  return (h / 1000 - 0.5) * range;
}

// Recursively compute { node, x, y, depth, hasChildren, isOpen } for every
// visible node, given a Set of expanded node ids.
export function layoutTree(root, expanded) {
  const positions = [];

  function layout(node, depth, yCursor) {
    const isOpen = expanded.has(node.id);
    const kids = node.children && node.children.length ? node.children : [];

    if (isOpen && kids.length) {
      const childCenters = [];
      for (const child of kids) {
        const res = layout(child, depth + 1, yCursor);
        yCursor = res.next;
        childCenters.push(res.center);
      }
      const first = childCenters[0];
      const last = childCenters[childCenters.length - 1];
      const center = (first + last) / 2;
      const x = depth * (NODE_W + X_GAP);
      positions.push({ node, x, y: center, depth, hasChildren: kids.length > 0, isOpen });
      return { next: yCursor, center };
    }

    const y = yCursor;
    const x = depth * (NODE_W + X_GAP);
    positions.push({ node, x, y, depth, hasChildren: kids.length > 0, isOpen });
    return { next: yCursor + NODE_H + Y_GAP, center: y };
  }

  layout(root, 0, 30);
  return positions;
}

export function findNode(node, id) {
  if (node.id === id) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

export function collectDescendantIds(node, out = []) {
  if (!node.children) return out;
  for (const child of node.children) {
    out.push(child.id);
    collectDescendantIds(child, out);
  }
  return out;
}
