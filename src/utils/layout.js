export const NODE_W = 180;
export const NODE_H = 64;
export const X_GAP = 100;
export const Y_GAP = 26;

// Deterministic wobble so branches feel hand-drawn, not mechanical.
export function seedWobble(id, range) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000;
  return (h / 1000 - 0.5) * range;
}

// ---------------------------------------------------------------
// FLAT-DATA HELPERS
// ---------------------------------------------------------------
// The data file is a flat array of { id, parentId, ... } records.
// Everything below rebuilds tree-shaped views of that data on the
// fly, so the underlying file never needs nested structure.

// Map id -> node, for O(1) lookup.
export function buildNodeIndex(nodes) {
  const map = new Map();
  for (const n of nodes) map.set(n.id, n);
  return map;
}

// Map parentId -> array of child nodes, preserving source array order.
export function buildChildIndex(nodes) {
  const map = new Map();
  for (const n of nodes) {
    if (n.parentId == null) continue;
    if (!map.has(n.parentId)) map.set(n.parentId, []);
    map.get(n.parentId).push(n);
  }
  return map;
}

export function findNode(nodes, id) {
  return nodes.find((n) => n.id === id) || null;
}

// All descendant ids of a given node (not including itself).
export function collectDescendantIds(nodes, id, childIndex) {
  const idx = childIndex || buildChildIndex(nodes);
  const out = [];
  const stack = [...(idx.get(id) || [])];
  while (stack.length) {
    const n = stack.pop();
    out.push(n.id);
    const kids = idx.get(n.id);
    if (kids) stack.push(...kids);
  }
  return out;
}

// Recursively compute { node, x, y, depth, hasChildren, isOpen } for every
// visible node, given a Set of expanded node ids. Walks the flat array via
// the child index instead of a nested `children` field.
export function layoutTree(nodes, rootId, expanded) {
  const childIndex = buildChildIndex(nodes);
  const nodeIndex = buildNodeIndex(nodes);
  const positions = [];

  function layout(node, depth, yCursor) {
    const isOpen = expanded.has(node.id);
    const kids = childIndex.get(node.id) || [];

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

  const root = nodeIndex.get(rootId);
  if (!root) return [];
  layout(root, 0, 30);
  return positions;
}

// ---------------------------------------------------------------
// SEARCH SUPPORT
// ---------------------------------------------------------------

// Flatten into a list of { node, path } where path is the array of
// ancestor ids from root to (and including) this node — built by
// walking parentId pointers upward, then reversing.
export function buildSearchIndex(nodes) {
  const nodeIndex = buildNodeIndex(nodes);
  const index = [];

  for (const node of nodes) {
    const path = [];
    let current = node;
    while (current) {
      path.unshift(current.id);
      current = current.parentId != null ? nodeIndex.get(current.parentId) : null;
    }
    index.push({ node, path });
  }

  return index;
}

// Very small fuzzy-ish matcher: scores common-name matches, preferring
// exact matches, then "starts with", then "includes". Skips clade nodes
// so search always lands on an actual animal.
export function findBestMatch(index, query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  let best = null;
  let bestScore = -Infinity;

  for (const entry of index) {
    const { node } = entry;
    if (node.clade) continue;

    const common = (node.common || '').toLowerCase();

    let score = -Infinity;
    if (common === q) score = 100;
    else if (common.startsWith(q)) score = 80;
    else if (common.includes(q)) score = 60;

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > -Infinity ? best : null;
}