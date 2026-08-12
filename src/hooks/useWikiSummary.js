import { useCallback, useRef, useState } from 'react';

const wikiCache = new Map();

export function useWikiSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const tokenRef = useRef(0);

  const fetchSummary = useCallback(async (title) => {
    const myToken = ++tokenRef.current;

    if (wikiCache.has(title)) {
      setSummary(wikiCache.get(title));
      setLoading(false);
      return;
    }

    setLoading(true);
    setSummary(null);

    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      const parsed = { extract: data.extract, thumbnail: data.thumbnail?.source || null };
      wikiCache.set(title, parsed);
      if (myToken === tokenRef.current) {
        setSummary(parsed);
        setLoading(false);
      }
    } catch (err) {
      if (myToken === tokenRef.current) {
        setSummary(null);
        setLoading(false);
      }
    }
  }, []);

  const clear = useCallback(() => {
    tokenRef.current++;
    setSummary(null);
    setLoading(false);
  }, []);

  return { summary, loading, fetchSummary, clear };
}