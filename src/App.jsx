import { useEffect, useMemo, useRef, useState } from 'react';
import { nodes, ROOT_ID } from './data/treeData';
import {
  layoutTree,
  collectDescendantIds,
  buildSearchIndex,
  findBestMatch,
  NODE_W,
  NODE_H,
} from './utils/layout';
import { usePanDrag } from './hooks/usePanDrag';
import { useWheelZoom } from './hooks/useWheelZoom';
import { useWikiSummary } from './hooks/useWikiSummary';
import TreeNode from './components/TreeNode';
import Branches from './components/Branches';
import Tooltip from './components/Tooltip';
import SearchBar from './components/SearchBar';

export default function App() {
  const [expanded, setExpanded] = useState(new Set([ROOT_ID]));
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const wrapRef = useRef(null);
  usePanDrag(wrapRef);
  const [zoom] = useWheelZoom(wrapRef);

  const { summary, loading, fetchSummary, clear } = useWikiSummary();

  const positions = useMemo(() => layoutTree(nodes, ROOT_ID, expanded), [expanded]);
  const searchIndex = useMemo(() => buildSearchIndex(nodes), []);

  // Vertically center the root against the left wall.
  const viewportH = wrapRef.current?.clientHeight || window.innerHeight;
  const root = positions.find((p) => p.node.id === ROOT_ID);
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
        collectDescendantIds(nodes, id).forEach((cid) => next.delete(cid));
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

  // --- Search ---------------------------------------------------
  const handleSearch = (query) => {
    const match = findBestMatch(searchIndex, query);
    if (!match) return false;

    setExpanded((prev) => {
      const next = new Set(prev);
      match.path.forEach((id) => next.add(id));
      return next;
    });

    setHighlightedId(match.node.id);
    return true;
  };

  useEffect(() => {
    if (!highlightedId) return;
    const t1 = setTimeout(() => {
      const el = document.getElementById(`node-${highlightedId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 60);
    const t2 = setTimeout(() => setHighlightedId(null), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [highlightedId, expanded]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      <div id="canvas-wrap" ref={wrapRef}>
        <div
          id="zoom-spacer"
          style={{ width: canvasW * zoom, height: canvasH * zoom, position: 'relative' }}
        >
          <div
            id="canvas"
            style={{
              width: canvasW,
              height: canvasH,
              transform: `scale(${zoom})`,
              transformOrigin: '0 0',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <Branches positions={shifted} width={canvasW} height={canvasH} />
            {shifted.map((pos) => (
              <TreeNode
                key={pos.node.id}
                pos={pos}
                onToggle={handleToggle}
                onHover={handleHover}
                onMove={handleMove}
                onLeave={handleLeave}
                highlighted={pos.node.id === highlightedId}
              />
            ))}
          </div>
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