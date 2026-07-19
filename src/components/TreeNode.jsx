import { NODE_W, NODE_H } from '../utils/layout';

export default function TreeNode({ pos, onToggle, onHover, onMove, onLeave }) {
  const { node, x, y } = pos;

  const openWiki = (e) => {
    e.preventDefault();
    if (node.clade && !node.wiki) return; // unresolved node — no page to link to
    const title = node.wiki || node.sci.split(',')[0].trim().replace(/ /g, '_');
    window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`, '_blank', 'noopener');
  };

  if (node.clade) {
    // Render as a small connector dot rather than a full card, but keep
    // the same footprint (width/height) so branch-line math is unaffected.
    return (
      <div
        className="clade-dot-wrap"
        style={{ left: x, top: y, width: NODE_W, height: NODE_H }}
        onClick={() => pos.hasChildren && onToggle(node.id)}
        onContextMenu={openWiki}
        onMouseEnter={() => onHover(node)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <span className="clade-dot" />
        <span className="clade-dot-label">{node.common}</span>
      </div>
    );
  }

  return (
    <div
      className={`node${node.extinct ? ' extinct' : ''}`}
      style={{ left: x, top: y, width: NODE_W }}
      onClick={() => pos.hasChildren && onToggle(node.id)}
      onContextMenu={openWiki}
      onMouseEnter={() => onHover(node)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="common">{node.common}</div>
      <div className="sci">{node.sci}</div>
      <div className="era">{node.era}</div>
    </div>
  );
}