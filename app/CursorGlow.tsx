"use client";

import { useEffect, useRef } from "react";

/** Anteil der Reststrecke pro Frame: leichte Verzögerung ohne Nachschwingen. */
const FOLLOW = 0.18;
/** Ab dieser Restdistanz (px) endet die Animationsschleife, damit im Ruhezustand nichts rechnet. */
const SETTLED = 0.3;
const INTERACTIVE = "a, button, input, select, textarea, label, summary, [role='button']";

/**
 * Dekoratives Element, das dem Mauszeiger leicht verzögert folgt und über interaktiven
 * Elementen sanft wächst. Nur bei feinem Zeiger mit Hover, nie bei reduzierter Bewegung,
 * nie klickbar (pointer-events: none). Solange ein Dialog geöffnet ist, bleibt es aus:
 * modale Dialoge liegen in der obersten Ebene und würden es ohnehin verdecken.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let visible = false;

    function step() {
      frame = 0;
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * FOLLOW;
      y += dy * FOLLOW;
      element!.style.translate = `${x}px ${y}px`;
      if (Math.abs(dx) > SETTLED || Math.abs(dy) > SETTLED) frame = requestAnimationFrame(step);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(step);
    }

    function hide() {
      visible = false;
      element!.classList.remove("is-visible", "is-active");
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      if (document.querySelector("dialog[open]")) {
        if (visible) hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        // Beim ersten Zeigerereignis direkt an die Zeigerposition springen, nicht von 0/0 anfliegen.
        x = targetX;
        y = targetY;
        visible = true;
        element!.classList.add("is-visible");
      }
      const target = event.target instanceof Element ? event.target : null;
      element!.classList.toggle("is-active", Boolean(target?.closest(INTERACTIVE)));
      schedule();
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") hide();
    }

    function start() {
      document.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", hide);
      document.addEventListener("visibilitychange", onVisibility);
    }

    function stop() {
      document.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      hide();
    }

    function update() {
      stop();
      if (finePointer.matches && !reducedMotion.matches) start();
    }

    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      stop();
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
