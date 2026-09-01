import { useRef } from 'react';
import { NODE_W, NODE_H } from '../utils/layout';

const LONG_PRESS_MS = 450;
const MOVE_CANCEL_PX = 10;

export default function TreeNode({ pos, onToggle, onHover, onMove, onLeave, onLongPress, highlighted }) {
  const { node, x, y } = pos;

  const touchState = useRef({ timer: null, startX: 0, startY: 0, longPressed: false });

  const openWiki = (e) => {
    e.preventDefault();
    if (node.clade && !node.wiki) return; // unresolved node — no page to link to
    const title = node.wiki || node.sci.split(',')[0].trim().replace(/ /g, '_');
    window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`, '_blank', 'noopener');
  };

  // --- Touch: long-press shows the tooltip (mirrors desktop hover),
  // a plain tap still toggles expand/collapse (mirrors desktop click).
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touchState.current.startX = t.clientX;
    touchState.current.startY = t.clientY;
    touchState.current.longPressed = false;
    touchState.current.timer = setTimeout(() => {
      touchState.current.longPressed = true;
      onHover(node);
      onLongPress?.(node, { x: t.clientX, y: t.clientY });
    }, LONG_PRESS_MS);
  };

  const handleTouchMove = (e) => {
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - touchState.current.startX);
    const dy = Math.abs(t.clientY - touchState.current.startY);
    if (dx > MOVE_CANCEL_PX || dy > MOVE_CANCEL_PX) {
      clearTimeout(touchState.current.timer);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(touchState.current.timer);
    if (touchState.current.longPressed) {
      // Long-press already showed the tooltip — swallow the tap that
      // follows so it doesn't also toggle expand/collapse.
      touchState.current.longPressed = false;
      return;
    }
    // Otherwise let the browser's synthesised click fire normally
    // (handled by onClick below) for a plain tap.
  };

  const sharedTouchProps = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  if (node.clade) {
    return (
      <div
        id={`node-${node.id}`}
        className={`clade-dot-wrap${highlighted ? ' highlighted' : ''}`}
        style={{ left: x, top: y, width: NODE_W, height: NODE_H }}
        onClick={() => pos.hasChildren && onToggle(node.id)}
        onContextMenu={openWiki}
        onMouseEnter={() => onHover(node)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...sharedTouchProps}
      >
        <span className="clade-dot" />
        <span className="clade-dot-label">{node.common}</span>
      </div>
    );
  }

  return (
    <div
      id={`node-${node.id}`}
      className={`node${node.extinct ? ' extinct' : ''}${pos.hasChildren ? ' expandable' : ''}${highlighted ? ' highlighted' : ''}`}
      style={{ left: x, top: y, width: NODE_W }}
      onClick={() => pos.hasChildren && onToggle(node.id)}
      onContextMenu={openWiki}
      onMouseEnter={() => onHover(node)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...sharedTouchProps}
    >
      <div className="common">{node.common}</div>
      <div className="sci">{node.sci}</div>
      <div className="era">{node.era}</div>
    </div>
  );
}