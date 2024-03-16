import { useCallback } from "react";

export function useDraggable(overlayRef) {
  const handleHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!overlayRef.current) return;

      const overlay = overlayRef.current;
      const startX = e.clientX - overlay.offsetLeft;
      const startY = e.clientY - overlay.offsetTop;

      const onMouseMove = (e) => {
        overlay.style.left = `${e.clientX - startX}px`;
        overlay.style.top = `${e.clientY - startY}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [overlayRef]
  );

  return handleHandler;
}

export function useResizeable(overlayRef) {
  const resizeHandler = useCallback(
    (e) => {
      e.preventDefault();
      const overlay = overlayRef.current;
      const startX = e.clientX;
      const startY = e.clientY;

      const startWidth = parseInt(
        document.defaultView.getComputedStyle(overlay).width,
        10
      );
      const startHeight = parseInt(
        document.defaultView.getComputedStyle(overlay).height,
        10
      );

      overlay.style.left = overlay.offsetLeft + 1 + "px";
      overlay.style.top = overlay.offsetTop + 1 + "px";

      const onMouseMove = (e) => {
        const height = startHeight + (e.clientY - startY);
        const width = startWidth + (e.clientX - startX);
        if (height > 120) {
          overlay.style.height = height + "px";
        }
        if (width > 300) {
          overlay.style.width = width + "px";
        }
      };
      document.addEventListener("mousemove", onMouseMove);

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mouseup", onMouseUp);
    },
    [overlayRef]
  );
  return resizeHandler;
}
