"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["Projekte", "projekte"],
  ["Tools", "tools"],
  ["Informationen", "informationen"],
  ["Community", "community"],
];

type NavClickEvent = {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  preventDefault: () => void;
};

/**
 * Entscheidet, ob ein Navigationsklick die Seitenscroll-Navigation nutzen darf:
 * nur auf der Startseite, nur Primärklicks ohne Modifier und nur bei vorhandenem Ziel.
 */
function navScrollTargetId(
  pathname: string,
  id: string,
  hasTarget: (id: string) => boolean,
  event: NavClickEvent,
): string | null {
  if (pathname !== "/") return null;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }
  return hasTarget(id) ? id : null;
}

function prefersReducedMotion() {
  const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  return media?.matches === true;
}

export function SiteNav() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = ["top", ...links.map(([, id]) => id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  function handleNavClick(event: NavClickEvent, id: string) {
    const target = navScrollTargetId(
      window.location.pathname,
      id,
      (candidate) => document.getElementById(candidate) !== null,
      event,
    );
    if (!target) return;
    event.preventDefault();
    scrollToSection(target);
  }

  return (
    <nav className="nav" aria-label="Hauptnavigation">
      <Link className="wordmark" href="/#top" onClick={(event) => handleNavClick(event, "top")}>
        JNSW<span>.DE</span>
      </Link>
      <div className="nav-links">
        {links.map(([label, id]) => (
          <a
            href={`/#${id}`}
            key={id}
            aria-current={activeSection === id ? "page" : undefined}
            onClick={(event) => handleNavClick(event, id)}
          >
            {label}
          </a>
        ))}
      </div>
      <span className="nav-aside">
        <span className="availability">
          <i /> Persönliche Projektplattform
        </span>
        <ThemeToggle />
      </span>
    </nav>
  );
}
