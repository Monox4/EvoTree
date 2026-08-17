export default function Tooltip({ node, summary, loading, position }) {
  if (!node || !position) return null;

  return (
    <div className="tooltip" style={{ left: position.x, top: position.y }}>
      {loading && <div className="tt-loading">Loading {node.common}…</div>}

      {!loading && (
        <>
          {summary?.thumbnail && (
            <img className="tt-img" src={summary.thumbnail} alt={node.common} />
          )}
          <div className="tt-body">
            <strong>{node.common}</strong>
            <br />
            {node.desc}
            <span className="tt-source">
              {node.wiki ? 'Right-click to read more on Wikipedia' : ''}
            </span>
          </div>
        </>
      )}
    </div>
  );
}