"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function VisitorCounterGenerator() {
  const [pageId, setPageId] = useState("praveen2git");
  const [label, setLabel] = useState("visitors");
  const [color, setColor] = useState("4c1");
  const [labelColor, setLabelColor] = useState("555");
  const [textColor, setTextColor] = useState("fff");
  const [template, setTemplate] = useState("flat");
  const [origin, setOrigin] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const templates = ["flat", "flat-square", "plastic", "for-the-badge", "digital"];

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    if (pageId) p.set("page", pageId);
    if (label) p.set("label", label);
    if (color) p.set("color", color);
    if (labelColor) p.set("labelColor", labelColor);
    if (textColor) p.set("textColor", textColor);
    if (template) p.set("template", template);
    
    // Cache buster for preview
    p.set("t", Date.now());

    setPreviewUrl(`/api/visitor?${p.toString()}`);
  }, [pageId, label, color, labelColor, textColor, template]);

  const getSnippetUrl = () => {
    const p = new URLSearchParams();
    p.set("page", pageId);
    if (label !== "visitors") p.set("label", label);
    if (color !== "4c1") p.set("color", color);
    if (labelColor !== "555") p.set("labelColor", labelColor);
    if (textColor !== "fff") p.set("textColor", textColor);
    if (template !== "flat") p.set("template", template);
    
    return `${origin}/api/visitor?${p.toString()}`;
  };

  const copyMarkdown = () => {
    const url = getSnippetUrl();
    // Using a generic link or just the image
    const md = `![Visitor Count](${url})`;
    navigator.clipboard.writeText(md);
    toast.success("Markdown copied!");
  };

  const copyHtml = () => {
    const url = getSnippetUrl();
    const html = `<img src="${url}" alt="visitor count" />`;
    navigator.clipboard.writeText(html);
    toast.success("HTML copied!");
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <header style={{ padding: "2rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <h1 className="title-gradient" style={{ fontSize: "2rem" }}>Visitor Counter</h1>
        <p style={{ color: "var(--text-secondary)" }}>Track visits to your profile or website</p>
      </header>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem" }}>
        
        {/* Preview Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div className="glass-panel" style={{ minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d1117" }}>
             {previewUrl && <img src={previewUrl} alt="Preview" />}
          </div>
          
           <div className="glass-panel">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Markdown Snippet</h3>
            <div style={{ background: "#000", padding: "1rem", borderRadius: "8px", overflowX: "auto", fontSize: "0.9rem", color: "#a1a1aa", marginBottom: "1rem" }}>
              {`![Visitor Count](${getSnippetUrl()})`}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-primary" onClick={copyMarkdown}>Copy Markdown</button>
              <button className="btn-secondary" onClick={copyHtml}>Copy Image HTML</button>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div className="form-group">
            <label>Page ID / Username</label>
            <input type="text" value={pageId} onChange={e => setPageId(e.target.value)} className="input-field" placeholder="unique-id" />
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>Unique identifier for the counter</p>
          </div>

          <div className="form-group">
            <label>Label</label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} className="input-field" />
          </div>

          <div className="form-group">
            <label>Template</label>
            <select value={template} onChange={e => setTemplate(e.target.value)} className="input-field">
                {templates.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="grid-2">
             <div className="form-group">
                <label>Color</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input type="color" value={`#${color.replace('#', '')}`} onChange={e => setColor(e.target.value.replace('#', ''))} style={{ height: "38px", border: "none", background: "none" }} />
                    <input type="text" value={color} onChange={e => setColor(e.target.value)} className="input-field" />
                </div>
             </div>
             <div className="form-group">
                <label>Label Color</label>
                <div style={{ display: "flex", gap: "5px" }}>
                     <input type="color" value={`#${labelColor.replace('#', '')}`} onChange={e => setLabelColor(e.target.value.replace('#', ''))} style={{ height: "38px", border: "none", background: "none" }} />
                     <input type="text" value={labelColor} onChange={e => setLabelColor(e.target.value)} className="input-field" />
                </div>
             </div>
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
        .input-field {
            width: 100%;
            background: rgba(0,0,0,0.2);
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 0.5rem 0.75rem;
            color: var(--text-primary);
            font-size: 0.9rem;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
      `}</style>
    </div>
  );
}
