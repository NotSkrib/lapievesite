"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2"
    >
      {mounted && dark ? (
        <Sun size={20} weight="regular" />
      ) : (
        <Moon size={20} weight="regular" />
      )}
    </button>
  );
}
