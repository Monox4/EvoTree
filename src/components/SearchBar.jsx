import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const [notFound, setNotFound] = useState(false);

  const runSearch = () => {
    if (!value.trim()) return;
    const found = onSearch(value);
    setNotFound(!found);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') runSearch();
  };

  return (
    <div id="search-bar">
      <input
        type="text"
        placeholder="Search for an animal…"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setNotFound(false);
        }}
        onKeyDown={handleKeyDown}
      />
      <button onClick={runSearch} aria-label="Search">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
          <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <line x1="13.2" y1="13.2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      {notFound && <div id="search-no-match">No match found</div>}
    </div>
  );
}