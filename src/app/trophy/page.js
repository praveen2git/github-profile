"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TrophyGenerator() {
  const [username, setUsername] = useState("praveen2git");
  const [theme, setTheme] = useState("flat");
  const [rank, setRank] = useState([]); // Empty means all
  const [column, setColumn] = useState(6);
  const [row, setRow] = useState(3);
  const [marginW, setMarginW] = useState(0);
  const [marginH, setMarginH] = useState(0);
  const [noBg, setNoBg] = useState(false);
  const [noFrame, setNoFrame] = useState(false);
  const [origin, setOrigin] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const themes = [
    "flat", "onedark", "gruvbox", "dracula", "monokai", "chalk", "nord", "alduin",
    "darkhub", "juicyfresh", "buddhism", "oldie", "radical", "onestar", "discord",
    "algolia", "gitdimmed", "tokyonight", "matrix", "apprentice", "dark_dimmed",
    "dark_lover", "kimbie_dark", "aura"
  ];

  const availableRanks = ["SSS", "SS", "S", "AAA", "AA", "A", "B", "C", "SECRET"];

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    // Use local API
    const buildUrl = (includeTimestamp) => {
      let url = `/api/trophy?username=${username}`;
      if (theme !== "flat") url += `&theme=${theme}`;
      if (rank.length > 0) url += `&rank=${rank.join(",")}`;
      if (column !== 6) url += `&column=${column}`;
      if (row !== 3) url += `&row=${row}`;
      if (marginW !== 0) url += `&margin-w=${marginW}`;
      if (marginH !== 0) url += `&margin-h=${marginH}`;
      if (noBg) url += `&no-bg=true`;
      if (noFrame) url += `&no-frame=true`;
      if (includeTimestamp) url += `&t=${Date.now()}`;
      return url;
    };

    setPreviewUrl(buildUrl(true));
  }, [username, theme, rank, column, row, marginW, marginH, noBg, noFrame]);

  // Helper to get clean URL for snippet
  const getSnippetUrl = () => {
    let url = `${origin}/api/trophy?username=${username}`;
    if (theme !== "flat") url += `&theme=${theme}`;
    if (rank.length > 0) url += `&rank=${rank.join(",")}`;
    if (column !== 6) url += `&column=${column}`;
    if (row !== 3) url += `&row=${row}`;
    if (marginW !== 0) url += `&margin-w=${marginW}`;
    if (marginH !== 0) url += `&margin-h=${marginH}`;
    if (noBg) url += `&no-bg=true`;
    if (noFrame) url += `&no-frame=true`;
    return url;
  };

  const toggleRank = (r) => {
    if (rank.includes(r)) {
      setRank(rank.filter(item => item !== r));
    } else {
      setRank([...rank, r]);
    }
  };

  const copyToClipboard = () => {
    const url = getSnippetUrl();
    const html = `<img src="${url}" alt="trophy" />`;
    navigator.clipboard.writeText(html);
    alert("Copied HTML to clipboard!");
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <header style={{ padding: "2rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>← Back</Link>
        <h1 className="title-gradient" style={{ fontSize: "2rem" }}>Trophy Configurator</h1>
      </header>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem" }}>
        
        {/* Preview Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div className="glass-panel" style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {username && previewUrl ? (
              <img src={previewUrl} alt="Trophy Preview" style={{ maxWidth: "100%", height: "auto" }} />
            ) : (
              <p style={{ color: "var(--text-muted)" }}>Enter username to generate trophy</p>
            )}
          </div>
          
            <div className="glass-panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem" }}>Markdown Snippet</h3>
              <button onClick={copyToClipboard} className="btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }}>Copy</button>
            </div>
            <code style={{ display: "block", padding: "1rem", background: "#000", borderRadius: "8px", overflowX: "auto", fontSize: "0.9rem", color: "#a1a1aa" }}>
              {`<img src="${getSnippetUrl()}" alt="trophy" />`}
            </code>
          </div>
        </div>

        {/* Controls Section */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>GitHub Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="input-field" 
              placeholder="e.g. praveen2git"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Theme</label>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)} 
              className="input-field"
              style={{ cursor: "pointer" }}
            >
              {themes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
             <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Rows</label>
              <input type="number" value={row} onChange={(e) => setRow(Number(e.target.value))} className="input-field" />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Columns</label>
              <input type="number" value={column} onChange={(e) => setColumn(Number(e.target.value))} className="input-field" />
            </div>
          </div>

           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
             <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Margin W</label>
              <input type="number" value={marginW} onChange={(e) => setMarginW(Number(e.target.value))} className="input-field" />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Margin H</label>
              <input type="number" value={marginH} onChange={(e) => setMarginH(Number(e.target.value))} className="input-field" />
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem" }}>
             <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
              <input type="checkbox" checked={noBg} onChange={(e) => setNoBg(e.target.checked)} />
              Transparent Bg
            </label>
             <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
              <input type="checkbox" checked={noFrame} onChange={(e) => setNoFrame(e.target.checked)} />
              Hide Frame
            </label>
          </div>

          <div>
             <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Filter Ranks</label>
             <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
               {availableRanks.map(r => (
                 <button 
                  key={r}
                  onClick={() => toggleRank(r)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                    background: rank.includes(r) ? "var(--accent-primary)" : "rgba(255,255,255,0.05)",
                    color: rank.includes(r) ? "white" : "var(--text-secondary)",
                    fontSize: "0.8rem",
                    border: "1px solid var(--border-subtle)"
                  }}
                 >
                   {r}
                 </button>
               ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
