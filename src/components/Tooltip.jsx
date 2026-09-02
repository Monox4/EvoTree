export default function Tooltip({ node, summary, loading, position, onOpenWiki, touchMode }) {
  if (!node || !position) return null;

  const handleTap = () => {
    if (!touchMode || !node.wiki) return;
    onOpenWiki?.(node);
  };

  return (
    <div
      className={`tooltip${touchMode ? ' touch' : ''}`}
      style={{ left: position.x, top: position.y }}
      onClick={handleTap}
    >
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
            {node.wiki && (
              <span className="tt-source">
                {touchMode ? 'Tap here to read more on Wikipedia' : 'Right-click to read more on Wikipedia'}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}