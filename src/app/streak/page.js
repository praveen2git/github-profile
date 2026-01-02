"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

// Available Themes from API
const AVAILABLE_THEMES = [
  "default", "dark", "highcontrast", "transparent", "radical", "merko", 
  "gruvbox", "gruvbox-duo", "tokyonight", "tokyonight-duo", "onedark", 
  "onedark-duo", "cobalt", "synthwave", "dracula", "prussian", "monokai", 
  "vue", "vue-dark", "shades-of-purple", "nightowl", "buefy", "buefy-dark", 
  "blue-green", "algolia", "great-gatsby", "darcula", "bear", "solarized-dark", 
  "solarized-light", "chartreuse-dark", "nord", "gotham", "material", 
  "material-palenight", "graywhite", "vision-friendly-dark", "ayu-mirage", 
  "midnight-purple", "calm", "flag-india", "omni", "react", "jolly", 
  "maroongold", "yeblu", "blueberry", "blueberry-duo", "slateorange", 
  "kacho-ga", "ads-juicy-fresh", "black-ice", "soft-green", "blood", 
  "blood-dark", "green-nur", "neon-dark", "neon-palenight", "dark-smoky", 
  "monokai-metallian", "city-lights", "blux"
];

const LOCALES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "ja", label: "Japanese" },
  { code: "zh", label: "Chinese" },
];

// Date Formats from PHP reference
const DATE_FORMATS = [
    { label: "default", value: "" },
    { label: "Aug 10, 2016", value: "M j, Y" },
    { label: "10 Aug 2016", value: "j M Y" },
    { label: "2016 Aug 10", value: "Y M j" },
    { label: "10/8/2016", value: "j/n/Y" },
    { label: "8/10/2016", value: "n/j/Y" },
    { label: "2016.8.10", value: "Y.n.j" },
];

const THEME_PROPERTIES = [
    "background", "border", "stroke", "ring", "fire", 
    "currStreakNum", "sideNums", "currStreakLabel", "sideLabels", 
    "dates", "excludeDaysLabel"
];

