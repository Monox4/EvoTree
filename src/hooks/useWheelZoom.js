import { useEffect, useRef, useState } from 'react';

// Binds the mouse wheel (desktop) and two-finger pinch (touch) to zoom
// in/out on the given scrollable container, instead of the browser's
// native page zoom. Zoom is anchored to the cursor/pinch-midpoint so the
// point under it stays put while zooming.
export function useWheelZoom(ref, { min = 0.35, max = 2.5, step = 0.0015 } = {}) {
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const pinchRef = useRef({ active: false, startDist: 0, startZoom: 1, midX: 0, midY: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // --- Mouse wheel (desktop) ---
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

    // --- Pinch (touch) ---
    const dist = (t0, t1) => Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);

    const onTouchStart = (e) => {
      if (e.touches.length !== 2) return;
      const [t0, t1] = e.touches;
      const rect = el.getBoundingClientRect();
      pinchRef.current = {
        active: true,
        startDist: dist(t0, t1),
        startZoom: zoomRef.current,
        midX: (t0.clientX + t1.clientX) / 2 - rect.left + el.scrollLeft,
        midY: (t0.clientY + t1.clientY) / 2 - rect.top + el.scrollTop,
      };
    };

    const onTouchMove = (e) => {
      if (!pinchRef.current.active || e.touches.length !== 2) return;
      e.preventDefault();
      const [t0, t1] = e.touches;
      const newDist = dist(t0, t1);
      const scaleFactor = newDist / pinchRef.current.startDist;
      let nextZoom = pinchRef.current.startZoom * scaleFactor;
      nextZoom = Math.min(max, Math.max(min, nextZoom));

      const prevZoom = zoomRef.current;
      const ratio = nextZoom / prevZoom;
      const rect = el.getBoundingClientRect();
      const midClientX = (t0.clientX + t1.clientX) / 2;
      const midClientY = (t0.clientY + t1.clientY) / 2;

      setZoom(nextZoom);
      requestAnimationFrame(() => {
        el.scrollLeft = pinchRef.current.midX * ratio - (midClientX - rect.left);
        el.scrollTop = pinchRef.current.midY * ratio - (midClientY - rect.top);
      });
    };

    const onTouchEnd = (e) => {
      if (e.touches.length < 2) pinchRef.current.active = false;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [ref, min, max, step]);

  return [zoom, setZoom];
}