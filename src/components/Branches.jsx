import { NODE_W, NODE_H, seedWobble } from '../utils/layout';

export default function Branches({ positions, width, height }) {
  const posMap = new Map(positions.map((p) => [p.node.id, p]));

  const anchorX = (p, side) => {
    if (p.node.clade) return p.x + NODE_W / 2;
    return side === 'in' ? p.x : p.x + NODE_W;
  };

  const paths = [];
  positions.forEach((cp) => {
    const parentId = cp.node.parentId;
    if (parentId == null) return; // root has no incoming branch
    const p = posMap.get(parentId);
    if (!p) return; // parent not currently rendered (shouldn't happen, but be safe)

    const x1 = anchorX(p, 'out');
    const y1 = p.y + NODE_H / 2;
    const x2 = anchorX(cp, 'in');
    const y2 = cp.y + NODE_H / 2;
    const vGap = Math.abs(y2 - y1);
    const wobbleRange = Math.max(4, Math.min(24, vGap * 0.35));
    const wob = seedWobble(cp.node.id, wobbleRange);
    const midX = (x1 + x2) / 2;

    paths.push(
      <path
        key={`path-${cp.node.id}`}
        d={`M${x1},${y1} C${midX + wob},${y1} ${midX - wob},${y2} ${x2},${y2}`}
        stroke={cp.node.extinct ? '#a3907a' : '#7a5636'}
        strokeWidth={cp.node.extinct ? 1.6 : 2.2}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={cp.node.extinct ? '5 4' : undefined}
      />
    );
    paths.push(
      <circle key={`twig-${cp.node.id}`} cx={x1} cy={y1} r={2.5} fill="#7a5636" />
    );
  });

  return (
    <svg id="lines" width={width} height={height}>
      {paths}
    </svg>
  );
}