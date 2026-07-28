import { useEffect, useRef, useState } from 'react';

// Binds the mouse wheel to zoom in/out on the given scrollable container,
// instead of the browser's native page zoom. Zoom is anchored to the
// cursor position so the point under the mouse stays put while zooming.
export function useWheelZoom(ref, { min = 0.35, max = 2.5, step = 0.0015 } = {}) {
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();

      const prevZoom = zoomRef.current;
      const delta = -e.deltaY * step * prevZoom;
      let nextZoom = prevZoom + delta;
      nextZoom = Math.min(max, Math.max(min, nextZoom));
      if (nextZoom === prevZoom) return;

      const rect = el.getBoundingClientRect();
      const cursorX = e.clientX - rect.left + el.scrollLeft;
      const cursorY = e.clientY - rect.top + el.scrollTop;
      const ratio = nextZoom / prevZoom;

      setZoom(nextZoom);
      requestAnimationFrame(() => {
        el.scrollLeft = cursorX * ratio - (e.clientX - rect.left);
        el.scrollTop = cursorY * ratio - (e.clientY - rect.top);
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [ref, min, max, step]);

  return [zoom, setZoom];
}