export default function StreakStatsGenerator() {
  const [params, setParams] = useState({
    user: "praveen2git",
    theme: "default",
    hide_border: "false",
    border_radius: 4.5,
    locale: "en",
    date_format: "",
    mode: "daily",
    exclude_days: [],
    card_width: 495,
    card_height: 195,
    short_numbers: "false",
    hide_total_contributions: "false",
    hide_current_streak: "false",
    hide_longest_streak: "false",
    output_type: "svg"
  });

  // Advanced overrides: [{ key: 'background', value: '#ff0000' }]
  const [overrides, setOverrides] = useState([]);
  const [newOverrideKey, setNewOverrideKey] = useState(THEME_PROPERTIES[0]);

  const [origin, setOrigin] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewTheme, setPreviewTheme] = useState("dark");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    p.set("username", params.user);
    if (params.theme !== "default") p.set("theme", params.theme);
    if (params.hide_border === "true") p.set("hide_border", "true");
    if (params.border_radius != 4.5) p.set("border_radius", params.border_radius);
    if (params.card_width != 495) p.set("card_width", params.card_width);
    if (params.card_height != 195) p.set("card_height", params.card_height);
    if (params.exclude_days.length > 0) p.set("exclude_days", params.exclude_days.join(","));
    if (params.locale !== "en") p.set("locale", params.locale);
    if (params.date_format) p.set("date_format", params.date_format);
    if (params.short_numbers === "true") p.set("short_numbers", "true");
    if (params.hide_total_contributions === "true") p.set("hide_total_contributions", "true");
    if (params.hide_current_streak === "true") p.set("hide_current_streak", "true");
    if (params.hide_longest_streak === "true") p.set("hide_longest_streak", "true");

    // Add overrides
    overrides.forEach(o => {
        if (o.value) p.set(o.key, o.value);
    });

    // Cache buster for preview
    const previewParams = new URLSearchParams(p);
    previewParams.set("t", Date.now());
    
    setPreviewUrl(`/api/streak?${previewParams.toString()}`);
  }, [params, overrides]);

  const handleChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const toggleDay = (day) => {
    setParams(prev => {
      const days = prev.exclude_days.includes(day) 
         ? prev.exclude_days.filter(d => d !== day)
         : [...prev.exclude_days, day];
      return { ...prev, exclude_days: days };
    });
  };

  const addOverride = () => {
      if (!overrides.find(o => o.key === newOverrideKey)) {
          setOverrides([...overrides, { key: newOverrideKey, value: "#000000" }]);
      }
  };

  const removeOverride = (key) => {
      setOverrides(overrides.filter(o => o.key !== key));
  };
  
  const updateOverride = (key, val) => {
      setOverrides(overrides.map(o => o.key === key ? { ...o, value: val } : o));
  };

  const getSnippetUrl = () => {
    const p = new URLSearchParams();
    p.set("user", params.user); // Using 'user' for consistency with original demo URL logic if needed, but API uses params above
    // Let's stick to constructing query params manually to match expected output format
    let parts = [`username=${params.user}`]; // API expects username
    
    if (params.theme !== "default") parts.push(`theme=${params.theme}`);
    if (params.hide_border === "true") parts.push(`hide_border=true`);
    if (params.border_radius != 4.5) parts.push(`border_radius=${params.border_radius}`);
    if (params.exclude_days.length > 0) parts.push(`exclude_days=${params.exclude_days.join(",")}`);
    if (params.card_width != 495) parts.push(`card_width=${params.card_width}`);
    if (params.card_height != 195) parts.push(`card_height=${params.card_height}`);
    if (params.short_numbers === "true") parts.push(`short_numbers=true`);
    if (params.locale !== "en") parts.push(`locale=${params.locale}`);
    if (params.date_format) parts.push(`date_format=${encodeURIComponent(params.date_format)}`);
    if (params.hide_total_contributions === "true") parts.push(`hide_total_contributions=true`);
    if (params.hide_current_streak === "true") parts.push(`hide_current_streak=true`);
    if (params.hide_longest_streak === "true") parts.push(`hide_longest_streak=true`);
    
    overrides.forEach(o => {
        if (o.value) parts.push(`${o.key}=${encodeURIComponent(o.value)}`);
    });
    
    return `${origin}/api/streak?${parts.join("&")}`;
  };

  const copyMarkdown = () => {
    const url = getSnippetUrl();
    const md = `[![GitHub Streak](${url})](${origin}/streak)`;
    navigator.clipboard.writeText(md);
    toast.success("Markdown copied!");
  };

  const copyHtml = () => {
    const url = getSnippetUrl();
    const html = `<a href="${origin}/streak"><img src="${url}" alt="GitHub Streak" /></a>`;
    navigator.clipboard.writeText(html);
    toast.success("HTML copied!");
  };

  const toggleSection = (key) => {
      handleChange(key, params[key] === "true" ? "false" : "true");
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem", maxWidth: "1200px" }}>
      <header style={{ padding: "2rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
        <h1 style={{ fontSize: "2rem", display: "flex", alignItems: "center", gap: "10px", fontWeight: 700 }}>
          <span>🔥</span> <span className="title-gradient">GitHub Readme Streak Stats</span>
        </h1>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "2rem", alignItems: "start" }}>
        
        {/* PROPERTIES PANEL */}
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
           <h2 style={{ fontSize: "1.25rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Properties</h2>
           
           <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label>Username<span style={{color:"red"}}>*</span></label>
                <input type="text" className="input-field" value={params.user} onChange={e => handleChange("user", e.target.value)} />
              </div>

              <div className="form-group">
                <label>Theme</label>
                <select className="input-field" value={params.theme} onChange={e => handleChange("theme", e.target.value)}>
                    {AVAILABLE_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="grid-2">
                 <div className="form-group">
                    <label>Hide Border</label>
                    <select className="input-field" value={params.hide_border} onChange={e => handleChange("hide_border", e.target.value)}>
                        <option value="false">false</option>
                        <option value="true">true</option>
                    </select>
                 </div>
                 <div className="form-group">
                    <label>Border Radius</label>
                    <input type="number" className="input-field" value={params.border_radius} step="0.1" onChange={e => handleChange("border_radius", e.target.value)} />
                 </div>
              </div>

              <div className="grid-2">
                 <div className="form-group">
                    <label>Locale</label>
                    <select className="input-field" value={params.locale} onChange={e => handleChange("locale", e.target.value)}>
                        {LOCALES.map(l => <option key={l.code} value={l.code}>{l.label} ({l.code})</option>)}
                    </select>
                 </div>
                 <div className="form-group">
                    <label>Short Numbers</label>
                    <select className="input-field" value={params.short_numbers} onChange={e => handleChange("short_numbers", e.target.value)}>
                        <option value="false">false</option>
                        <option value="true">true</option>
                    </select>
                 </div>
              </div>

              <div className="form-group">
                <label>Date Format</label>
                <select className="input-field" value={params.date_format} onChange={e => handleChange("date_format", e.target.value)}>
                     {DATE_FORMATS.map(f => <option key={f.label} value={f.value}>{f.label}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Streak Mode</label>
                <select className="input-field" value={params.mode} onChange={e => handleChange("mode", e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
              </div>

              <div className="form-group">
                 <label>Exclude Days</label>
                 <div style={{ display: "flex", gap: "5px" }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <button 
                           key={d}
                           onClick={() => toggleDay(d)}
                           style={{
                               padding: "5px 8px",
                               fontSize: "0.8rem",
                               borderRadius: "4px",
                               border: "1px solid var(--border-subtle)",
                               background: params.exclude_days.includes(d) ? "var(--accent-primary)" : "transparent",
                               color: params.exclude_days.includes(d) ? "#fff" : "var(--text-primary)",
                               cursor: "pointer"
                           }}
                        >
                            {d[0]}
                        </button>
                    ))}
                 </div>
              </div>
              
              <div className="form-group">
                 <label>Show Sections</label>
                 <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", fontSize: "0.85rem" }}>
                    <label style={{ display: "flex", gap: "5px", alignItems: "center", cursor: "pointer", color: params.hide_total_contributions === "false" ? "var(--accent-primary)" : "inherit" }}>
                        <input type="checkbox" checked={params.hide_total_contributions === "false"} onChange={() => toggleSection("hide_total_contributions")} /> Total
                    </label>
                    <label style={{ display: "flex", gap: "5px", alignItems: "center", cursor: "pointer", color: params.hide_current_streak === "false" ? "var(--accent-primary)" : "inherit" }}>
                         <input type="checkbox" checked={params.hide_current_streak === "false"} onChange={() => toggleSection("hide_current_streak")} /> Current
                    </label>
                    <label style={{ display: "flex", gap: "5px", alignItems: "center", cursor: "pointer", color: params.hide_longest_streak === "false" ? "var(--accent-primary)" : "inherit" }}>
                         <input type="checkbox" checked={params.hide_longest_streak === "false"} onChange={() => toggleSection("hide_longest_streak")} /> Longest
                    </label>
                 </div>
              </div>

              <div className="form-group">
                <label>Card Dimensions (WxH)</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input type="number" className="input-field" value={params.card_width} onChange={e => handleChange("card_width", e.target.value)} />
                    <input type="number" className="input-field" value={params.card_height} onChange={e => handleChange("card_height", e.target.value)} />
                </div>
              </div>

               <div className="form-group">
                <label>Output Type</label>
                <select className="input-field" value={params.output_type} onChange={e => handleChange("output_type", e.target.value)}>
                    <option value="svg">SVG</option>
                    <option value="json">JSON</option>
                </select>
              </div>

              {/* Advanced Options */}
              <div style={{ marginTop: "1rem" }}>
                 <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ background: "none", border: "none", color: "var(--accent-primary)", fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                     ⚙ Advanced Options {showAdvanced ? "▲" : "▼"}
                 </button>
                 
                 {showAdvanced && (
                     <div style={{ marginTop: "1rem", paddingLeft: "0.5rem", borderLeft: "2px solid var(--border-subtle)" }}>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                            <label>Add Property</label>
                            <div style={{ display: "flex", gap: "5px" }}>
                                <select className="input-field" value={newOverrideKey} onChange={e => setNewOverrideKey(e.target.value)}>
                                    {THEME_PROPERTIES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <button className="btn-secondary" onClick={addOverride}>+</button>
                            </div>
                        </div>
                        
                        {overrides.map(o => (
                            <div key={o.key} className="form-group" style={{ marginBottom: "0.5rem" }}>
                                <label style={{ fontSize: "0.8rem" }}>{o.key}</label>
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <input type="text" className="input-field" value={o.value} onChange={e => updateOverride(o.key, e.target.value)} />
                                    <input type="color" value={o.value.startsWith('#') ? o.value : "#000000"} onChange={e => updateOverride(o.key, e.target.value)} style={{ width: "40px", height: "38px", border: "none", background: "none", padding: 0 }} />
                                    <button className="btn-secondary" onClick={() => removeOverride(o.key)}>−</button>
                                </div>
                            </div>
                        ))}
                     </div>
                 )}
              </div>

              <button className="btn-primary" style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }} onClick={() => window.open(getSnippetUrl(), '_blank')}>
                  Open Permalink
              </button>
           </div>
        </div>

         {/* PREVIEW PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="glass-panel" style={{ padding: "0" }}>
               <div style={{ padding: "1rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <h2 style={{ fontSize: "1.25rem" }}>Preview</h2>
                   <button onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}>
                       {previewTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
                   </button>
               </div>
               <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px", background: previewTheme === "dark" ? "#0d1117" : "#ffffff", transition: "background 0.3s" }}>
                  {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />}
                   <p className="warning" style={{ marginTop: "1rem", color: "#eab308", fontSize: "0.9rem", textAlign: "center", background: "rgba(234, 179, 8, 0.1)", padding: "0.5rem", borderRadius: "4px" }}>
                    Note: The stats above are generated from live GitHub data (or API).
                   </p>
               </div>
            </div>

            <div className="glass-panel" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Markdown</h3>
                <div style={{ background: "#0d1117", padding: "1rem", borderRadius: "6px", marginBottom: "1rem", wordBreak: "break-all", fontFamily: "monospace", fontSize: "0.85rem", color: "#8b949e" }}>
                    {`[![GitHub Streak](${getSnippetUrl()})](${origin}/streak)`}
                </div>
                <button className="btn-primary" onClick={copyMarkdown}>Copy To Clipboard</button>
            </div>

            <div className="glass-panel" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>HTML</h3>
                <div style={{ background: "#0d1117", padding: "1rem", borderRadius: "6px", marginBottom: "1rem", wordBreak: "break-all", fontFamily: "monospace", fontSize: "0.85rem", color: "#8b949e" }}>
                     {`<a href="${origin}/streak"><img src="${getSnippetUrl()}" alt="GitHub Streak" /></a>`}
                </div>
                <button className="btn-primary" onClick={copyHtml}>Copy To Clipboard</button>
            </div>
        </div>

      </div>

      <style jsx>{`
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .form-group label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .input-field {
            width: 100%;
            background: var(--bg-glass);
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 0.5rem 0.75rem;
            color: var(--text-primary);
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .input-field:focus {
            outline: none;
            border-color: var(--accent-primary);
            background: var(--bg-glass-hover);
        }
        .btn-secondary {
            background: var(--bg-glass);
            border: 1px solid var(--border-subtle);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-secondary:hover {
            background: var(--bg-glass-hover);
            border-color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
