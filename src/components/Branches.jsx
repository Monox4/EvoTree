import { NODE_W, NODE_H, seedWobble } from '../utils/layout';

export default function Branches({ positions, width, height }) {
  const posMap = new Map(positions.map((p) => [p.node.id, p]));

  const anchorX = (p, side) => {
    if (p.node.clade) return p.x + NODE_W / 2;
    return side === 'in' ? p.x : p.x + NODE_W;
  };

  const paths = [];
  positions.forEach((p) => {
    if (!p.isOpen || !p.node.children) return;
    p.node.children.forEach((child) => {
      const cp = posMap.get(child.id);
      if (!cp) return;
      const x1 = anchorX(p, 'out');
      const y1 = p.y + NODE_H / 2;
      const x2 = anchorX(cp, 'in');
      const y2 = cp.y + NODE_H / 2;
      // Scale the curve's bulge to how close this branch sits to its
      // siblings vertically — a full-size wobble on a tightly packed
      // clade (many children) would bow the curve into a neighbouring
      // card, so we clamp it down proportionally to the vertical gap.
      const vGap = Math.abs(y2 - y1);
      const wobbleRange = Math.max(4, Math.min(24, vGap * 0.35));
      const wob = seedWobble(child.id, wobbleRange);
      const midX = (x1 + x2) / 2;

      paths.push(
        <path
          key={`path-${child.id}`}
          d={`M${x1},${y1} C${midX + wob},${y1} ${midX - wob},${y2} ${x2},${y2}`}
          stroke={child.extinct ? '#a3907a' : '#7a5636'}
          strokeWidth={child.extinct ? 1.6 : 2.2}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={child.extinct ? '5 4' : undefined}
        />
      );
      paths.push(
        <circle key={`twig-${child.id}`} cx={x1} cy={y1} r={2.5} fill="#7a5636" />
      );
    });
  });

  return (
    <svg id="lines" width={width} height={height}>
      {paths}
    </svg>
  );
}