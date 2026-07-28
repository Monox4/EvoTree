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
      <div id="search-pill">
        <button onClick={runSearch} aria-label="Search">
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
            <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <line x1="13.2" y1="13.2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search for life…."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setNotFound(false);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {notFound && <div id="search-no-match">No match found</div>}
    </div>
  );
}