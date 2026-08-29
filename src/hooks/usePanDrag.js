import { useEffect, useRef } from 'react';

// Attach drag-to-pan behaviour to a scrollable ref, for both mouse and
// single-finger touch. Ignores drags that start on an element carrying
// the given ignoreSelector (e.g. '.node').
export function usePanDrag(ref, ignoreSelector = '.node') {
  const state = useRef({ isDown: false, startX: 0, startY: 0, scrollL: 0, scrollT: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const begin = (x, y, target) => {
      if (target.closest(ignoreSelector)) return false;
      state.current.isDown = true;
      el.classList.add('grabbing');
      state.current.startX = x;
      state.current.startY = y;
      state.current.scrollL = el.scrollLeft;
      state.current.scrollT = el.scrollTop;
      return true;
    };

    const move = (x, y) => {
      if (!state.current.isDown) return;
      el.scrollLeft = state.current.scrollL - (x - state.current.startX);
      el.scrollTop = state.current.scrollT - (y - state.current.startY);
    };

    const end = () => {
      state.current.isDown = false;
      el.classList.remove('grabbing');
    };

    const onMouseDown = (e) => begin(e.pageX, e.pageY, e.target);
    const onMouseUp = () => end();
    const onMouseMove = (e) => move(e.pageX, e.pageY);

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      begin(t.pageX, t.pageY, e.target);
    };
    const onTouchMove = (e) => {
      if (e.touches.length !== 1 || !state.current.isDown) return;
      const t = e.touches[0];
      move(t.pageX, t.pageY);
    };
    const onTouchEnd = () => end();

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);

      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [ref, ignoreSelector]);
}