"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();

  useEffect(() => {
    // Check system preference or saved theme on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navLinks = [
    { href: "/readme", label: "Readme" },
    { href: "/trophy", label: "Trophy" },
    { href: "/streak", label: "Streak" },
  ];

  return (
    <header style={{
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--bg-primary)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      backdropFilter: "blur(8px)"
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "4rem"
      }}>
        <Link href="/" className="title-gradient" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          GitHub Tools
        </Link>

        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              style={{
                fontSize: "0.9rem",
                color: pathname === link.href ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: pathname === link.href ? 500 : 400
              }}
            >
              {link.label}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="btn-secondary"
            style={{ 
              padding: "0.4rem 0.8rem", 
              display: "flex", 
              alignItems: "center", 
              gap: "0.5rem",
              background: "transparent" 
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}
