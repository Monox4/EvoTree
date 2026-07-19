import { useMemo, useRef, useState } from 'react';
import { tree } from './data/treeData';
import { layoutTree, findNode, collectDescendantIds, NODE_W, NODE_H } from './utils/layout';
import { usePanDrag } from './hooks/usePanDrag';
import { useWikiSummary } from './hooks/useWikiSummary';
import TreeNode from './components/TreeNode';
import Branches from './components/Branches';
import Tooltip from './components/Tooltip';

export default function App() {
  const [expanded, setExpanded] = useState(new Set([tree.id]));
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  const wrapRef = useRef(null);
  usePanDrag(wrapRef);

  const { summary, loading, fetchSummary, clear } = useWikiSummary();

  const positions = useMemo(() => layoutTree(tree, expanded), [expanded]);

  // Vertically center the root against the left wall.
  const viewportH = wrapRef.current?.clientHeight || window.innerHeight;
  const root = positions.find((p) => p.node.id === tree.id);
  const offsetY = root ? viewportH / 2 - NODE_H / 2 - root.y : 0;
  let shifted = positions.map((p) => ({ ...p, y: p.y + offsetY }));
  const minY = Math.min(...shifted.map((p) => p.y));
  if (minY < 20) {
    const pad = 20 - minY;
    shifted = shifted.map((p) => ({ ...p, y: p.y + pad }));
  }

  const maxX = Math.max(...shifted.map((p) => p.x)) + NODE_W + 80;
  const maxY = Math.max(...shifted.map((p) => p.y)) + NODE_H + 80;
  const canvasW = maxX;
  const canvasH = Math.max(maxY, viewportH);

  const handleToggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        const node = findNode(tree, id);
        if (node) collectDescendantIds(node).forEach((cid) => next.delete(cid));
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleHover = (node) => {
    setHoveredNode(node);
    if (node.clade && !node.wiki) {
      clear();
      return;
    }
    const title = node.wiki || node.sci.split(',')[0].trim().replace(/ /g, '_');
    fetchSummary(title);
  };

  const handleMove = (e) => {
    const pad = 16;
    let left = e.clientX + pad;
    let top = e.clientY + pad;
    const maxLeft = window.innerWidth - 266;
    const maxTop = window.innerHeight - 220;
    if (left > maxLeft) left = e.clientX - 250 - pad;
    if (top > maxTop) top = maxTop;
    setTooltipPos({ x: left, y: top });
  };

  const handleLeave = () => {
    setHoveredNode(null);
    setTooltipPos(null);
    clear();
  };

  return (
    <>
      <div id="canvas-wrap" ref={wrapRef}>
        <div id="canvas" style={{ width: canvasW, height: canvasH }}>
          <Branches positions={shifted} width={canvasW} height={canvasH} />
          {shifted.map((pos) => (
            <TreeNode
              key={pos.node.id}
              pos={pos}
              onToggle={handleToggle}
              onHover={handleHover}
              onMove={handleMove}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>

      <Tooltip node={hoveredNode} summary={summary} loading={loading} position={tooltipPos} />

      <div id="legend">
        <span>
          <i></i>living lineage
        </span>
        <span>
          <i className="dashed"></i>extinct lineage
        </span>
      </div>
    </>
  );
}
