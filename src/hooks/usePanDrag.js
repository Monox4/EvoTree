import { useEffect, useRef } from 'react';

// Attach drag-to-pan behaviour to a scrollable ref. Ignores drags that
// start on an element carrying the given ignoreSelector (e.g. '.node').
export function usePanDrag(ref, ignoreSelector = '.node') {
  const state = useRef({ isDown: false, startX: 0, startY: 0, scrollL: 0, scrollT: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e) => {
      if (e.target.closest(ignoreSelector)) return;
      state.current.isDown = true;
      el.classList.add('grabbing');
      state.current.startX = e.pageX;
      state.current.startY = e.pageY;
      state.current.scrollL = el.scrollLeft;
      state.current.scrollT = el.scrollTop;
    };

    const onMouseUp = () => {
      state.current.isDown = false;
      el.classList.remove('grabbing');
    };

    const onMouseMove = (e) => {
      if (!state.current.isDown) return;
      el.scrollLeft = state.current.scrollL - (e.pageX - state.current.startX);
      el.scrollTop = state.current.scrollT - (e.pageY - state.current.startY);
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [ref, ignoreSelector]);
}
