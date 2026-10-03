// Abstract knowledge-network motif: connected nodes with transfer arrows.
const nodes: [number, number][] = [
  [60, 80], [180, 40], [300, 110], [420, 60], [520, 160], [380, 220],
  [240, 250], [110, 210], [460, 300], [300, 340], [160, 360], [540, 380],
];
const links: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [5, 6], [6, 7], [7, 0],
  [6, 2], [5, 8], [8, 9], [9, 6], [9, 10], [10, 7], [8, 11], [4, 8],
];

export function NetworkPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 420" className={className} fill="none" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a]![0]} y1={nodes[a]![1]} x2={nodes[b]![0]} y2={nodes[b]![1]}
          className="stroke-navy-foreground/20" strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 4 === 0 ? 7 : 4}
            className={i % 4 === 0 ? "fill-accent" : "fill-navy-foreground/60"} />
          {i % 4 === 0 && <circle cx={x} cy={y} r="16" className="stroke-accent/40" />}
        </g>
      ))}
      {/* document motif */}
      <g transform="translate(470 40)" className="stroke-navy-foreground/30">
        <rect width="70" height="90" rx="4" />
        <line x1="12" y1="22" x2="58" y2="22" />
        <line x1="12" y1="36" x2="58" y2="36" />
        <line x1="12" y1="50" x2="40" y2="50" />
      </g>
    </svg>
  );
}
